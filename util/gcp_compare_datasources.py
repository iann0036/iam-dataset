import os
import json

permissions_json = {}
roles_json = {}
predefined_roles_json = {}

with open("gcp/permissions.json", "r") as f:
    permissions_json = json.loads(f.read())

with open("gcp/predefined_roles.json", "r") as f:
    predefined_roles_json = json.loads(f.read())

with open("gcp/tags.json", "r") as f:
    tags_json = json.loads(f.read())

for filename in os.listdir("gcp/roles/"):
    try:
        with open("gcp/roles/" + filename) as f:
            data = f.read()
            role_json = json.loads(data)
            if 'includedPermissions' not in role_json:
                role_json['includedPermissions'] = []
                print("Permissionless: " + filename)
            for includedPermission in role_json['includedPermissions']:
                includedPermission = includedPermission.replace("/", "-")
                if includedPermission not in roles_json:
                    roles_json[includedPermission] = []
                if role_json['title'].endswith(" (v1)"):
                    role_json['title'] = role_json['title'][:-len(" (v1)")]
                if role_json['title'].endswith(" (beta)"):
                    role_json['title'] = role_json['title'][:-len(" (beta)")]

                undocumented = False
                if includedPermission not in permissions_json:
                    undocumented = True
                else:
                    found = False
                    for item in permissions_json[includedPermission]:
                        if item['id'] == role_json['name']:
                            found = True
                            break
                    if not found:
                        undocumented = True

                if undocumented:
                    for i in range(len(predefined_roles_json)):
                        if predefined_roles_json[i]['name'] == role_json['name']:
                            predefined_roles_json[i]['has_undocumented'] = True

                if includedPermission in tags_json['iam']['CredentialExposure']:
                    for i in range(len(predefined_roles_json)):
                        if predefined_roles_json[i]['name'] == role_json['name']:
                            predefined_roles_json[i]['has_credentialexposure'] = True

                if includedPermission in tags_json['iam']['DataAccess']:
                    for i in range(len(predefined_roles_json)):
                        if predefined_roles_json[i]['name'] == role_json['name']:
                            predefined_roles_json[i]['has_dataaccess'] = True

                if includedPermission in tags_json['iam']['PrivEsc']:
                    for i in range(len(predefined_roles_json)):
                        if predefined_roles_json[i]['name'] == role_json['name']:
                            predefined_roles_json[i]['has_privesc'] = True

                roles_json[includedPermission].append({
                    'id': role_json['name'],
                    'name': role_json['title'],
                    'undocumented': undocumented
                })
    except:
        print("Skipped " + filename)

for k in permissions_json.keys():
    permissions_json[k].sort(key=lambda x: x['id'])
for k in roles_json.keys():
    roles_json[k].sort(key=lambda x: x['id'])

with open("gcp/permissions_sorted.json", "w") as f:
    f.write(json.dumps(permissions_json, sort_keys=True, indent=2))
with open("gcp/role_permissions.json", "w") as f:
    f.write(json.dumps(roles_json, sort_keys=True, indent=2))
with open("gcp/predefined_roles.json", "w") as f:
    f.write(json.dumps(predefined_roles_json, sort_keys=True, indent=2))
