// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.CreateAuthorizer {3} - apigateway
APIGateway.CreateDocumentationPart {3} - apigateway
APIGateway.ImportRestApi {3} - apigateway
APIGateway.PutRestApi {3} - apigateway
APIGateway.TagResource {3} - apigateway
APIGateway.UpdateRestApi {3} - apigateway
Budgets.DescribeBudgetNotificationsForAccount {3} - budgets
ConfigService.GetCustomRulePolicy {3} - config
ConfigService.GetOrganizationCustomRulePolicy {3} - config
DynamoDB.DescribeEndpoints {3} - dynamodb
EC2.GetInstanceUefiData {3} - ec2
Lightsail.GetLoadBalancerTlsPolicies {3} - lightsail
Rekognition.UpdateStreamProcessor {3} - rekognition
SNS.PublishBatch {3} - sns
Glue.GetUnfilteredPartitionMetadata {3} - glue
Glue.GetUnfilteredPartitionsMetadata {3} - glue
Glue.GetUnfilteredTableMetadata {3} - glue
KinesisVideoArchivedMedia.GetImages {3} - kinesisvideo
KinesisVideo.DescribeImageGenerationConfiguration {3} - kinesisvideo
KinesisVideo.DescribeNotificationConfiguration {3} - kinesisvideo
KinesisVideo.UpdateImageGenerationConfiguration {3} - kinesisvideo
KinesisVideo.UpdateNotificationConfiguration {3} - kinesisvideo
ApiGatewayV2.CreateAuthorizer {3} - apigateway
ApiGatewayV2.CreateVpcLink {3} - apigateway
Personalize.ListTagsForResource {3} - personalize
Personalize.TagResource {3} - personalize
Personalize.UntagResource {3} - personalize
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
NetworkFirewall.UpdateFirewallEncryptionConfiguration {3} - networkfirewall
IoTWireless.GetEventConfigurationByResourceTypes {3} - iotwireless
IoTWireless.UpdateEventConfigurationByResourceTypes {3} - iotwireless
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.CreatePermissionGroup {3} - finspaceapi
Finspacedata.CreateUser {3} - finspaceapi
Finspacedata.DeletePermissionGroup {3} - finspaceapi
Finspacedata.DisableUser {3} - finspaceapi
Finspacedata.EnableUser {3} - finspaceapi
Finspacedata.GetUser {3} - finspaceapi
Finspacedata.ListPermissionGroups {3} - finspaceapi
Finspacedata.ListUsers {3} - finspaceapi
Finspacedata.ResetUserPassword {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
Finspacedata.UpdatePermissionGroup {3} - finspaceapi
Finspacedata.UpdateUser {3} - finspaceapi
ChimeSDKMessaging.AssociateChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.BatchCreateChannelMembership {3} - chimesdkmessaging
ChimeSDKMessaging.ChannelFlowCallback {3} - chimesdkmessaging
ChimeSDKMessaging.CreateChannel {3} - chimesdkmessaging
ChimeSDKMessaging.CreateChannelBan {3} - chimesdkmessaging
ChimeSDKMessaging.CreateChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.CreateChannelMembership {3} - chimesdkmessaging
ChimeSDKMessaging.CreateChannelModerator {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannel {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannelBan {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannelMembership {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.DeleteChannelModerator {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannel {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelBan {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelMembership {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelMembershipForAppInstanceUser {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelModeratedByAppInstanceUser {3} - chimesdkmessaging
ChimeSDKMessaging.DescribeChannelModerator {3} - chimesdkmessaging
ChimeSDKMessaging.DisassociateChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.GetChannelMembershipPreferences {3} - chimesdkmessaging
ChimeSDKMessaging.GetChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.GetChannelMessageStatus {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelBans {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelFlows {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelMemberships {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelMembershipsForAppInstanceUser {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelMessages {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelModerators {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannels {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelsAssociatedWithChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.ListChannelsModeratedByAppInstanceUser {3} - chimesdkmessaging
ChimeSDKMessaging.ListTagsForResource {3} - chimesdkmessaging
ChimeSDKMessaging.PutChannelMembershipPreferences {3} - chimesdkmessaging
ChimeSDKMessaging.RedactChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.SendChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.TagResource {3} - chimesdkmessaging
ChimeSDKMessaging.UntagResource {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannel {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelReadMarker {3} - chimesdkmessaging
Grafana.CreateWorkspaceApiKey {3} - grafana
Grafana.DeleteWorkspaceApiKey {3} - grafana
Keyspaces.CreateKeyspace {3} - keyspaces
Keyspaces.CreateTable {3} - keyspaces
Keyspaces.DeleteKeyspace {3} - keyspaces
Keyspaces.DeleteTable {3} - keyspaces
Keyspaces.GetKeyspace {3} - keyspaces
Keyspaces.GetTable {3} - keyspaces
Keyspaces.ListKeyspaces {3} - keyspaces
Keyspaces.ListTables {3} - keyspaces
Keyspaces.ListTagsForResource {3} - keyspaces
Keyspaces.RestoreTable {3} - keyspaces
Keyspaces.TagResource {3} - keyspaces
Keyspaces.UntagResource {3} - keyspaces
Keyspaces.UpdateTable {3} - keyspaces
SSMContacts.GetContactPolicy {1}
SSMContacts.ListTagsForResource {1}
AmplifyUIBuilder.UpdateComponent {1}
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
