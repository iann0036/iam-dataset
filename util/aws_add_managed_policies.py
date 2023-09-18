# https://github.com/z0ph/MAMIP.git
# https://github.com/primeharbor/sensitive_iam_actions

import os
import json
import re
import yaml

PRIVESC_ACTIONS = []
RESEXPOSURE_ACTIONS = []
CREDEXPOSURE_ACTIONS = []
DATAACCESS_ACTIONS = []

with open("sensitive_iam_actions/actions.yaml", "r") as f:
    sensitive_actions = yaml.safe_load(f)
    for a in sensitive_actions['CredentialExposure']['Actions']:
        CREDEXPOSURE_ACTIONS.append(a.lower())
    for a in sensitive_actions['PrivEsc']['Actions']:
        PRIVESC_ACTIONS.append(a.lower())
    for a in sensitive_actions['ResourceExposure']['Actions']:
        RESEXPOSURE_ACTIONS.append(a.lower())
    for a in sensitive_actions['DataAccess']['Actions']:
        DATAACCESS_ACTIONS.append(a.lower())

iam_def = []
with open("aws/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

allactions = {}
for service in iam_def:
    for privilege in service['privileges']:
        allactions[service['prefix'] + ":" + privilege['privilege']] = privilege['access_level']

deprecated_policies = []
with open("MAMIP/DEPRECATED.json", "r") as f:
    deprecated_policies = json.loads(f.read())

policies = []
actions = {}

for policyname in os.listdir("MAMIP/policies/"):
    policy = {}
    detailed_policy = {}

    with open("MAMIP/policies/{}".format(policyname), "r") as f:
        contents = ""
        try:
            contents = f.read()
            policy = json.loads(contents)
        except:
            print("Skipped policy: " + policyname)
            print(contents)
            continue

    policieslist = {}
    with open("MAMIP/policies-list.json", "r") as f:
        policieslist = json.loads(f.read())

    updatedate = None
    arn = None
    for policieslistitem in policieslist['Policies']:
        if policieslistitem['PolicyName'] == policyname:
            updatedate = policieslistitem['UpdateDate']
            arn = policieslistitem['Arn']

    privesc = False
    resource_exposure = False
    credentials_exposure = False
    data_access = False
    malformed = False
    undocumented = False
    if not isinstance(policy['PolicyVersion']['Document']['Statement'], list):
        policy['PolicyVersion']['Document']['Statement'] = [policy['PolicyVersion']['Document']['Statement']]

    access_levels = []
    effective_actions = []

    unknown_actions = []
    for statement in policy['PolicyVersion']['Document']['Statement']:
        if 'Action' in statement and statement['Effect'] == "Allow":
            if not isinstance(statement['Action'], list):
                statement['Action'] = [statement['Action']]

            for action in statement['Action']:
                foundmatch = False
                matchexpression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
                for potentialaction in allactions.keys():
                    if re.search(matchexpression.lower(), potentialaction.lower()):
                        access_levels.append(allactions[potentialaction])
                        foundmatch = True

                        condition = None
                        if 'Condition' in statement:
                            condition = statement['Condition']

                        if potentialaction.lower() in PRIVESC_ACTIONS:
                            privesc = True

                        if potentialaction.lower() in RESEXPOSURE_ACTIONS:
                            resource_exposure = True

                        if potentialaction.lower() in CREDEXPOSURE_ACTIONS:
                            credentials_exposure = True

                        if potentialaction.lower() in DATAACCESS_ACTIONS:
                            data_access = True

                        if allactions[potentialaction] == "Unknown":
                            undocumented = True

                        effective_actions.append({
                            'action': action,
                            'effective_action': potentialaction,
                            'access_level': allactions[potentialaction],
                            'condition': condition,
                            'privesc': (potentialaction.lower() in PRIVESC_ACTIONS),
                            'resource_exposure': (potentialaction.lower() in RESEXPOSURE_ACTIONS),
                            'credentials_exposure': (potentialaction.lower() in CREDEXPOSURE_ACTIONS),
                            'data_access': (potentialaction.lower() in DATAACCESS_ACTIONS)
                        })

                if not foundmatch:
                    condition = None
                    if 'Condition' in statement:
                        condition = statement['Condition']
                        
                    unknown_actions.append({
                        'action': action,
                        'condition': condition
                    })
        elif 'Action' in statement and statement['Effect'] == "Deny":
            pass
        elif 'NotAction' in statement and statement['Effect'] == "Allow":
            if not isinstance(statement['NotAction'], list):
                statement['NotAction'] = [statement['NotAction']]

            for potentialaction in allactions.keys():
                matched = False
                for action in statement['NotAction']:
                    matchexpression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
                    if re.search(matchexpression.lower(), potentialaction.lower()):
                        matched = True
                        break

                if matched:
                    continue
                
                access_levels.append(allactions[potentialaction])

                condition = None
                if 'Condition' in statement:
                    condition = statement['Condition']

                if potentialaction.lower() in PRIVESC_ACTIONS:
                    privesc = True

                if potentialaction.lower() in RESEXPOSURE_ACTIONS:
                    resource_exposure = True

                if potentialaction.lower() in CREDEXPOSURE_ACTIONS:
                    credentials_exposure = True

                if potentialaction.lower() in DATAACCESS_ACTIONS:
                    data_access = True

                effective_actions.append({
                    'action': "NotAction",
                    'effective_action': potentialaction,
                    'access_level': allactions[potentialaction],
                    'condition': condition,
                    'privesc': (potentialaction.lower() in PRIVESC_ACTIONS),
                    'resource_exposure': (potentialaction.lower() in RESEXPOSURE_ACTIONS),
                    'credentials_exposure': (potentialaction.lower() in CREDEXPOSURE_ACTIONS),
                    'data_access': (potentialaction.lower() in DATAACCESS_ACTIONS)
                })
        else:
            malformed = True

    access_level_order = {
        "List": 1,
        "Read": 2,
        "Tagging": 3,
        "Write": 4,
        "Permissions management": 5,
        "Unknown": 6
    }
    access_levels = list(set(access_levels))
    access_levels.sort(key=lambda x: access_level_order[x])

    for e in effective_actions:
        actions.setdefault( e['effective_action'], {}).setdefault('managed_policies', []).append(policyname)

    policies.append({
        'name': policyname,
        'arn': arn,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': (len(unknown_actions) > 0),
        'access_levels': access_levels,
        'privesc': privesc,
        'resource_exposure': resource_exposure,
        'credentials_exposure': credentials_exposure,
        'data_access': data_access,
        'undocumented_actions': undocumented
    })

    detailed_policy = {
        'name': policyname,
        'arn': arn,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': unknown_actions,
        'access_levels': access_levels,
        'privesc': privesc,
        'resource_exposure': resource_exposure,
        'credentials_exposure': credentials_exposure,
        'data_access': data_access,
        'undocumented_actions': undocumented,
        'document': policy['PolicyVersion']['Document'],
        'effective_actions': effective_actions
    }

    with open("aws/managedpolicies/{}.json".format(policyname), "w") as f:
        f.write(json.dumps(detailed_policy, indent=2, sort_keys=True))

with open("aws/managed_policies.json", "w") as f:
    f.write(json.dumps({
        "policies": policies
    }, indent=2, sort_keys=True))

with open("aws/actions.json", "w") as f:
    f.write(json.dumps({
        "actions": actions,
    }, indent=2, sort_keys=True))
