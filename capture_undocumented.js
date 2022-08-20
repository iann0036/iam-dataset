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
CloudWatch.ListManagedInsightRules {3} - cloudwatch
CloudWatch.PutManagedInsightRules {3} - cloudwatch
ConfigService.GetCustomRulePolicy {3} - config
ConfigService.GetOrganizationCustomRulePolicy {3} - config
ConfigService.ListConformancePackComplianceScores {3} - config
DMS.CreateFleetAdvisorCollector {3} - dms
DMS.DeleteFleetAdvisorCollector {3} - dms
DMS.DeleteFleetAdvisorDatabases {3} - dms
DMS.DescribeFleetAdvisorCollectors {3} - dms
DMS.DescribeFleetAdvisorDatabases {3} - dms
DMS.DescribeFleetAdvisorLsaAnalysis {3} - dms
DMS.DescribeFleetAdvisorSchemaObjectSummary {3} - dms
DMS.DescribeFleetAdvisorSchemas {3} - dms
DMS.RunFleetAdvisorLsaAnalysis {3} - dms
DMS.UpdateSubscriptionsToEventBridge {3} - dms
DynamoDB.DescribeEndpoints {3} - dynamodb
DynamoDB.DescribeImport {3} - dynamodb
DynamoDB.ImportTable {3} - dynamodb
DynamoDB.ListImports {3} - dynamodb
Redshift.GetClusterCredentialsWithIAM {3} - redshift
SNS.PublishBatch {3} - sns
Glue.GetUnfilteredPartitionMetadata {3} - glue
Glue.GetUnfilteredPartitionsMetadata {3} - glue
Glue.GetUnfilteredTableMetadata {3} - glue
Glue.ListCrawls {3} - glue
GuardDuty.AcceptAdministratorInvitation {3} - guardduty
GuardDuty.DisassociateFromAdministratorAccount {3} - guardduty
GuardDuty.GetAdministratorAccount {3} - guardduty
GuardDuty.GetRemainingFreeTrialDays {3} - guardduty
SageMaker.CreateEdgeDeploymentPlan {3} - sagemaker
SageMaker.CreateEdgeDeploymentStage {3} - sagemaker
SageMaker.DeleteEdgeDeploymentPlan {3} - sagemaker
SageMaker.DeleteEdgeDeploymentStage {3} - sagemaker
SageMaker.DescribeEdgeDeploymentPlan {3} - sagemaker
SageMaker.ListEdgeDeploymentPlans {3} - sagemaker
SageMaker.ListStageDevices {3} - sagemaker
SageMaker.StartEdgeDeploymentStage {3} - sagemaker
SageMaker.StopEdgeDeploymentStage {3} - sagemaker
Translate.ListLanguages {3} - translate
WorkMail.CreateAvailabilityConfiguration {3} - workmail
WorkMail.DeleteAvailabilityConfiguration {3} - workmail
WorkMail.ListAvailabilityConfigurations {3} - workmail
WorkMail.TestAvailabilityConfiguration {3} - workmail
WorkMail.UpdateAvailabilityConfiguration {3} - workmail
Connect.SearchSecurityProfiles {3} - connect
Chime.ValidateE911Address {3} - chime
Transfer.DescribeAgreement {3} - transfer
Transfer.StartFileTransfer {3} - transfer
ApiGatewayV2.CreateAuthorizer {3} - apigateway
ApiGatewayV2.CreateVpcLink {3} - apigateway
Personalize.ListTagsForResource {3} - personalize
Personalize.TagResource {3} - personalize
Personalize.UntagResource {3} - personalize
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
Kendra.CreateAccessControlConfiguration {3} - kendra
Kendra.DeleteAccessControlConfiguration {3} - kendra
Kendra.DescribeAccessControlConfiguration {3} - kendra
Kendra.ListAccessControlConfigurations {3} - kendra
Kendra.UpdateAccessControlConfiguration {3} - kendra
SagemakerEdge.GetDeployments {3} - sagemaker
LookoutEquipment.ListInferenceEvents {3} - lookoutequipment
Finspacedata.AssociateUserToPermissionGroup {3} - finspaceapi
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.DisassociateUserFromPermissionGroup {3} - finspaceapi
Finspacedata.GetExternalDataViewAccessDetails {3} - finspaceapi
Finspacedata.GetPermissionGroup {3} - finspaceapi
Finspacedata.ListPermissionGroupsByUser {3} - finspaceapi
Finspacedata.ListUsersByPermissionGroup {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
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
ChimeSDKMessaging.ListSubChannels {3} - chimesdkmessaging
ChimeSDKMessaging.ListTagsForResource {3} - chimesdkmessaging
ChimeSDKMessaging.PutChannelMembershipPreferences {3} - chimesdkmessaging
ChimeSDKMessaging.RedactChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.SearchChannels {3} - chimesdkmessaging
ChimeSDKMessaging.SendChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.TagResource {3} - chimesdkmessaging
ChimeSDKMessaging.UntagResource {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannel {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelFlow {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelMessage {3} - chimesdkmessaging
ChimeSDKMessaging.UpdateChannelReadMarker {3} - chimesdkmessaging
Wisdom.PutFeedback {3} - wisdom
ChimeSDKMeetings.BatchUpdateAttendeeCapabilitiesExcept {3} - chimesdkmeetings
ChimeSDKMeetings.ListTagsForResource {3} - chimesdkmeetings
ChimeSDKMeetings.TagResource {3} - chimesdkmeetings
ChimeSDKMeetings.UntagResource {3} - chimesdkmeetings
ChimeSDKMeetings.UpdateAttendeeCapabilities {3} - chimesdkmeetings
Evidently.CreateSegment {3} - evidently
Evidently.DeleteSegment {3} - evidently
Evidently.GetSegment {3} - evidently
Evidently.ListSegmentReferences {3} - evidently
Evidently.ListSegments {3} - evidently
Evidently.TestSegmentPattern {3} - evidently
Inspector2.GetConfiguration {3} - inspector2
Inspector2.UpdateConfiguration {3} - inspector2
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
pinpointsmsvoicev2 (datasource)
chimesdkmediapipelines (datasource)
emrserverless (datasource)
redshiftserverless (datasource)
licensemanagerusersubscriptions (datasource)
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
