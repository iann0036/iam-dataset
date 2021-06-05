import os
import json
import re
import time
import datetime

now = datetime.datetime.utcnow()

historic_counts = {}
with open("historic-counts.json", "r") as f:
    historic_counts = json.loads(f.read())

shortdate = str(now).split("T")[0]

while shortdate != '2020-06-01':
    now = now - datetime.timedelta(days=1)

    print(now)

    shortdate = str(now).split(" ")[0]

    print(shortdate)

    os.system('cd aws-sdk-js && git reset --hard $(git rev-list -1 $(git rev-parse --until=' + shortdate + ') master)')

    api_count = 0
    for filename in os.listdir('aws-sdk-js/apis/'):
        if filename.endswith('.min.json'):
            with open('aws-sdk-js/apis/' + filename, "r") as f:
                api_def = json.loads(f.read())
                api_count += len(api_def['operations'].keys())
    historic_counts['api'].append({
        'count': api_count,
        'date': shortdate + 'T00:00:00'
    })

historic_counts['api'] = historic_counts['api'][::-1]

with open("historic-counts.json", "w") as f:
    f.write(json.dumps(historic_counts))
