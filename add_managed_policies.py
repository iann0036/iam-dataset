# https://github.com/z0ph/MAMIP.git

import os
import json
import re

PRIVESC_ACTIONS = [
    "iam:PassRole",
    "iam:CreatePolicyVersion",
    "iam:SetDefaultPolicyVersion",
    "iam:CreateAccessKey",
    "iam:CreateLoginProfile",
    "iam:UpdateLoginProfile",
    "iam:AttachUserPolicy",
    "iam:AttachGroupPolicy",
    "iam:AttachRolePolicy",
    "iam:PutUserPolicy",
    "iam:PutGroupPolicy",
    "iam:PutRolePolicy",
    "iam:AddUserToGroup",
    "iam:UpdateAssumeRolePolicy",
    "iam:CreateServiceLinkedRole",
    "iam:CreateVirtualMFADevice",
    "iam:ResyncMFADevice",
    "iam:EnableMFADevice"
]

iam_def = []
with open("js/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

allactions = {}
for service in iam_def:
    for privilege in service['privileges']:
        allactions[service['prefix'] + ":" + privilege['privilege']] = privilege['access_level']

deprecated_policies = []
with open("MAMIP/DEPRECATED.json", "r") as f:
    deprecated_policies = json.loads(f.read())

policies = []

for policyname in os.listdir("MAMIP/policies/"):
    policy = {}
    detailed_policy = {}

    with open("MAMIP/policies/{}".format(policyname), "r") as f:
        policy = json.loads(f.read())

    policieslist = {}
    with open("MAMIP/policies-list.json", "r") as f:
        policieslist = json.loads(f.read())

    updatedate = None
    for policieslistitem in policieslist['Policies']:
        if policieslistitem['PolicyName'] == policyname:
            updatedate = policieslistitem['UpdateDate']

    privesc = False
    malformed = False
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

                        if potentialaction in PRIVESC_ACTIONS:
                            privesc = True

                        effective_actions.append({
                            'action': action,
                            'effective_action': potentialaction,
                            'access_level': allactions[potentialaction],
                            'condition': condition,
                            'privesc': (potentialaction in PRIVESC_ACTIONS)
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

            for action in statement['NotAction']:
                foundmatch = True
                matchexpression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
                for potentialaction in allactions.keys():
                    if not re.search(matchexpression.lower(), potentialaction.lower()):
                        access_levels.append(allactions[potentialaction])

                        condition = None
                        if 'Condition' in statement:
                            condition = statement['Condition']

                        if potentialaction in PRIVESC_ACTIONS:
                            privesc = True

                        effective_actions.append({
                            'action': action,
                            'effective_action': potentialaction,
                            'access_level': allactions[potentialaction],
                            'condition': condition,
                            'privesc': (potentialaction in PRIVESC_ACTIONS)
                        })
        else:
            malformed = True

    access_level_order = {
        "List": 1,
        "Read": 2,
        "Tagging": 3,
        "Write": 4,
        "Permissions management": 5
    }
    access_levels = list(set(access_levels))
    access_levels.sort(key=lambda x: access_level_order[x])

    policies.append({
        'name': policyname,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': (len(unknown_actions) > 0),
        'access_levels': access_levels,
        'privesc': privesc
    })

    detailed_policy = {
        'name': policyname,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': unknown_actions,
        'access_levels': access_levels,
        'privesc': privesc,
        'document': policy['PolicyVersion']['Document'],
        'effective_actions': effective_actions,
        'unknown_actions': unknown_actions
    }

    with open("managedpolicies/{}.json".format(policyname), "w") as f:
        f.write(json.dumps(detailed_policy))

with open("managed_policies.json", "w") as f:
    f.write(json.dumps({
        "policies": policies
    }))
