import os
import re
import json
import requests
from bs4 import BeautifulSoup

methods = {}
with open("gcp/methods_ext.json", "r") as f:
    methods = json.loads(f.read())

map = {}
with open("gcp/map.json", "r") as f:
    map = json.loads(f.read())

for root_service in methods.keys():
    if root_service not in map['api'].keys():
        map['api'][root_service] = {}

    for method in methods[root_service]["methods"].keys():
        if 'methods' not in map['api'][root_service]:
            map['api'][root_service]['methods'] = {}

        version = methods[root_service]["methods"][method]["versions"].pop()

        method_without_service = method.removeprefix(root_service + ".")
        url = "https://cloud.google.com/{}/docs/reference/rest/{}/{}".format(root_service, version, "/".join(method_without_service.rsplit(".", 1)))
        print("crawling " + url)
        request = requests.get(url)
        if request.status_code == 404:
            print("Skipping " + root_service)
            break
        html_text = request.text
        soup = BeautifulSoup(html_text, 'html.parser')

        if 'restUrl' not in map['api'][root_service]:
            map['api'][root_service]['restUrl'] = "https://cloud.google.com/{}/docs/reference/rest".format(root_service)
        if method not in map['api'][root_service]['methods'].keys():
            map['api'][root_service]['methods'][method] = {}

        # Dedicated IAM block
        iampermblock = soup.find("h3", {"id": "iam-permissions"})
        if iampermblock is not None:
            for code in iampermblock.parent.find_all('code'):
                if code.parent.name != "li":
                    continue
                if 'permissions' not in map['api'][root_service]['methods'][method]:
                    map['api'][root_service]['methods'][method]['permissions'] = []
                map['api'][root_service]['methods'][method]['permissions'].append({
                    'name': code.text,
                    'discoveryMethodologies': [
                        "restcrawliamblockv1"
                    ]
                })

        # Path
        table = soup.find("table", {"id": "body.PATH_PARAMETERS-table"})
        if table is not None:
            tbody = table.find("tbody")

            for tr in tbody.find_all('tr'):
                perm = {}

                for code in tr.find_all('code'):
                    if 'parameterName' not in perm:
                        perm['parameterName'] = code.text
                    elif 'parameterType' not in perm and code.has_attr("class") and " ".join(code.get('class')) == "apitype":
                        perm['parameterType'] = code.text
                    elif 'parameterType' in perm and 'parameterFormat' not in perm and "following IAM permission" not in code.parent.text and code.parent.name != "li":
                        perm['parameterFormat'] = code.text
                    elif "IAM permission" in code.parent.text and 'resourceIndicator' not in perm:
                        perm['resourceIndicator'] = code.text
                    elif code.parent.name == "li" and "following IAM permission" in code.parent.parent.find_previous('p').text:
                        if 'permissions' not in perm:
                            perm['permissions'] = []
                        perm['permissions'].append(code.text)
                    else:
                        perm['lowConfidence'] = True
                        print("Unknown out: " + code.text)

                if 'permissions' in perm and len(perm['permissions']) > 0:
                    if 'permissions' not in map['api'][root_service]['methods'][method]:
                        map['api'][root_service]['methods'][method]['permissions'] = []
                    for permission_instance in perm['permissions']:
                        addedperm = {
                            'name': permission_instance,
                            'parameterType': "path",
                            'discoveryMethodologies': [
                                "restcrawlv1"
                            ]
                        }
                        if 'resourceIndicator' in perm:
                            addedperm['resourceType'] = perm['resourceIndicator']
                        if 'parameterName' in perm:
                            addedperm['parameterName'] = perm['parameterName']
                        if 'parameterFormat' in perm:
                            addedperm['parameterFormat'] = perm['parameterFormat']
                        if 'lowConfidence' in perm:
                            addedperm['lowConfidence'] = perm['lowConfidence']
                        map['api'][root_service]['methods'][method]['permissions'].append(addedperm)

                print(perm)

        # Query
        table = soup.find("table", {"id": "body.QUERY_PARAMETERS-table"})
        if table is not None:
            tbody = table.find("tbody")

            for tr in tbody.find_all('tr'):
                perm = {}

                for code in tr.find_all('code'):
                    if 'parameterName' not in perm:
                        perm['parameterName'] = code.text
                    elif 'parameterType' not in perm and code.has_attr("class") and " ".join(code.get('class')) == "apitype":
                        perm['parameterType'] = code.text
                    elif 'parameterType' in perm and 'parameterFormat' not in perm and "following IAM permission" not in code.parent.text and code.parent.name != "li":
                        perm['parameterFormat'] = code.text
                    elif "IAM permission" in code.parent.text and 'resourceIndicator' not in perm:
                        perm['resourceIndicator'] = code.text
                    elif code.parent.name == "li" and "following IAM permission" in code.parent.parent.find_previous('p').text:
                        if 'permissions' not in perm:
                            perm['permissions'] = []
                        perm['permissions'].append(code.text)
                    else:
                        perm['lowConfidence'] = True
                        print("Unknown out: " + code.text)

                if 'permissions' in perm and len(perm['permissions']) > 0:
                    if 'permissions' not in map['api'][root_service]['methods'][method]:
                        map['api'][root_service]['methods'][method]['permissions'] = []
                    for permission_instance in perm['permissions']:
                        addedperm = {
                            'name': permission_instance,
                            'parameterType': "query",
                            'discoveryMethodologies': [
                                "restcrawlv1"
                            ]
                        }
                        if 'resourceIndicator' in perm:
                            addedperm['resourceType'] = perm['resourceIndicator']
                        if 'parameterName' in perm:
                            addedperm['parameterName'] = perm['parameterName']
                        #if 'parameterFormat' in perm:
                        #    addedperm['parameterFormat'] = perm['parameterFormat']
                        if 'lowConfidence' in perm:
                            addedperm['lowConfidence'] = perm['lowConfidence']
                        map['api'][root_service]['methods'][method]['permissions'].append(addedperm)

                print(perm)

        # Dedup
        permdict = {}
        for perminst in map['api'][root_service]['methods'][method]['permissions']:
            if not perminst['name'] in permdict.keys():
                permdict[perminst['name']] = perminst
            else:
                permdict[perminst['name']]['discoveryMethodologies'] = list(set(perminst['discoveryMethodologies']) | set(permdict[perminst['name']]['discoveryMethodologies']))
                if 'parameterType' in perminst.keys():
                    permdict[perminst['name']]['parameterType'] = perminst['parameterType']
                if 'resourceIndicator' in perminst.keys():
                    permdict[perminst['name']]['resourceIndicator'] = perminst['resourceIndicator']
                if 'parameterName' in perminst.keys():
                    permdict[perminst['name']]['parameterName'] = perminst['parameterName']
                if 'lowConfidence' in perminst.keys():
                    permdict[perminst['name']]['lowConfidence'] = perminst['lowConfidence']
        map['api'][root_service]['methods'][method]['permissions'] = permdict.values()



with open("gcp/map.json", "w") as f:
    f.write(json.dumps(map, indent=2, sort_keys=True))
