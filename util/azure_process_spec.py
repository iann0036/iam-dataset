import os
import json

result = {}

for rootitem in os.listdir('azure-rest-api-specs/specification/'):
    if os.path.isdir('azure-rest-api-specs/specification/' + rootitem) and not rootitem.startswith("."):
        if os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/'):
            for servicename in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/'):
                if os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicename + '/'):
                    result[servicename] = {}

                    subresourcesmap = {}

                    for item in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicename + '/'):
                        if item == "preview" or item == "stable":
                            subresourcesmap[servicename] = {"service": servicename, "subresource": None}
                        elif os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicename + '/' + item + '/stable/') or os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicename + '/' + item + '/preview/'):
                            subresourcesmap[servicename + "/" + item] = {"service": servicename, "subresource": item}
                    
                    for servicenamewithsubresource, subresourcedetail in subresourcesmap.items():
                        for stability in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/'):
                            if (stability == "stable" or stability == "preview") and os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/'):
                                for apiversion in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/'):
                                    if os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/' + apiversion + '/'):
                                        for versionfile in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/' + apiversion + '/'):
                                            if versionfile.endswith(".json"):
                                                spec = {}
                                                with open('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/' + apiversion + '/' + versionfile, "r") as f:
                                                    spec = json.loads(f.read())
                                                for pathname, pathdetail in spec['paths'].items():
                                                    for httpmethodname, httpmethoddetail in pathdetail.items():            
                                                        if httpmethodname == "parameters":
                                                            continue
                                                        if httpmethodname not in result[servicename]:
                                                            result[servicename][httpmethodname] = {}
                                                        if pathname not in result[servicename][httpmethodname]:
                                                            result[servicename][httpmethodname][pathname] = {}
                                                        if 'versions' not in result[servicename][httpmethodname][pathname]:
                                                            result[servicename][httpmethodname][pathname]['versions'] = []
                                                        result[servicename][httpmethodname][pathname]['versions'].append(apiversion)
                                                        result[servicename][httpmethodname][pathname]['versions'].sort()
                                                        result[servicename][httpmethodname][pathname]['operationId'] = httpmethoddetail['operationId']
                                                        if 'description' in httpmethoddetail:
                                                            result[servicename][httpmethodname][pathname]['description'] = httpmethoddetail['description']
                                                        elif 'summary' in httpmethoddetail:
                                                            result[servicename][httpmethodname][pathname]['description'] = httpmethoddetail['summary']
                                                        else:
                                                            result[servicename][httpmethodname][pathname]['description'] = ""


with open("azure/api.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
