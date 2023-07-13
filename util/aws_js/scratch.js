// add dependants

var mapdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/aws/map.json');
map = await mapdata.json();

var iamdefdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/util/aws_js/iam_definition.json');
iamdef = await iamdefdata.json();

for (var iamdefitem of iamdef) {
    iamdefitem.prefix
    for (var priv of iamdefitem.privileges) {
        priv.privilege
        for (var restype of priv.resource_types) {
            if (restype['dependent_actions'].length > 0) {
                for (var depaction of restype['dependent_actions']) {
                    //console.log(depaction + " - " + iamdefitem.prefix + ":" + priv.privilege);
                    for (var iammappingkey of Object.keys(map['sdk_method_iam_mappings'])) {
                        if (map['sdk_method_iam_mappings'][iammappingkey][0]['action'] == (iamdefitem.prefix + ":" + priv.privilege)) {
                            map['sdk_method_iam_mappings'][iammappingkey].unshift({
                                'action': depaction,
                                'documented_dependant_action': true
                            });
                        }
                    }
                }
            }
        }
    }
}

// find dependency chains

var mapdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/aws/map.json');
map = await mapdata.json();

var iamdefdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/util/aws_js/iam_definition.json');
iamdef = await iamdefdata.json();

var chains = [];

for (var j=0; j<20; j++) {
    for (var iamdefitem of iamdef) {
        for (var priv of iamdefitem.privileges) {
            for (var restype of priv.resource_types) {
                if (restype['dependent_actions'].length > 0) {
                    for (var depaction of restype['dependent_actions']) {
                        var chainslength = chains.length;
                        for (var i=0; i<chainslength; i++) {
                            if (chains[i][0] == depaction) {
                                chains[i].unshift(iamdefitem.prefix + ":" + priv.privilege);
                            }
                        }

                        chains.push([iamdefitem.prefix + ":" + priv.privilege, depaction]);
                    }
                }
            }
        }
    }
}

chains = chains.filter(x => x.length > 2);

let set  = new Set(chains.map(JSON.stringify));
let arr2 = Array.from(set).map(JSON.parse);

for (var el of arr2) {
    console.log(el.join(","));
}
