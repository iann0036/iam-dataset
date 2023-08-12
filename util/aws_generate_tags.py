# https://github.com/primeharbor/sensitive_iam_actions

import os
import json
import re
import yaml

aws_map = {}
with open("aws/map.json", "r") as f:
    aws_map = json.loads(f.read())

def is_in_map(action):
    for k, v in aws_map['sdk_method_iam_mappings'].items():
        for mappingitem in v:
            if mappingitem['action'].lower() == action.lower():
                return True
    return False

iam_tags = {
    'CredentialExposure': [],
    'PrivEsc': [],
    'ResourceExposure': [],
    'DataAccess': []
}
api_tags = {
    'CredentialExposure': [],
    'PrivEsc': [],
    'ResourceExposure': [],
    'DataAccess': []
}
iam_tags_lower = {
    'CredentialExposure': [],
    'PrivEsc': [],
    'ResourceExposure': [],
    'DataAccess': []
}
api_tags_lower = {
    'CredentialExposure': [],
    'PrivEsc': [],
    'ResourceExposure': [],
    'DataAccess': []
}

with open("sensitive_iam_actions/actions.yaml", "r") as f:
    sensitive_actions = yaml.safe_load(f)
    for a in sensitive_actions['CredentialExposure']['Actions']:
        iam_tags['CredentialExposure'].append(a)
        iam_tags_lower['CredentialExposure'].append(a.lower())
        if is_in_map(a):
            api_tags['CredentialExposure'].append(a)
            api_tags_lower['CredentialExposure'].append(a.lower())
    for a in sensitive_actions['PrivEsc']['Actions']:
        iam_tags['PrivEsc'].append(a)
        iam_tags_lower['PrivEsc'].append(a.lower())
        if is_in_map(a):
            api_tags['PrivEsc'].append(a)
            api_tags_lower['PrivEsc'].append(a.lower())
    for a in sensitive_actions['ResourceExposure']['Actions']:
        iam_tags['ResourceExposure'].append(a)
        iam_tags_lower['ResourceExposure'].append(a.lower())
        if is_in_map(a):
            api_tags['ResourceExposure'].append(a)
            api_tags_lower['ResourceExposure'].append(a.lower())
    for a in sensitive_actions['DataAccess']['Actions']:
        iam_tags['DataAccess'].append(a)
        iam_tags_lower['DataAccess'].append(a.lower())
        if is_in_map(a):
            api_tags['DataAccess'].append(a)
            api_tags_lower['DataAccess'].append(a.lower())

with open("aws/tags.json", "w") as f:
    f.write(json.dumps({
        "iam": iam_tags,
        "api": api_tags,
        "iam_lower": iam_tags_lower,
        "api_lower": api_tags_lower
    }, indent=2, sort_keys=True))
