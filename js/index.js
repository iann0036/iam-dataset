const AWS = require('aws-sdk');
const fs = require('fs'); 

const iam_def = JSON.parse(fs.readFileSync('./iam_definition.json', {encoding:'utf8', flag:'r'}));
const map = JSON.parse(fs.readFileSync('../map.json', {encoding:'utf8', flag:'r'}));

sdk_services = []

for (let prop of Object.getOwnPropertyNames(AWS)) {
    if (AWS[prop].prototype instanceof AWS.Service) {
        sdk_services.push(prop);
    }
}

iam_services = iam_def.map(x => x.prefix.toLowerCase());

for (let sdk_service of sdk_services) {
    iam_service = null;
    if (Object.keys(map['sdk_service_mappings']).includes(sdk_service)) {
        iam_service = map['sdk_service_mappings'][sdk_service];
    } else {
        for (let service of iam_def) {
            if (service.prefix.toLowerCase() == sdk_service.toLowerCase()) {
                iam_service = service.prefix;
            }
        }
    }
    if (!iam_service) {
        console.log("Unmapped service: " + sdk_service);
    }
}

let methods = [];
let unmapped_methods = [];

for (let service of Object.keys(AWS.apiLoader.services)) {
    for (let operation of Object.keys(AWS.apiLoader.services[service][Object.keys(AWS.apiLoader.services[service]).pop()]['operations'])) {
        for (let sdkclass of Object.keys(AWS)) {
            if (AWS[sdkclass]['serviceIdentifier'] == service) {
                let fully_mapped = false;

                methods.push(sdkclass + "." + operation);

                if (map['sdk_method_iam_mappings'][sdkclass + "." + operation] && map['sdk_method_iam_mappings'][sdkclass + "." + operation][0]["action"] != "") {
                    fully_mapped = true;
                }

                let mapped_iam_service = sdkclass;
                if (map['sdk_service_mappings'][sdkclass]) {
                    mapped_iam_service = map['sdk_service_mappings'][sdkclass];
                }

                for (let iam_service of iam_def) {
                    if (iam_service['prefix'].toLowerCase() == mapped_iam_service.toLowerCase()) {
                        for (let priv of iam_service["privileges"]) {
                            if (priv.privilege == operation) {
                                fully_mapped = true;
                            }
                        }
                    }
                }

                if (!fully_mapped) {
                    console.log(sdkclass + "." + operation);
                    unmapped_methods.push(sdkclass + "." + operation);
                }
            }
        }
    }
}

console.log(methods.length);
console.log(unmapped_methods.length);
