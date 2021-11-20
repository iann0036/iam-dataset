import os
import json
import time
import requests
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

for raw_role in raw_roles:
    if raw_role['roleType'] != "BuiltInRole":
        continue

    permitted_actions = []
    permitted_data_actions = []
    
    for permission in raw_role['permissions']:
        for action in permission['actions']:
            matchexpression = "^" + action.replace(".", "\\.").replace("*", ".*").replace("?", ".{{1}}") + "$"
            for provider in provider_ops:
                for operation in provider['operations']:
                    if not operation['isDataAction'] and re.search(matchexpression.lower(), operation['name'].lower()):
                        permitted_actions.append({
                            'name': operation['name'],
                            'description': operation['description'],
                            'displayName': operation['displayName'],
                            'providerName': provider['name'],
                            'providerDisplayName': provider['displayName']
                        })
    
    for permission in raw_role['permissions']:
        for action in permission['dataActions']:
            matchexpression = "^" + action.replace(".", "\\.").replace("*", ".*").replace("?", ".{{1}}") + "$"
            for provider in provider_ops:
                for operation in provider['operations']:
                    if operation['isDataAction'] and re.search(matchexpression.lower(), operation['name'].lower()):
                        permitted_data_actions.append({
                            'name': operation['name'],
                            'description': operation['description'],
                            'displayName': operation['displayName'],
                            'providerName': provider['name'],
                            'providerDisplayName': provider['displayName']
                        })
    
    for permission in raw_role['permissions']:
        for action in permission['notActions']:
            matchexpression = "^" + action.replace(".", "\\.").replace("*", ".*").replace("?", ".{{1}}") + "$"
            for provider in provider_ops:
                for operation in provider['operations']:
                    if not operation['isDataAction'] and re.search(matchexpression.lower(), operation['name'].lower()):
                        permitted_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_actions))
    
    for permission in raw_role['permissions']:
        for action in permission['notDataActions']:
            matchexpression = "^" + action.replace(".", "\\.").replace("*", ".*").replace("?", ".{{1}}") + "$"
            for provider in provider_ops:
                for operation in provider['operations']:
                    if operation['isDataAction'] and re.search(matchexpression.lower(), operation['name'].lower()):
                        permitted_data_actions = list(filter(lambda x: x['name'].lower() != operation['name'].lower(), permitted_data_actions))

    result['roles'].append({
        'name': raw_role['roleName'],
        'description': raw_role['description'],
        'permittedActions': permitted_actions,
        'permittedDataActions': permitted_data_actions,
        'rawPermissions': raw_role['permissions']
    })

with open("azure/built-in-roles.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
