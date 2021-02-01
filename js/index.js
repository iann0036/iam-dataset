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
    if (Object.keys(map['js_sdk_service_mappings']).includes(sdk_service)) {
        iam_service = map['js_sdk_service_mappings'][sdk_service];
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

    console.dir(AWS);
}

