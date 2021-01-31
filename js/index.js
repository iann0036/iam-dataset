const AWS = require('aws-sdk');
const fs = require('fs'); 

const iam_def = JSON.parse(fs.readFileSync('./iam_definition.json', {encoding:'utf8', flag:'r'})); 

sdk_services = []

for (let prop of Object.getOwnPropertyNames(AWS)) {
    if (AWS[prop].prototype instanceof AWS.Service) {
        sdk_services.push(prop);
    }
}

console.log(sdk_services);

iam_services = iam_def.map(x => x.prefix.toLowerCase());

for (let sdk_service of sdk_services) {
    if (!iam_services.includes(sdk_service.toLowerCase())) {
        console.log("Unmapped service: " + sdk_service);
    }
}


