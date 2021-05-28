# https://github.com/z0ph/MAMIP.git

import os
import json

deprecated_policies = []
with open("MAMIP/DEPRECATED.json", "r") as f:
    deprecated_policies = json.loads(f.read())

policies = []

for policyname in os.listdir("MAMIP/policies/"):
    policy = {}
    with open("MAMIP/policies/{}".format(policyname), "r") as f:
        policy = json.loads(f.read())

    policieslist = {}
    with open("MAMIP/policies-list.json", "r") as f:
        policieslist = json.loads(f.read())

    updatedate = None
    for policieslistitem in policieslist['Policies']:
        if policieslistitem['PolicyName'] == policyname:
            updatedate = policieslistitem['UpdateDate']

    # policy['PolicyVersion']['Document']

    policies.append({
        'name': policyname,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId']
    })

with open("managed_policies.json", "w") as f:
    f.write(json.dumps({
        "policies": policies
    }))
