import os
import json
import time
import requests
import re
from bs4 import BeautifulSoup

base_ref_page = requests.get("https://cloud.google.com/iam/docs/permissions-reference").text
frame_page_url = re.search('<iframe src="([^"]+)"', base_ref_page).group(1)
if frame_page_url[0] == "/":
    frame_page_url = "https://cloud.google.com" + frame_page_url
frame_page = requests.get(frame_page_url).text
parsed_frame_page = BeautifulSoup(frame_page)

result = {}

permissions_overrides = {}
with open("gcp/permissions_overrides.json", "r") as f:
    permissions_overrides = json.loads(f.read())

for k in permissions_overrides.keys():
    result[k] = permissions_overrides[k]

for row in parsed_frame_page.find('tbody').find_all('tr'):
    permission = row.find_all('td')[0].get('id')
    result[permission] = []
    for role in row.find_all('td')[1].find_all('li'):
        result[permission].append({
            'id': role.find('code').decode_contents().replace("<wbr/>", ""),
            'name': role.decode_contents().split(" (")[0]
        })

with open("gcp/permissions.json", "w") as f:
    f.write(json.dumps(result, indent=2, sort_keys=True))
    