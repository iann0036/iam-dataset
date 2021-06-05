import os
import json
import re
import time
import datetime

now = datetime.datetime.utcnow().replace(microsecond=0).isoformat()

historic_counts = {}
with open("historic-counts.json", "r") as f:
    historic_counts = json.loads(f.read())

iam_def = []
with open("js/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

iam_count = 0
for service in iam_def:
    iam_count += len(service['privileges'])
historic_counts['iam'].append({
    'count': iam_count,
    'date': now
})

api_count = 0
for filename in os.listdir('node_modules/aws-sdk/apis/'):
    if filename.endswith('.min.json'):
        with open('node_modules/aws-sdk/apis/' + filename, "r") as f:
            api_def = json.loads(f.read())
            api_count += len(api_def['operations'].keys())
historic_counts['api'].append({
    'count': api_count,
    'date': now
})

with open("historic-counts.json", "w") as f:
    f.write(json.dumps(historic_counts))