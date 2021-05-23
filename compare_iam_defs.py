import os
import json
import sys

old_def = []
new_def = []

with open(sys.argv[1], 'r') as f:
    old_def = json.loads(f.read())
with open(sys.argv[2], 'r') as f:
    new_def = json.loads(f.read())

priv_change_count = 0
res_change_count = 0

for oldservice in old_def:
    service_name = oldservice['service_name']

    updatedservice = None
    for newservice in new_def:
        if newservice['service_name'] == service_name:
            updatedservice = newservice
    if updatedservice is None:
        raise Exception('Service destroyed: ' + service_name)
    
    for oldpriv in oldservice['privileges']:
        if 'description' in oldpriv:
            del oldpriv['description']
        if 'access_level' in oldpriv:
            del oldpriv['access_level']
        oldprivdump = json.dumps(oldpriv)
        newprivdump = None
        
        for newpriv in updatedservice['privileges']:
            if newpriv['privilege'] == oldpriv['privilege']:
                if 'description' in newpriv:
                    del newpriv['description']
                if 'access_level' in newpriv:
                    del newpriv['access_level']
                newprivdump = json.dumps(newpriv)
                break
        if newprivdump is None:
            print('Method destroyed: ' + service_name + ":" + oldpriv['privilege'])
        
        if oldprivdump != newprivdump:
            print("Method changed: " + service_name + ":" + oldpriv['privilege'])
            print("Old: " + oldprivdump)
            print("New: " + str(newprivdump))
            priv_change_count += 1

    for oldres in oldservice['resources']:
        oldresdump = json.dumps(oldres)
        newresdump = None

        for newres in updatedservice['resources']:
            if newres['resource'] == oldres['resource']:
                newresdump = json.dumps(newres)
                break
        if newresdump is None:
            print('Resource destroyed: ' + service_name + "->" + oldres['resource'])

        if oldresdump != newresdump:
            print("Resource changed: " + service_name + "->" + oldres['resource'])
            print("Old: " + oldresdump)
            print("New: " + str(newresdump))
            res_change_count += 1

print("---")
print("Privilege Change Count: " + str(priv_change_count))
print("Resource Change Count: " + str(res_change_count))
