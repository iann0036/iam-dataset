import os
import json
import yaml

risks = {
    'PrivEsc': [],
    'DataAccess': [],
    'CredentialExposure': []
}

for service_parent in os.listdir("iam-privilege-catalog/services/gcp/"):
    if os.path.isdir("iam-privilege-catalog/services/gcp/{}/".format(service_parent)):
        for service_yaml in os.listdir("iam-privilege-catalog/services/gcp/{}/".format(service_parent)):
            with open("iam-privilege-catalog/services/gcp/{}/{}".format(service_parent, service_yaml), "r") as f:
                contents = {}
                try:
                    contents = yaml.safe_load(f)
                except:
                    continue

                service_basename = os.path.splitext(service_yaml)[0]

                for privilege_name in contents["privileges"].keys():
                    for risk in contents["privileges"][privilege_name]["risks"]:
                        if risk == "escalation:privilege":
                            risks["PrivEsc"].append("{}.{}.{}".format(service_parent, service_basename, privilege_name))
                            risks["PrivEsc"] = list(set(risks["PrivEsc"])) # dedup
                        if risk == "exfiltration:data":
                            risks["DataAccess"].append("{}.{}.{}".format(service_parent, service_basename, privilege_name))
                            risks["DataAccess"] = list(set(risks["DataAccess"])) # dedup
                        if risk == "takeover:account":
                            risks["CredentialExposure"].append("{}.{}.{}".format(service_parent, service_basename, privilege_name))
                            risks["CredentialExposure"] = list(set(risks["CredentialExposure"])) # dedup

with open("gcp/tags.json", "w") as f:
    f.write(json.dumps({"iam": risks}, indent=2, sort_keys=True))
