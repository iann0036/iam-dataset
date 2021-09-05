import os
import json

iam_def = []
with open("js/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

mapdata = {}
with open("map.json", "r") as f:
    mapdata = json.loads(f.read())

# Undocumented roots
undocumented_roots = [
    {
        "conditions": [],
        "prefix": "finspace",
        "privileges": [],
        "resources": [],
        "service_name": "Amazon FinSpace"
    }
]
for root in undocumented_roots:
    found = False
    for resource in iam_def:
        if resource["prefix"] == root["prefix"]:
            found = True

    if not found:
        for i in range(len(iam_def)):
            if iam_def[i]['prefix'] > root['prefix']:
                iam_def.insert(i, root)
                break

# APIGW Merge
for i in range(len(iam_def)):
    if iam_def[i]['service_name'] == 'Amazon API Gateway Management V2':
        iam_def.pop(i)
        break

# Renames
for i in range(len(iam_def)):
    if iam_def[i]['prefix'] == 'rds':
        iam_def[i]['service_name'] = 'Amazon RDS, Neptune & DocumentDB'
    if iam_def[i]['prefix'] == 'apigateway':
        iam_def[i]['service_name'] = 'Amazon API Gateway Management'

# Undocumented method tagging
for k, v in mapdata['sdk_method_iam_mappings'].items():
    for mappingitem in v:
        if 'undocumented' in mappingitem:
            servicename = mappingitem['action'].split(":")[0]
            methodname = mappingitem['action'].split(":")[1]

            for i in range(len(iam_def)):
                if iam_def[i]['prefix'] == servicename:
                    skip = False
                    for priv in iam_def[i]['privileges']:
                        if priv['privilege'] == methodname:
                            print("Skipped " + mappingitem['action'])
                            skip = True
                    
                    if not skip:
                        iam_def[i]['privileges'].append({
                            "access_level": "Unknown",
                            "description": "",
                            "privilege": methodname,
                            "resource_types": [
                                {
                                    "condition_keys": [],
                                    "dependent_actions": [],
                                    "resource_type": ""
                                }
                            ]
                        })

                        iam_def[i]['privileges'].sort(key=lambda x: x['privilege'])

with open("iam_definition.json", "w") as f:
    f.write(json.dumps(iam_def, indent=2, sort_keys=True))
