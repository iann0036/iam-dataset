import os
import json
import time
import requests
import re

result = {}
result_ext = {}
proto = {}

def resources_recurse(resources, resource_type_path):
    for resource_type in resources.keys():
        print("-- " + resource_type)
        if 'methods' in resources[resource_type]:
            for method_name in resources[resource_type]['methods'].keys():
                method_id = resources[resource_type]['methods'][method_name]['id']
                if method_id not in result[api['name']]['methods']:
                    flatpath = resources[resource_type]['methods'][method_name]['flatPath'] if 'flatPath' in resources[resource_type]['methods'][method_name] else resources[resource_type]['methods'][method_name]['path']
                    if flatpath.startswith(apidetail['version'] + "/"):
                        flatpath = "{" + "_version}" + flatpath[len(apidetail['version']):]

                    result[api['name']]['methods'][method_id] = {
                        'description': resources[resource_type]['methods'][method_name]['description'] if 'description' in resources[resource_type]['methods'][method_name] else '',
                        'httpMethod': resources[resource_type]['methods'][method_name]['httpMethod'],
                        'method': method_name,
                        'resourceType': resource_type,
                        'resourceTypePath': resource_type_path,
                        'flatPath': flatpath,
                        'versions': []
                    }
                    result_ext[api['name']]['methods'][method_id] = {
                        'description': resources[resource_type]['methods'][method_name]['description'] if 'description' in resources[resource_type]['methods'][method_name] else '',
                        'httpMethod': resources[resource_type]['methods'][method_name]['httpMethod'],
                        'method': method_name,
                        'resourceType': resource_type,
                        'resourceTypePath': resource_type_path,
                        'flatPath': flatpath,
                        'versions': [],
                        'parameters': resources[resource_type]['methods'][method_name]['parameters'] if 'parameters' in resources[resource_type]['methods'][method_name] else {}
                    }
                result[api['name']]['methods'][method_id]['versions'].append(apidetail['version'])
                result_ext[api['name']]['methods'][method_id]['versions'].append(apidetail['version'])
        if 'resources' in resources[resource_type]:
            resources_recurse(resources[resource_type]['resources'], resource_type_path + "/" + resource_type)

apilist = []
with open("gcp/google-api-go-client/api-list.json", "r") as f:
    apilist = json.loads(f.read())['items']

for api in apilist:
    if api['name'] not in result:
        result[api['name']] = {
            'methods': {},
            'preferredVersion': ''
        }
        result_ext[api['name']] = {
            'methods': {},
            'preferredVersion': ''
        }
    if api['preferred']:
        result[api['name']]['title'] = api['title']
        result_ext[api['name']]['title'] = api['title']
        result[api['name']]['description'] = api['description']
        result_ext[api['name']]['description'] = api['description']
        result[api['name']]['preferredVersion'] = api['version']
        result_ext[api['name']]['preferredVersion'] = api['version']
    outdated = (api['preferred'] == False)
    path_version = api['version'].replace("_", "/")
    if path_version == "alpha":
        path_version = "v0.alpha"
    if path_version == "beta":
        path_version = "v0.beta"
    with open("gcp/google-api-go-client/{}/{}/{}-api.json".format(api['name'], path_version, api['name']), "r") as f:
        apidetail = json.loads(f.read())
        print(api['name'])
        print("- " + api['version'])
        resources_recurse({
            "": apidetail
        }, "")

with open("gcp/methods.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
with open("gcp/methods_ext.json", "w") as f:
    f.write(json.dumps(result_ext, indent=2, sort_keys=True))
