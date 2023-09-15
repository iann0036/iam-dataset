import os
import json
import inflect

p = inflect.engine()

result = {}

apis = {}
with open("azure/api.json", "r") as f:
    apis = json.loads(f.read())

ops = []
with open("azure/provider-operations.json", "r") as f:
    ops = json.loads(f.read())

for opservice in ops:
    combined_ops = opservice['operations']
    for restype in opservice['resourceTypes']:
        combined_ops += restype['operations']
    
    for apibasename, apidetail in apis.items():
        if apibasename.lower() == opservice['name'].lower():
            for httpmethodname, httpmethoddetail in apidetail.items():
                for pathname, pathdetail in httpmethoddetail.items():
                    method_parts = pathdetail['operationId'].split("_")

                    candidates = []

                    for op in combined_ops:
                        opname = op['name'].removeprefix(opservice['name'] + "/")
                        opname_parts = opname.split("/")

                        # 2:2
                        if len(method_parts) == 2 and len(opname_parts) == 2 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[1].lower() == "read" and method_parts[1].lower() in ["list", "get"]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 2 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[1].lower() == "delete" and method_parts[1].lower() in ["delete"]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 2 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[1].lower() == "write" and method_parts[1].lower() in ["create", "update", "createorupdate"]:
                            candidates.append(op['name'])
                            continue

                        # 3:2
                        if len(method_parts) == 2 and len(opname_parts) == 3 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[2].lower() == "read" and method_parts[1].lower() in ["list"+opname_parts[1].lower(), "get"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 3 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[2].lower() == "delete" and method_parts[1].lower() in ["delete"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 3 and method_parts[0].lower() == opname_parts[0].lower() and opname_parts[2].lower() == "write" and method_parts[1].lower() in ["create"+opname_parts[1].lower(), "update"+opname_parts[1].lower(), "createorupdate"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 3 and method_parts[0].lower() == opname_parts[0].lower() and method_parts[1].lower() == opname_parts[1].lower() and opname_parts[2].lower() == "action":
                            candidates.append(op['name'])
                            continue

                        method_parts0plural = p.plural_noun(method_parts[0].lower())

                        # 2:2 plural
                        if len(method_parts) == 2 and len(opname_parts) == 2 and method_parts0plural == opname_parts[0].lower() and opname_parts[1].lower() == "read" and method_parts[1].lower() in ["list", "get"]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 2 and method_parts0plural == opname_parts[0].lower() and opname_parts[1].lower() == "delete" and method_parts[1].lower() in ["delete"]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 2 and method_parts0plural == opname_parts[0].lower() and opname_parts[1].lower() == "write" and method_parts[1].lower() in ["create", "update", "createorupdate"]:
                            candidates.append(op['name'])
                            continue

                        # 3:2 plural [Location_ListCapabilities == locations/capabilities/read]
                        if len(method_parts) == 2 and len(opname_parts) == 3 and method_parts0plural == opname_parts[0].lower() and opname_parts[2].lower() == "read" and method_parts[1].lower() in ["list"+opname_parts[1].lower(), "get"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 3 and method_parts0plural == opname_parts[0].lower() and opname_parts[2].lower() == "delete" and method_parts[1].lower() in ["delete"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                        elif len(method_parts) == 2 and len(opname_parts) == 3 and method_parts0plural == opname_parts[0].lower() and opname_parts[2].lower() == "write" and method_parts[1].lower() in ["create"+opname_parts[1].lower(), "update"+opname_parts[1].lower(), "createorupdate"+opname_parts[1].lower()]:
                            candidates.append(op['name'])
                            continue
                    
                    if len(candidates) == 1:
                        if httpmethodname.upper() not in result:
                            result[httpmethodname.upper()] = {}
                        if pathname not in result[httpmethodname.upper()]:
                            result[httpmethodname.upper()][pathname] = {}
                        if candidates[0] not in result[httpmethodname.upper()][pathname]:
                            result[httpmethodname.upper()][pathname][candidates[0]] = {}
                        result[httpmethodname.upper()][pathname][candidates[0]]['automated'] = True

with open("azure/map.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
