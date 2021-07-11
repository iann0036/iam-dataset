import os
import json

iam_def = []
with open("js/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

mapdata = {}
with open("map.json", "r") as f:
    mapdata = json.loads(f.read())

for k, v in mapdata['sdk_method_iam_mappings'].items():
    for mappingitem in v:
        if 'undocumented' in mappingitem:
            print(k)
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
