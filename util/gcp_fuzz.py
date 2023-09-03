import os
import re
import json
import pprint
from google.oauth2 import service_account
from googleapiclient.errors import HttpError
import googleapiclient.discovery
import openai
from pathlib import Path

def openai_query(method, additional):
    with open(str(Path.home()) + "/.openai", "r") as f:
        openai.api_key = str(f.read()).strip()

    content = """
For the Google Cloud API {}, provide an example of the arguments as a JSON block, with body content placed in a "body" key if body is present. If a parameter asks for the Project ID, use "iampoll" as the Project ID. For any other parameter, use a realistic example value. Only respond with this JSON block. Never give explanations.
{}
""".format(method, additional).strip()
    
    print(content)
    print("---")

    # create a chat completion
    chat_completion = openai.ChatCompletion.create(model="gpt-4", messages=[{"role": "user", "content": content}])

    content = str(chat_completion.choices[0].message.content)

    content = content.replace("```JAVASCRIPT", "").replace("```javascript", "").replace("```JSON", "").replace("```json", "").replace("```", "")

    return content

methods = {}
with open("gcp/methods_ext.json", "r") as f:
    methods = json.loads(f.read())



discovered_permissions = []
root_service = "cloudfunctions"

##

for method in methods[root_service]["methods"].keys():
    version = methods[root_service]["methods"][method]["versions"].pop()

    additional = ""
    if len(methods[root_service]['methods'][method]['parameters'].keys()) > 0:
        additional = "Available parameters are "
        for k in methods[root_service]['methods'][method]['parameters'].keys():
            if 'required' in methods[root_service]['methods'][method]['parameters'][k] and methods[root_service]['methods'][method]['parameters'][k]['required']:
                additional += "\"" + k + "\""
                if 'pattern' in methods[root_service]['methods'][method]['parameters'][k] and methods[root_service]['methods'][method]['parameters'][k]['pattern']:
                    additional += " (must match regex " + methods[root_service]['methods'][method]['parameters'][k]['pattern'] + ")"
                additional += ", "
        additional = additional[:len(additional)-2]
        if len(additional) < 26:
            additional = ""

    query_result = openai_query(method, additional)
    print(query_result)
    json_query_result = json.loads(query_result)
    print("--")

    credentials = service_account.Credentials.from_service_account_file(
        filename='/tmp/gcloudnothing.json',
        scopes=["https://www.googleapis.com/auth/cloud-platform"],
    )

    service = googleapiclient.discovery.build(root_service, version, credentials=credentials)

    split_tmp = method.split(".")
    method_obj = getattr(service, split_tmp[1])
    split_tmp = split_tmp[2:]
    while len(split_tmp) > 0:
        method_obj = getattr(method_obj(), split_tmp[0])
        split_tmp = split_tmp[1:]
    args = json_query_result

    while True:
        pprint.pprint(args)
        try:
            out = (method_obj(**args).execute())
            pprint.pprint(out)
            break
        except HttpError as e:
            error_msg = json.loads(e.content)
            if 'error' in error_msg and 'status' in error_msg['error'] and error_msg['error']['status'] == "PERMISSION_DENIED":
                pprint.pprint(error_msg)
                if 'details' in error_msg['error'].keys():
                    for detail in error_msg['error']['details']:
                        if detail['@type'] == "type.googleapis.com/google.rpc.ErrorInfo":
                            discovered_permissions.append({
                                'metadata': detail['metadata'],
                                'method': method,
                                'version': version
                            })
                            break
                else:
                    perm_deny_match = re.compile("Permission '(.+)' denied on (?:resource )?'(.+)'").search(str(error_msg['error']['message']))
                    if perm_deny_match:
                        perm = perm_deny_match.group(1)
                        res = perm_deny_match.group(2)
                        discovered_permissions.append({
                            'metadata': {
                                'permission': perm,
                                'resource': res
                            },
                            'method': method,
                            'version': version
                        })
                    else:
                        print("didn't parse:" + str(error_msg['error']['message']))

                print("** Discovered Permissions **")
                pprint.pprint(discovered_permissions)
            else:
                pprint.pprint(e)
                pprint.pprint(e.content)
            break
        except Exception as e:
            missing_match = re.compile("Missing required parameter \"(.*)\"").search(str(e))
            if missing_match:
                new_arg = missing_match.group(1)
                if new_arg == "project":
                    args["project"] = "iampoll"
                else:
                    args[new_arg] = "xxyxx" + new_arg + "zzyzz"
            else:
                pprint.pprint(dir(e))
                print(e)
                break
    print("#---#")

##

map = {}
with open("gcp/map.json", "r") as f:
    map = json.loads(f.read())

if root_service not in map['api'].keys():
    map['api'][root_service] = {}

if 'methods' not in map['api'][root_service]:
    map['api'][root_service]['methods'] = {}

for disc in discovered_permissions:
    if 'permission' not in disc['metadata'].keys() or 'resource' not in disc['metadata'].keys():
        continue

    if disc['method'] not in map['api'][root_service]['methods'].keys():
        map['api'][root_service]['methods'][disc['method']] = {
            'permissions': []
        }
    resource_type = None
    if disc['metadata']['resource'] == "iampoll" or disc['metadata']['resource'] == "projects/iampoll":
        resource_type = "project"
    map['api'][root_service]['methods'][disc['method']]['permissions'].append({
        'name': disc['metadata']['permission'],
        'resourceType': resource_type,
        'discoveryMethodologies': [
            "fuzzv1"
        ]
    })

with open("gcp/map.json", "w") as f:
    f.write(json.dumps(map, indent=2, sort_keys=True))
