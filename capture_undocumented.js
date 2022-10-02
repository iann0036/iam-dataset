// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.TagResource {3} - apigateway
CloudFront.CreateOriginAccessControl {3} - cloudfront
CloudFront.DeleteOriginAccessControl {3} - cloudfront
CloudFront.GetOriginAccessControl {3} - cloudfront
CloudFront.GetOriginAccessControlConfig {3} - cloudfront
CloudFront.ListOriginAccessControls {3} - cloudfront
CloudFront.UpdateOriginAccessControl {3} - cloudfront
CloudTrail.GetChannel {3} - cloudtrail
CloudTrail.GetImport {3} - cloudtrail
CloudTrail.ListChannels {3} - cloudtrail
CloudTrail.ListImportFailures {3} - cloudtrail
CloudTrail.ListImports {3} - cloudtrail
CloudTrail.StartImport {3} - cloudtrail
CloudTrail.StopImport {3} - cloudtrail
ConfigService.GetCustomRulePolicy {3} - config
ConfigService.GetOrganizationCustomRulePolicy {3} - config
DynamoDB.DescribeEndpoints {3} - dynamodb
EC2.CreateCoipCidr {3} - ec2
EC2.CreateCoipPool {3} - ec2
EC2.CreateLocalGatewayRouteTable {3} - ec2
EC2.CreateLocalGatewayRouteTableVirtualInterfaceGroupAssociation {3} - ec2
EC2.DeleteCoipCidr {3} - ec2
EC2.DeleteCoipPool {3} - ec2
EC2.DeleteLocalGatewayRouteTable {3} - ec2
EC2.DeleteLocalGatewayRouteTableVirtualInterfaceGroupAssociation {3} - ec2
Translate.ListTagsForResource {3} - translate
Translate.TagResource {3} - translate
Translate.UntagResource {3} - translate
WorkMail.CreateAvailabilityConfiguration {3} - workmail
WorkMail.DeleteAvailabilityConfiguration {3} - workmail
WorkMail.ListAvailabilityConfigurations {3} - workmail
WorkMail.TestAvailabilityConfiguration {3} - workmail
WorkMail.UpdateAvailabilityConfiguration {3} - workmail
Chime.ValidateE911Address {3} - chime
FSx.CreateFileCache {3} - fsx
FSx.DeleteFileCache {3} - fsx
FSx.DescribeFileCaches {3} - fsx
FSx.UpdateFileCache {3} - fsx
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
Location.GetPlace {3} - geo
LookoutEquipment.ListInferenceEvents {3} - lookoutequipment
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
Wisdom.PutFeedback {3} - wisdom
BackupGateway.GetVirtualMachine {3} - backupgateway
AmplifyUIBuilder.CreateForm {3} - amplifyuibuilder
AmplifyUIBuilder.DeleteForm {3} - amplifyuibuilder
AmplifyUIBuilder.ExportForms {3} - amplifyuibuilder
AmplifyUIBuilder.GetForm {3} - amplifyuibuilder
AmplifyUIBuilder.GetMetadata {3} - amplifyuibuilder
AmplifyUIBuilder.ListForms {3} - amplifyuibuilder
AmplifyUIBuilder.PutMetadataFlag {3} - amplifyuibuilder
AmplifyUIBuilder.UpdateForm {3} - amplifyuibuilder
EMRServerless.GetDashboardForJobRun {3} - emrserverless
BackupStorage.DeleteObject {3} - backupstorage
BackupStorage.GetChunk {3} - backupstorage
BackupStorage.GetObjectMetadata {3} - backupstorage
BackupStorage.ListChunks {3} - backupstorage
BackupStorage.ListObjects {3} - backupstorage
BackupStorage.NotifyObjectComplete {3} - backupstorage
BackupStorage.PutChunk {3} - backupstorage
BackupStorage.PutObject {3} - backupstorage
BackupStorage.StartObject {3} - backupstorage
PrivateNetworks.ListTagsForResource {3} - privatenetworks
PrivateNetworks.Ping {3} - privatenetworks
PrivateNetworks.TagResource {3} - privatenetworks
PrivateNetworks.UntagResource {3} - privatenetworks
supportapp (datasource)
IoTFleetWise.BatchCreateVehicle {3} - iotfleetwise
IoTFleetWise.BatchUpdateVehicle {3} - iotfleetwise
SSMContacts.GetContactPolicy {1}
SSMContacts.ListTagsForResource {1}
AmplifyUIBuilder.UpdateComponent {1}
Connect.SearchSecurityProfiles {1}
`;

var found_permissions = [];

function transformArn(arn) {
    return arn
        .replace(/PN/g, "$\{")
        .replace(/XX/g, "}")
        .replace(/pn/g, "$\{")
        .replace(/xx/g, "}")
        .replace(/774857101424/g, "${Account}")
        .replace(/us-east-1/g, "${Region}")
        .replace(/arn:aws/g, "arn:${Partition}");
}

async function go() {
    var known_permissions = {};
    var iamdefdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/iam_definition.json');
    iamdef = await iamdefdata.json();

    for (var iamdefitem of iamdef) {
        for (var priv of iamdefitem.privileges) {
            known_permissions[iamdefitem.prefix+":"+priv.privilege] = (priv.access_level == "Unknown");
        }
    }
    
    for (let test_item of long_undocumented_test_list.split("\n")) {
        try {
            test_item = test_item.split(" ")[0];
            if (test_item != "") {
                let split_test_item = test_item.split(".");
                let svc = new AWS[split_test_item[0]]({});
                let method = split_test_item[1][0].toLowerCase() + split_test_item[1].substr(1);

                let complete = false;
                let params = {};
                let iterations = 0;
                let last_param = null;

                while (!complete) {
                    try {
                        console.log("--\n" + method);
                        console.log(params);
                        await svc[method].call(svc, params).promise();
                        complete = true;
                    } catch (err) {
                        if (err.message) {
                            if (err.message.includes("not authorized to perform: ")) {
                                console.log(err.message);
                                let match = err.message.match(/not authorized to perform: ([a-zA-Z0-9-:]+)(?: on resource: (.+))?/);
                                let permission = match[1];
                                let resource = match[2];

                                found_permissions.push({
                                    'permission': permission,
                                    'resource': resource || null,
                                    'service': split_test_item[0],
                                    'method': split_test_item[1]
                                });
                                complete = true;
                            } else {
                                if (err.message.includes("Missing required key '")) {
                                    let paramname = err.message.match(/Missing required key '(.+)'/)[1];
                                    params[paramname] = "PN"+paramname+"XX";
                                    if (paramname.toLowerCase().includes("accountid")) {
                                        params[paramname] = "774857101424";
                                    }
                                    last_param = paramname;
                                } else if (err.message.includes(" to be an Array")) {
                                    params[last_param] = [];
                                } else if (err.message.includes(" to be a structure")) {
                                    params[last_param] = {};
                                } else if (err.message.includes(" to be a number")) {
                                    params[last_param] = 1;
                                } else if (err.message.includes(" to be a boolean")) {
                                    params[last_param] = false;
                                } else {
                                    console.log(err.message);
                                    complete = true;
                                }
                            }
                        } else {
                            complete = true;
                        }
                    }
                    iterations += 1;
                    if (iterations > 20) {
                        complete = true;
                    }
                }
            }
        } catch(err) {
            console.log(err);
        }
    }

    console.log(found_permissions);

    let res = {};
    for (let item of found_permissions) {
        if (!Object.keys(known_permissions).includes(item['permission'])) {
            res[item['service'] + "." + item['method']] = [{
                "action": item['permission'],
                "undocumented": true
            }];
            if (item['resource']) {
                res[item['service'] + "." + item['method']][0]['arn_override'] = {
                    "template": transformArn(item['resource'])
                };
            }
        } else {
            if (!known_permissions[item['permission']]) {
                console.log("Invalid hit: " + item['permission']);
            } else {
                res[item['service'] + "." + item['method']] = [{
                    "action": item['permission'],
                    "undocumented": true
                }];
                if (item['resource']) {
                    res[item['service'] + "." + item['method']][0]['arn_override'] = {
                        "template": transformArn(item['resource'])
                    };
                }
            }
        }
    }

    var mapdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/map.json');
    var map = await mapdata.json();

    for (let reskey of Object.keys(res)) {
        if (Object.keys(map['sdk_method_iam_mappings']).includes(reskey)) {
            delete res[reskey];
        }
    }

    console.log(JSON.stringify(res, null, 4));
}

go();
