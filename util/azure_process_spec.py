import os
import json

result = {}

for rootitem in os.listdir('azure-rest-api-specs/specification/'):
    if os.path.isdir('azure-rest-api-specs/specification/' + rootitem) and not rootitem.startswith("."):
        if os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/'):
            for servicename in os.listdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/'):
                if os.path.isdir('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicename + '/'):
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
                                                try:
                                                    with open('azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/' + apiversion + '/' + versionfile, mode="r", encoding='utf-8') as f:
                                                        spec = json.loads(f.read())
                                                except:
                                                    print("ERROR: failure to process " + 'azure-rest-api-specs/specification/' + rootitem + '/resource-manager/' + servicenamewithsubresource + '/' + stability + '/' + apiversion + '/' + versionfile)
                                                    continue
                                                for pathname, pathdetail in spec['paths'].items():
                                                    for httpmethodname, httpmethoddetail in pathdetail.items():            
                                                        if httpmethodname == "parameters":
                                                            continue
                                                        mappedservicename = servicename
                                                        if "." not in mappedservicename:
                                                            if subresourcedetail['subresource'] is not None:
                                                                mappedservicename = subresourcedetail['subresource']
                                                            if rootitem == "marketplacecatalog":
                                                                mappedservicename = "Microsoft.Marketplace"
                                                        if "." not in mappedservicename:
                                                            print(servicename)
                                                            print(rootitem)
                                                            print("---")
                                                            raise "Unmapped service"
                                                        if mappedservicename not in result:
                                                            result[mappedservicename] = {}
                                                        if httpmethodname not in result[mappedservicename]:
                                                            result[mappedservicename][httpmethodname] = {}
                                                        if pathname not in result[mappedservicename][httpmethodname]:
                                                            result[mappedservicename][httpmethodname][pathname] = {}
                                                        if 'versions' not in result[mappedservicename][httpmethodname][pathname]:
                                                            result[mappedservicename][httpmethodname][pathname]['versions'] = []
                                                        result[mappedservicename][httpmethodname][pathname]['versions'].append(apiversion)
                                                        result[mappedservicename][httpmethodname][pathname]['versions'].sort()
                                                        result[mappedservicename][httpmethodname][pathname]['operationId'] = httpmethoddetail['operationId']
                                                        if 'info' in spec and 'title' in spec['info']:
                                                            result[mappedservicename][httpmethodname][pathname]['clientHint'] = spec['info']['title']
                                                        if 'description' in httpmethoddetail:
                                                            result[mappedservicename][httpmethodname][pathname]['description'] = httpmethoddetail['description']
                                                        elif 'summary' in httpmethoddetail:
                                                            result[mappedservicename][httpmethodname][pathname]['description'] = httpmethoddetail['summary']
                                                        else:
                                                            result[mappedservicename][httpmethodname][pathname]['description'] = ""


with open("azure/api.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
