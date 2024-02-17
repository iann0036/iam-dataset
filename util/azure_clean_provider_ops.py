import json
import re

provider_ops = []
with open("azure/provider-operations.json", "r") as f:
    provider_ops = json.loads(f.read())

for provideropid, providerop in enumerate(provider_ops):
    i = 0
    while i < len(providerop['operations']):
        j = i + 1
        while j < len(providerop['operations']):
            if providerop['operations'][j]['name'].lower() == providerop['operations'][i]['name'].lower():
                if providerop['operations'][j]['origin'] != providerop['operations'][j]['origin']:
                    print('origin mismatch for ' + providerop['name'] + " " + providerop['operations'][i]['name'])
                else:
                    providerop['operations'] = providerop['operations'][:j] + providerop['operations'][j+1:]
            j += 1
        i += 1

with open("azure/provider-operations.json", "w") as f:
    f.write(json.dumps(provider_ops, indent=2, sort_keys=True))
