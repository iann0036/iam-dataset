import json
import re

result = {
    'roles': []
}

raw_roles = []
with open("azure/built-in-roles-raw.json", "r") as f:
    raw_roles = json.loads(f.read())

provider_ops = []
with open("azure/provider-operations.json", "r") as f:
    provider_ops = json.loads(f.read())

action_pattern_cache = {}
def get_action_pattern(action):
    action_lower = action.lower()
    if action_lower not in action_pattern_cache:
        match_expression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
        action_pattern_cache[action_lower] = re.compile(match_expression.lower())
    return action_pattern_cache[action_lower]

for raw_role in raw_roles:
    if raw_role['roleType'] != "BuiltInRole":
        continue

    permitted_actions = []
    permitted_data_actions = []
    has_unknown = False
    has_external = False
    
    for permission in raw_role['permissions']:
        for action in permission['actions']:
            matched = False
            action_pattern = get_action_pattern(action)
            for provider in provider_ops:
                for operation in provider['operations']:
                    if not operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                        permitted_actions.append({
                            'name': operation['name'],
                            'description': operation['description'],
                            'displayName': operation['displayName'],
                            'providerName': provider['name'],
                            'providerDisplayName': provider['displayName']
                        })
                        matched = True
                for resource_type in provider['resourceTypes']:
                    for operation in resource_type['operations']:
                        if not operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                            permitted_actions.append({
                                'name': operation['name'],
                                'description': operation['description'],
                                'displayName': operation['displayName'],
                                'providerName': provider['name'],
                                'providerDisplayName': provider['displayName']
                            })
                            matched = True
            if not action.lower().startswith("microsoft."):
                has_external = True
            if not matched:
                has_unknown = True
    
    for permission in raw_role['permissions']:
        for action in permission['dataActions']:
            matched = False
            action_pattern = get_action_pattern(action)
            for provider in provider_ops:
                for operation in provider['operations']:
                    if operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                        permitted_data_actions.append({
                            'name': operation['name'],
                            'description': operation['description'],
                            'displayName': operation['displayName'],
                            'providerName': provider['name'],
                            'providerDisplayName': provider['displayName']
                        })
                        matched = True
                for resource_type in provider['resourceTypes']:
                    for operation in resource_type['operations']:
                        if operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                            permitted_data_actions.append({
                                'name': operation['name'],
                                'description': operation['description'],
                                'displayName': operation['displayName'],
                                'providerName': provider['name'],
                                'providerDisplayName': provider['displayName']
                            })
                            matched = True
            if not action.lower().startswith("microsoft."):
                has_external = True
            if not matched:
                has_unknown = True
    
    for permission in raw_role['permissions']:
        for action in permission['notActions']:
            matched = False
            action_pattern = get_action_pattern(action)
            for provider in provider_ops:
                for operation in provider['operations']:
                    if not operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                        permitted_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_actions))
                        matched = True
                for resource_type in provider['resourceTypes']:
                    for operation in resource_type['operations']:
                        if not operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                            permitted_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_actions))
                            matched = True
            if not action.lower().startswith("microsoft."):
                has_external = True
            if not matched:
                has_unknown = True
    
    for permission in raw_role['permissions']:
        for action in permission['notDataActions']:
            matched = False
            action_pattern = get_action_pattern(action)
            for provider in provider_ops:
                for operation in provider['operations']:
                    if operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                        permitted_data_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_data_actions))
                        matched = True
                for resource_type in provider['resourceTypes']:
                    for operation in resource_type['operations']:
                        if operation['isDataAction'] and action_pattern.search(operation['name'].lower()):
                            permitted_data_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_data_actions))
                            matched = True
            if not action.lower().startswith("microsoft."):
                has_external = True
            if not matched:
                has_unknown = True

    result['roles'].append({
        'name': raw_role['roleName'],
        'description': raw_role['description'],
        'permittedActions': permitted_actions,
        'permittedDataActions': permitted_data_actions,
        'rawPermissions': raw_role['permissions'],
        'hasUnknown': has_unknown,
        'hasExternal': has_external
    })

with open("azure/built-in-roles.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
