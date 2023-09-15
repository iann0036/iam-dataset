import os
import re
import json
import inflect

p = inflect.engine()

path_entities_pattern = re.compile("^/([a-zA-Z0-9._-]+)/{[a-zA-Z0-9._-]+}($|/.+)")
path_entities_action_pattern = re.compile("^/([a-zA-Z0-9._-]+)$")

result = {}
with open("azure/map.json", "r") as f:
    result = json.loads(f.read())

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

                    # Basic matching
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

                    # Entity array matching
                    if len(candidates) == 0:
                        trimmed_pathname = pathname
                        scope_subscription = False
                        if trimmed_pathname.startswith("/subscriptions/{subscriptionId}"):
                            scope_subscription = True
                            trimmed_pathname = trimmed_pathname[len("/subscriptions/{subscriptionId}"):]
                        scope_resourcegroup = False
                        if trimmed_pathname.startswith("/resourceGroups/{resourceGroupName}"):
                            scope_resourcegroup = True
                            trimmed_pathname = trimmed_pathname[len("/resourceGroups/{resourceGroupName}"):]
                        scope_provider = False
                        if trimmed_pathname.startswith("/providers/" + apibasename):
                            scope_provider = True
                            trimmed_pathname = trimmed_pathname[len("/providers/" + apibasename):]

                        if trimmed_pathname.endswith("/default"):
                            trimmed_pathname = trimmed_pathname[:-len("/default")]

                        path_entities = []
                        m = path_entities_pattern.match(trimmed_pathname)
                        while m:
                            path_entities.append(m.group(1).lower())
                            trimmed_pathname = m.group(2)
                            if trimmed_pathname is not None:
                                m = path_entities_pattern.match(trimmed_pathname)

                        is_action = False
                        if trimmed_pathname != "":
                            m = path_entities_action_pattern.match(trimmed_pathname)
                            if m:
                                path_entities.append(m.group(1).lower())
                                trimmed_pathname = ""
                                if httpmethodname.lower() == "post":
                                    is_action = True
                                elif httpmethodname.lower() != "get":
                                    continue
                        
                        path_entities_join = "/".join(path_entities)
                        path_entities_join_noslashes = "".join(path_entities)
                        if is_action:
                            path_entities_join += "/action"
                            path_entities_join_noslashes += "/action"
                        elif httpmethodname.lower() in ["get"]:
                            path_entities_join += "/read"
                            path_entities_join_noslashes += "/read"
                        elif httpmethodname.lower() in ["delete"]:
                            path_entities_join += "/delete"
                            path_entities_join_noslashes += "/delete"
                        elif httpmethodname.lower() in ["post", "put", "patch"]:
                            path_entities_join += "/write"
                            path_entities_join_noslashes += "/write"

                        path_entries_singular_join = ""
                        exceptfirst = True
                        path_entries_singular_join_noslashes = ""
                        for path_entity in path_entities:
                            singular = p.singular_noun(path_entity)
                            if singular:
                                path_entries_singular_join += singular + "/"
                                path_entries_singular_join_noslashes += singular
                            else:
                                path_entries_singular_join += path_entity + "/"
                                path_entries_singular_join_noslashes += path_entity
                            exceptfirst = False
                        if is_action:
                            path_entries_singular_join += "action"
                            path_entries_singular_join_noslashes += "/action"
                        elif httpmethodname.lower() in ["get"]:
                            path_entries_singular_join += "read"
                            path_entries_singular_join_noslashes += "/read"
                        elif httpmethodname.lower() in ["delete"]:
                            path_entries_singular_join += "delete"
                            path_entries_singular_join_noslashes += "/delete"
                        elif httpmethodname.lower() in ["post", "put", "patch"]:
                            path_entries_singular_join += "write"
                            path_entries_singular_join_noslashes += "/write"

                        if trimmed_pathname == "":
                            for op in combined_ops:
                                opname = op['name'].removeprefix(opservice['name'] + "/")
                                opname_parts = opname.split("/")

                                if opname.lower() in [
                                    path_entities_join.lower(),
                                    path_entities_join_noslashes.lower(),
                                    path_entries_singular_join.lower(),
                                    path_entries_singular_join_noslashes.lower()
                                ]:
                                    candidates.append(op['name'])
                                    continue
                    
                    ## End
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
