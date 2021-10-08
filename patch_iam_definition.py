import os
import json

iam_def = []
with open("js/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

mapdata = {}
with open("map.json", "r") as f:
    mapdata = json.loads(f.read())

# Undocumented roots
# undocumented_roots = [
#     {
#         "conditions": [],
#         "prefix": "finspace",
#         "privileges": [],
#         "resources": [],
#         "service_name": "Amazon FinSpace"
#     }
# ]
# for root in undocumented_roots:
#     found = False
#     for resource in iam_def:
#         if resource["prefix"] == root["prefix"]:
#             found = True

#     if not found:
#         for i in range(len(iam_def)):
#             if iam_def[i]['prefix'] > root['prefix']:
#                 iam_def.insert(i, root)
#                 break

# APIGW Merge
i = 0
while i < len(iam_def):
    j = i + 1
    while j < len(iam_def):
        if iam_def[i]['prefix'] == iam_def[j]['prefix']:
            # merge conditions
            for condition in iam_def[i]['conditions']:
                found = False
                for merge_condition in iam_def[j]['conditions']:
                    if condition['condition'] == merge_condition['condition']:
                        found = True
                        break
                if not found:
                    iam_def[i]['conditions'].append(merge_condition)

            # merge privileges
            privileges_length = len(iam_def[i]['privileges'])
            for merge_privilege in iam_def[j]['privileges']:
                found = False
                k = 0
                while k < privileges_length:
                    if iam_def[i]['privileges'][k]['privilege'] == merge_privilege['privilege']:
                        for merge_resource_type in merge_privilege['resource_types']:
                            found2 = False
                            for resource_type in iam_def[i]['privileges'][k]['resource_types']:
                                if merge_resource_type['resource_type'].replace("*", "") == resource_type['resource_type'].replace("*", ""):
                                    found2 = True # TODO: better merge for same resource type
                                    break
                            if not found2:
                                iam_def[i]['privileges'][k]['resource_types'].append(merge_resource_type)
                        for l in range(len(iam_def[i]['privileges'][k]['resource_types'])): # send empty to end always
                            if iam_def[i]['privileges'][k]['resource_types'][l]['resource_type'] == "":
                                iam_def[i]['privileges'][k]['resource_types'].append(iam_def[i]['privileges'][k]['resource_types'][l])
                                iam_def[i]['privileges'][k]['resource_types'].pop(l)
                        found = True
                        break
                    k += 1
                if not found:
                    iam_def[i]['privileges'].append(merge_privilege)

            # merge resources
            resources_length = len(iam_def[i]['resources'])
            for merge_resource in iam_def[j]['resources']:
                found = False
                k = 0
                while k < resources_length:
                    if iam_def[i]['resources'][k]['resource'] == merge_resource['resource']:

                        #tmp
                        if merge_resource['resource'] == 'subscriptionDefinition':
                            print(merge_resource)
                        ####

                        iam_def[i]['resources'][k]['condition_keys'] = list(set(iam_def[i]['resources'][k]['condition_keys'] + merge_resource['condition_keys']))
                        found = True
                        break
                    k += 1
                if not found:
                    iam_def[i]['resources'].append(merge_resource)

            print("Merged " + iam_def[j]['service_name'] + " (" + iam_def[j]['prefix'] + ")")
            iam_def.pop(j)
            j -= 1
        j += 1
    i += 1

# Renames
for i in range(len(iam_def)):
    if iam_def[i]['prefix'] == 'rds':
        iam_def[i]['service_name'] = 'Amazon RDS, Neptune & DocumentDB'
    if iam_def[i]['prefix'] == 'apigateway':
        iam_def[i]['service_name'] = 'Amazon API Gateway Management'
    if iam_def[i]['prefix'] == 'aws-marketplace':
        iam_def[i]['service_name'] = 'AWS Marketplace'
    if iam_def[i]['prefix'] == 'elasticloadbalancing':
        iam_def[i]['service_name'] = 'Elastic Load Balancing'
    if iam_def[i]['prefix'] == 'kinesisanalytics':
        iam_def[i]['service_name'] = 'Amazon Kinesis Analytics'
    if iam_def[i]['prefix'] == 'lex':
        iam_def[i]['service_name'] = 'Amazon Lex'
    if iam_def[i]['prefix'] == 'ses':
        iam_def[i]['service_name'] = 'Amazon SES & Pinpoint Email'
    if iam_def[i]['prefix'] == 'greengrass':
        iam_def[i]['service_name'] = 'AWS IoT Greengrass'
    if iam_def[i]['prefix'] == 'datasync':
        iam_def[i]['service_name'] = 'AWS DataSync'
    if iam_def[i]['prefix'] == 'backup-storage':
        iam_def[i]['service_name'] = 'AWS Backup Storage'
    if iam_def[i]['prefix'] == 'es':
        iam_def[i]['service_name'] = 'Amazon OpenSearch Service (successor to Amazon Elasticsearch Service)'

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
