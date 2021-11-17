import os
import json

permissions_json = {}
roles_json = {}

with open("gcp/permissions.json", "r") as f:
    permissions_json = json.loads(f.read())

for filename in os.listdir("gcp/roles/"):
    with open("gcp/roles/" + filename) as f:
        print(filename)
        data = f.read()
        print(data)
        role_json = json.loads(data)
        if 'includedPermissions' not in role_json:
            role_json['includedPermissions'] = []
            print(filename)
        for includedPermission in role_json['includedPermissions']:
            includedPermission = includedPermission.replace("/", "-")
            if includedPermission not in roles_json:
                roles_json[includedPermission] = []
            if role_json['title'].endswith(" (v1)"):
                role_json['title'] = role_json['title'][:-len(" (v1)")]
            if role_json['title'].endswith(" (beta)"):
                role_json['title'] = role_json['title'][:-len(" (beta)")]
            roles_json[includedPermission].append({
                'id': role_json['name'],
                'name': role_json['title']
            })

for k in permissions_json.keys():
    permissions_json[k].sort(key=lambda x: x['id'])
for k in roles_json.keys():
    roles_json[k].sort(key=lambda x: x['id'])

with open("gcp/permissions_sorted.json", "w") as f:
    f.write(json.dumps(permissions_json, sort_keys=True, indent=2))
with open("gcp/role_permissions.json", "w") as f:
    f.write(json.dumps(roles_json, sort_keys=True, indent=2))
