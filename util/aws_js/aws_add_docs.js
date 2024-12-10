const fetch = require('node-fetch');
const fs = require('fs');

async function x() {
    var packagedata = await fetch('https://raw.githubusercontent.com/aws/aws-sdk-ruby/refs/heads/version-3/services.json');
    var package = await packagedata.json();
    var out = {};

    for (var sdkmetadataservice of Object.keys(package)) {
        console.log("Processing " + sdkmetadataservice);
        try {
            var sdkdatatxt = await fetch(`https://raw.githubusercontent.com/aws/aws-sdk-ruby/refs/heads/version-3/apis/${package[sdkmetadataservice]['models']}/docs-2.json`);
            var sdkdata = await sdkdatatxt.json();

            for (var op of Object.keys(sdkdata["operations"])) {
                var actionname = sdkmetadataservice + "." + op;

                out[actionname] = sdkdata["operations"][op];
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    fs.writeFileSync('docs.json', JSON.stringify(out, null, 2))
}

x();
