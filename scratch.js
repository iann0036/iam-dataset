// add dependants

var mapdata = await fetch('https://raw.githubusercontent.com/iann0036/sdk-iam-map/main/map.json');
map = await mapdata.json();

var iamdefdata = await fetch('https://raw.githubusercontent.com/iann0036/sdk-iam-map/main/js/iam_definition.json');
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

