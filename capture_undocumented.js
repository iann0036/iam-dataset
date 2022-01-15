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
AppStream.AssociateApplicationToEntitlement {3} - appstream
AppStream.DisassociateApplicationFromEntitlement {3} - appstream
CognitoIdentityServiceProvider.RevokeToken {3} - cognitoidp
DirectoryService.DescribeClientAuthenticationSettings {3} - ds
DynamoDB.DescribeEndpoints {3} - dynamodb
Kinesis.UpdateStreamMode {3} - kinesis
Pinpoint.SendOTPMessage {3} - mobiletargeting
Pinpoint.VerifyOTPMessage {3} - mobiletargeting
SNS.PublishBatch {3} - sns
StorageGateway.UpdateSMBLocalGroups {3} - storagegateway
WorkSpaces.CreateConnectClientAddIn {3} - workspaces
WorkSpaces.DeleteConnectClientAddIn {3} - workspaces
WorkSpaces.DescribeConnectClientAddIns {3} - workspaces
WorkSpaces.UpdateConnectClientAddIn {3} - workspaces
Glue.GetUnfilteredPartitionMetadata {3} - glue
Glue.GetUnfilteredPartitionsMetadata {3} - glue
Glue.GetUnfilteredTableMetadata {3} - glue
SageMaker.CreateStudioLifecycleConfig {3} - sagemaker
SageMaker.RetryPipelineExecution {3} - sagemaker
WorkMail.DeleteEmailMonitoringConfiguration {3} - workmail
WorkMail.DescribeEmailMonitoringConfiguration {3} - workmail
WorkMail.PutEmailMonitoringConfiguration {3} - workmail
TranscribeService.ListTagsForResource {3} - transcribe
TranscribeService.TagResource {3} - transcribe
TranscribeService.UntagResource {3} - transcribe
Connect.StartContactStreaming {3} - connect
MediaTailor.ConfigureLogsForPlaybackConfiguration {3} - mediatailor
MediaTailor.CreatePrefetchSchedule {3} - mediatailor
RAM.ListPermissionVersions {3} - ram
DataSync.CreateLocationFsxLustre {3} - datasync
DataSync.CreateLocationHdfs {3} - datasync
DataSync.DescribeLocationFsxLustre {3} - datasync
DataSync.DescribeLocationHdfs {3} - datasync
DataSync.UpdateLocationHdfs {3} - datasync
ComprehendMedical.DescribeSNOMEDCTInferenceJob {3} - comprehendmedical
ComprehendMedical.InferSNOMEDCT {3} - comprehendmedical
ComprehendMedical.ListSNOMEDCTInferenceJobs {3} - comprehendmedical
ComprehendMedical.StartSNOMEDCTInferenceJob {3} - comprehendmedical
ComprehendMedical.StopSNOMEDCTInferenceJob {3} - comprehendmedical
FSx.ReleaseFileSystemNfsV3Locks {3} - fsx
ApiGatewayV2.CreateAuthorizer {3} - apigateway
ApiGatewayV2.CreateVpcLink {3} - apigateway
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
ForecastService.DescribeExplainability {3} - forecast
WAFV2.ListAvailableManagedRuleGroupVersions {3} - wafv2
Imagebuilder.ImportVmImage {3} - imagebuilder
Honeycode.ListTagsForResource {3} - honeycode
Honeycode.TagResource {3} - honeycode
Honeycode.UntagResource {3} - honeycode
TimestreamQuery.PrepareQuery {3} - timestream
AmplifyBackend.CreateBackendStorage {3} - amplifybackend
AmplifyBackend.UpdateBackendStorage {3} - amplifybackend
IoTWireless.AssociateMulticastGroupWithFuotaTask {3} - iot
IoTWireless.AssociateWirelessDeviceWithFuotaTask {3} - iot
IoTWireless.AssociateWirelessDeviceWithMulticastGroup {3} - iot
IoTWireless.CancelMulticastGroupSession {3} - iot
IoTWireless.CreateFuotaTask {3} - iot
IoTWireless.CreateMulticastGroup {3} - iot
IoTWireless.DeleteFuotaTask {3} - iot
IoTWireless.DeleteMulticastGroup {3} - iot
IoTWireless.DeleteQueuedMessages {3} - iot
IoTWireless.DisassociateMulticastGroupFromFuotaTask {3} - iot
IoTWireless.DisassociateWirelessDeviceFromFuotaTask {3} - iot
IoTWireless.DisassociateWirelessDeviceFromMulticastGroup {3} - iot
IoTWireless.GetFuotaTask {3} - iot
IoTWireless.GetMulticastGroup {3} - iot
IoTWireless.GetMulticastGroupSession {3} - iot
IoTWireless.GetNetworkAnalyzerConfiguration {3} - iot
IoTWireless.GetResourceEventConfiguration {3} - iot
IoTWireless.ListFuotaTasks {3} - iot
IoTWireless.ListMulticastGroups {3} - iot
IoTWireless.ListMulticastGroupsByFuotaTask {3} - iot
IoTWireless.ListQueuedMessages {3} - iot
IoTWireless.SendDataToMulticastGroup {3} - iot
IoTWireless.StartBulkAssociateWirelessDeviceWithMulticastGroup {3} - iot
IoTWireless.StartBulkDisassociateWirelessDeviceFromMulticastGroup {3} - iot
IoTWireless.StartFuotaTask {3} - iot
IoTWireless.StartMulticastGroupSession {3} - iot
IoTWireless.UpdateFuotaTask {3} - iot
IoTWireless.UpdateMulticastGroup {3} - iot
IoTWireless.UpdateNetworkAnalyzerConfiguration {3} - iot
IoTWireless.UpdateResourceEventConfiguration {3} - iot
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.CreateDataset {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
Proton.NotifyResourceDeploymentStatusChange {3} - proton
ChimeSDKIdentity.CreateAppInstance {3} - chimesdkidentity
ChimeSDKIdentity.CreateAppInstanceAdmin {3} - chimesdkidentity
ChimeSDKIdentity.CreateAppInstanceUser {3} - chimesdkidentity
ChimeSDKIdentity.DeleteAppInstance {3} - chimesdkidentity
ChimeSDKIdentity.DeleteAppInstanceAdmin {3} - chimesdkidentity
ChimeSDKIdentity.DeleteAppInstanceUser {3} - chimesdkidentity
ChimeSDKIdentity.DeregisterAppInstanceUserEndpoint {3} - chimesdkidentity
ChimeSDKIdentity.DescribeAppInstance {3} - chimesdkidentity
ChimeSDKIdentity.DescribeAppInstanceAdmin {3} - chimesdkidentity
ChimeSDKIdentity.DescribeAppInstanceUser {3} - chimesdkidentity
ChimeSDKIdentity.DescribeAppInstanceUserEndpoint {3} - chimesdkidentity
ChimeSDKIdentity.GetAppInstanceRetentionSettings {3} - chimesdkidentity
ChimeSDKIdentity.ListAppInstanceAdmins {3} - chimesdkidentity
ChimeSDKIdentity.ListAppInstanceUserEndpoints {3} - chimesdkidentity
ChimeSDKIdentity.ListAppInstanceUsers {3} - chimesdkidentity
ChimeSDKIdentity.ListAppInstances {3} - chimesdkidentity
ChimeSDKIdentity.ListTagsForResource {3} - chimesdkidentity
ChimeSDKIdentity.PutAppInstanceRetentionSettings {3} - chimesdkidentity
ChimeSDKIdentity.RegisterAppInstanceUserEndpoint {3} - chimesdkidentity
ChimeSDKIdentity.TagResource {3} - chimesdkidentity
ChimeSDKIdentity.UntagResource {3} - chimesdkidentity
ChimeSDKIdentity.UpdateAppInstance {3} - chimesdkidentity
ChimeSDKIdentity.UpdateAppInstanceUser {3} - chimesdkidentity
ChimeSDKIdentity.UpdateAppInstanceUserEndpoint {3} - chimesdkidentity
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
ChimeSDKMessaging.GetMessagingSessionEndpoint {3} - chimesdkmessaging
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
ChimeSDKMeetings.BatchCreateAttendee {3} - chimesdkmeetings
ChimeSDKMeetings.CreateAttendee {3} - chimesdkmeetings
ChimeSDKMeetings.CreateMeeting {3} - chimesdkmeetings
ChimeSDKMeetings.CreateMeetingWithAttendees {3} - chimesdkmeetings
ChimeSDKMeetings.DeleteAttendee {3} - chimesdkmeetings
ChimeSDKMeetings.DeleteMeeting {3} - chimesdkmeetings
ChimeSDKMeetings.GetAttendee {3} - chimesdkmeetings
ChimeSDKMeetings.GetMeeting {3} - chimesdkmeetings
ChimeSDKMeetings.ListAttendees {3} - chimesdkmeetings
ChimeSDKMeetings.StartMeetingTranscription {3} - chimesdkmeetings
ChimeSDKMeetings.StopMeetingTranscription {3} - chimesdkmeetings
MigrationHubRefactorSpaces.CreateApplication {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.CreateEnvironment {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.CreateRoute {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.CreateService {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.DeleteApplication {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.DeleteEnvironment {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.DeleteResourcePolicy {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.DeleteRoute {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.DeleteService {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.GetApplication {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.GetEnvironment {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.GetResourcePolicy {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.GetRoute {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.GetService {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListApplications {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListEnvironmentVpcs {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListEnvironments {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListRoutes {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListServices {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.ListTagsForResource {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.PutResourcePolicy {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.TagResource {3} - migrationhubrefactorspaces
MigrationHubRefactorSpaces.UntagResource {3} - migrationhubrefactorspaces
Evidently.PutProjectEvents {3} - evidently
Evidently.TagResource {3} - evidently
SSMContacts.GetContactPolicy {1}
SSMContacts.ListTagsForResource {1}
IoTTwinMaker.BatchPutPropertyValues {1}
IoTTwinMaker.GetPropertyValueHistory {1}
AmplifyUIBuilder.CreateComponent {1}
AmplifyUIBuilder.CreateTheme {1}
AmplifyUIBuilder.UpdateComponent {1}
AmplifyUIBuilder.UpdateTheme {1}
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
