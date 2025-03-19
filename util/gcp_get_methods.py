import os
import json
import time
import requests
import re

result = {}
result_ext = {}
proto = {
    "get": {},
    "post": {},
    "put": {},
    "delete": {},
    "patch": {}
}

def strip_var(original_pattern, original_path):
    newpattern = re.sub(r'{[^/=]+?}', r'*', original_pattern)
    newpattern = re.sub(r'{.+?=(.+)}', r'\1', newpattern)
    offset = newpattern.find('/', newpattern.find('/v') + 1)
    version = newpattern[1:offset]
    newpattern = "*" + newpattern[offset:]
    newpath = original_path.replace(version, "{" + "_version}")

    return newpattern, newpath

def dig_nested(obj, path):
    if 'nested' in obj:
        for k, v in obj['nested'].items():
            dig_nested(v, path + k + "/")
    if 'methods' in obj:
        for k, v in obj['methods'].items():
            if 'options' in v:
                if "(google.api.http).get" in v['options']:
                    newpattern, newpath = strip_var(v['options']["(google.api.http).get"], path + k)
                    if newpattern not in proto['get']:
                        proto['get'][newpattern] = [newpath]
                    else:
                        proto['get'][newpattern].append(newpath)
                        proto['get'][newpattern] = list(set(proto['get'][newpattern]))
                if "(google.api.http).post" in v['options']:
                    newpattern, newpath = strip_var(v['options']["(google.api.http).post"], path + k)
                    if newpattern not in proto['post']:
                        proto['post'][newpattern] = [newpath]
                    else:
                        proto['post'][newpattern].append(newpath)
                        proto['post'][newpattern] = list(set(proto['post'][newpattern]))
                if "(google.api.http).put" in v['options']:
                    newpattern, newpath = strip_var(v['options']["(google.api.http).put"], path + k)
                    if newpattern not in proto['put']:
                        proto['put'][newpattern] = [newpath]
                    else:
                        proto['put'][newpattern].append(newpath)
                        proto['put'][newpattern] = list(set(proto['put'][newpattern]))
                if "(google.api.http).delete" in v['options']:
                    newpattern, newpath = strip_var(v['options']["(google.api.http).delete"], path + k)
                    if newpattern not in proto['delete']:
                        proto['delete'][newpattern] = [newpath]
                    else:
                        proto['delete'][newpattern].append(newpath)
                        proto['delete'][newpattern] = list(set(proto['delete'][newpattern]))
                if "(google.api.http).patch" in v['options']:
                    newpattern, newpath = strip_var(v['options']["(google.api.http).patch"], path + k)
                    if newpattern not in proto['patch']:
                        proto['patch'][newpattern] = [newpath]
                    else:
                        proto['patch'][newpattern].append(newpath)
                        proto['patch'][newpattern] = list(set(proto['patch'][newpattern]))

def resources_recurse(resources, resource_type_path):
    for resource_type in resources.keys():
        #print("-- " + resource_type)
        if 'methods' in resources[resource_type]:
            for method_name in resources[resource_type]['methods'].keys():
                method_id = resources[resource_type]['methods'][method_name]['id']
                if method_id not in result[api['name']]['methods']:
                    flatpath = resources[resource_type]['methods'][method_name]['flatPath'] if 'flatPath' in resources[resource_type]['methods'][method_name] else resources[resource_type]['methods'][method_name]['path']
                    if flatpath.startswith(apidetail['version'] + "/"):
                        flatpath = "{" + "_version}" + flatpath[len(apidetail['version']):]

                    normalized_flatpath = re.sub(r'{(.+?)}', r'*', flatpath)
                    api_path = []
                    if normalized_flatpath in proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()]:
                        api_path = proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()][normalized_flatpath]
                        del proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()][normalized_flatpath]
                    elif method_id.startswith("compute."): # missing leading */
                        normalized_flatpath = "*/" + normalized_flatpath
                        if normalized_flatpath in proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()]:
                            api_path = proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()][normalized_flatpath]
                            del proto[resources[resource_type]['methods'][method_name]['httpMethod'].lower()][normalized_flatpath]

                    result[api['name']]['methods'][method_id] = {
                        'description': resources[resource_type]['methods'][method_name]['description'] if 'description' in resources[resource_type]['methods'][method_name] else '',
                        'httpMethod': resources[resource_type]['methods'][method_name]['httpMethod'],
                        'method': method_name,
                        'resourceType': resource_type,
                        'resourceTypePath': resource_type_path,
                        'flatPath': flatpath,
                        'versions': [],
                        'apiPaths': api_path,
                    }
                    result_ext[api['name']]['methods'][method_id] = {
                        'description': resources[resource_type]['methods'][method_name]['description'] if 'description' in resources[resource_type]['methods'][method_name] else '',
                        'httpMethod': resources[resource_type]['methods'][method_name]['httpMethod'],
                        'method': method_name,
                        'resourceType': resource_type,
                        'resourceTypePath': resource_type_path,
                        'flatPath': flatpath,
                        'versions': [],
                        'apiPaths': api_path,
                        'parameters': resources[resource_type]['methods'][method_name]['parameters'] if 'parameters' in resources[resource_type]['methods'][method_name] else {}
                    }
                result[api['name']]['methods'][method_id]['versions'].append(apidetail['version'])
                result_ext[api['name']]['methods'][method_id]['versions'].append(apidetail['version'])
        if 'resources' in resources[resource_type]:
            resources_recurse(resources[resource_type]['resources'], resource_type_path + "/" + resource_type)

apilist = []
with open("gcp/google-api-go-client/api-list.json", "r") as f:
    apilist = json.loads(f.read())['items']

for dirpath, dnames, fnames in os.walk("gcp/google-cloud-node/"):
    for fn in fnames:
        if fn == "protos.json":
            with open(os.path.join(dirpath, fn)) as f:
                singleproto = json.loads(f.read())
                dig_nested(singleproto, '')

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
    try:
        with open("gcp/google-api-go-client/{}/{}/{}-api.json".format(api['name'], path_version, api['name']), "r") as f:
            apidetail = json.loads(f.read())
            #print(api['name'])
            #print("- " + api['version'])
            resources_recurse({
                "": apidetail
            }, "")
    except Exception as e:
        print(e)

with open("gcp/methods.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
with open("gcp/methods_ext.json", "w") as f:
    f.write(json.dumps(result_ext, indent=2, sort_keys=True))
