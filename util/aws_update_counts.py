import os
import json
import re
import time
import datetime

now = datetime.datetime.utcnow().replace(microsecond=0).isoformat()

historic_counts = {}
with open("aws/historic_counts.json", "r") as f:
    historic_counts = json.loads(f.read())

iam_def = []
with open("aws/iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

iam_count = 0
for service in iam_def:
    iam_count += len(service['privileges'])
historic_counts['iam'].append({
    'count': iam_count,
    'date': now
})

api_count = 0
servicecounts = {}
for servname in os.listdir('util/aws-sdk-ruby/apis/'):
    lastvername = ''
    for vername in os.listdir('util/aws-sdk-ruby/apis/' + servname):
        if vername > lastvername:
            lastvername = vername
    for filename in os.listdir('util/aws-sdk-ruby/apis/' + servname + '/' + lastvername):
        if filename == 'api-2.json':
            with open('util/aws-sdk-ruby/apis/' + servname + '/' + lastvername + '/api-2.json', "r") as f:
                api_def = json.loads(f.read())
                
                serviceId = ''
                if 'serviceId' not in api_def['metadata']:
                    serviceId = api_def['metadata']['endpointPrefix']
                else:
                    serviceId = api_def['metadata']['serviceId']

                servicecounts[serviceId] = len(api_def['operations'].keys())
for v in servicecounts.values():
    api_count += v
historic_counts['api'].append({
    'count': api_count,
    'date': now
})

with open("aws/historic_counts.json", "w") as f:
    f.write(json.dumps(historic_counts, skipkeys=False, indent=2))