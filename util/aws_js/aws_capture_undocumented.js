// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.TagResource {3} - apigateway
Lambda.InvokeWithResponseStream {3} - lambda
S3Control.DeleteBucketReplication {3} - s3
S3Control.GetBucketReplication {3} - s3
S3Control.PutBucketReplication {3} - s3
Glue.BatchGetDataQualityResult {3} - glue
MediaLive.DescribeAccountConfiguration {3} - medialive
MediaLive.DescribeThumbnails {3} - medialive
MediaLive.UpdateAccountConfiguration {3} - medialive
MQ.Promote {3} - mq
QuickSight.DescribeAnalysisDefinition {3} - quicksight
QuickSight.DescribeDashboardDefinition {3} - quicksight
QuickSight.DescribeTemplateDefinition {3} - quicksight
Personalize.UpdateDataset {3} - personalize
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
IVS.BatchStartViewerSessionRevocation {3} - ivs
IVS.StartViewerSessionRevocation {3} - ivs
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
Proton.DeleteDeployment {3} - proton
Proton.GetDeployment {3} - proton
Proton.ListDeployments {3} - proton
ChimeSDKMessaging.DeleteMessagingStreamingConfigurations {3} - chimesdkmessaging
ChimeSDKMessaging.GetMessagingStreamingConfigurations {3} - chimesdkmessaging
ChimeSDKMessaging.PutChannelExpirationSettings {3} - chimesdkmessaging
ChimeSDKMessaging.PutMessagingStreamingConfigurations {3} - chimesdkmessaging
AmplifyUIBuilder.GetCodegenJob {3} - amplifyuibuilder
AmplifyUIBuilder.ListCodegenJobs {3} - amplifyuibuilder
AmplifyUIBuilder.StartCodegenJob {3} - amplifyuibuilder
ChimeSDKMediaPipelines.CreateMediaInsightsPipeline {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.CreateMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.DeleteMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.GetMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.ListMediaInsightsPipelineConfigurations {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineStatus {3} - chimesdkmediapipelines
BackupStorage.DeleteObject {3} - backupstorage
ConnectCases.BatchGetField {3} - connectcases
ConnectCases.BatchPutFieldOptions {3} - connectcases
ConnectCases.CreateCase {3} - connectcases
ConnectCases.CreateDomain {3} - connectcases
ConnectCases.CreateField {3} - connectcases
ConnectCases.CreateLayout {3} - connectcases
ConnectCases.CreateRelatedItem {3} - connectcases
ConnectCases.CreateTemplate {3} - connectcases
ConnectCases.DeleteDomain {3} - connectcases
ConnectCases.GetCase {3} - connectcases
ConnectCases.GetCaseEventConfiguration {3} - connectcases
ConnectCases.GetDomain {3} - connectcases
ConnectCases.GetLayout {3} - connectcases
ConnectCases.GetTemplate {3} - connectcases
ConnectCases.ListCasesForContact {3} - connectcases
ConnectCases.ListDomains {3} - connectcases
ConnectCases.ListFieldOptions {3} - connectcases
ConnectCases.ListFields {3} - connectcases
ConnectCases.ListLayouts {3} - connectcases
ConnectCases.ListTagsForResource {3} - connectcases
ConnectCases.ListTemplates {3} - connectcases
ConnectCases.PutCaseEventConfiguration {3} - connectcases
ConnectCases.SearchCases {3} - connectcases
ConnectCases.SearchRelatedItems {3} - connectcases
ConnectCases.TagResource {3} - connectcases
ConnectCases.UntagResource {3} - connectcases
ConnectCases.UpdateCase {3} - connectcases
ConnectCases.UpdateField {3} - connectcases
ConnectCases.UpdateLayout {3} - connectcases
ConnectCases.UpdateTemplate {3} - connectcases
ChimeSDKVoice.AssociatePhoneNumbersWithVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.AssociatePhoneNumbersWithVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.BatchDeletePhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.BatchUpdatePhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.CreatePhoneNumberOrder {3} - chimesdkvoice
ChimeSDKVoice.CreateProxySession {3} - chimesdkvoice
ChimeSDKVoice.CreateSipMediaApplication {3} - chimesdkvoice
ChimeSDKVoice.CreateSipMediaApplicationCall {3} - chimesdkvoice
ChimeSDKVoice.CreateSipRule {3} - chimesdkvoice
ChimeSDKVoice.CreateVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.CreateVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.CreateVoiceProfile {3} - chimesdkvoice
ChimeSDKVoice.CreateVoiceProfileDomain {3} - chimesdkvoice
ChimeSDKVoice.DeletePhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.DeleteProxySession {3} - chimesdkvoice
ChimeSDKVoice.DeleteSipMediaApplication {3} - chimesdkvoice
ChimeSDKVoice.DeleteSipRule {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorEmergencyCallingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorOrigination {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorProxy {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorStreamingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorTermination {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceConnectorTerminationCredentials {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceProfile {3} - chimesdkvoice
ChimeSDKVoice.DeleteVoiceProfileDomain {3} - chimesdkvoice
ChimeSDKVoice.DisassociatePhoneNumbersFromVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.DisassociatePhoneNumbersFromVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.GetGlobalSettings {3} - chimesdkvoice
ChimeSDKVoice.GetPhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.GetPhoneNumberOrder {3} - chimesdkvoice
ChimeSDKVoice.GetPhoneNumberSettings {3} - chimesdkvoice
ChimeSDKVoice.GetProxySession {3} - chimesdkvoice
ChimeSDKVoice.GetSipMediaApplication {3} - chimesdkvoice
ChimeSDKVoice.GetSipMediaApplicationAlexaSkillConfiguration {3} - chimesdkvoice
ChimeSDKVoice.GetSipMediaApplicationLoggingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.GetSipRule {3} - chimesdkvoice
ChimeSDKVoice.GetSpeakerSearchTask {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorEmergencyCallingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorLoggingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorOrigination {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorProxy {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorStreamingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorTermination {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceConnectorTerminationHealth {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceProfile {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceProfileDomain {3} - chimesdkvoice
ChimeSDKVoice.GetVoiceToneAnalysisTask {3} - chimesdkvoice
ChimeSDKVoice.ListAvailableVoiceConnectorRegions {3} - chimesdkvoice
ChimeSDKVoice.ListPhoneNumberOrders {3} - chimesdkvoice
ChimeSDKVoice.ListPhoneNumbers {3} - chimesdkvoice
ChimeSDKVoice.ListProxySessions {3} - chimesdkvoice
ChimeSDKVoice.ListSipMediaApplications {3} - chimesdkvoice
ChimeSDKVoice.ListSipRules {3} - chimesdkvoice
ChimeSDKVoice.ListSupportedPhoneNumberCountries {3} - chimesdkvoice
ChimeSDKVoice.ListTagsForResource {3} - chimesdkvoice
ChimeSDKVoice.ListVoiceConnectorGroups {3} - chimesdkvoice
ChimeSDKVoice.ListVoiceConnectorTerminationCredentials {3} - chimesdkvoice
ChimeSDKVoice.ListVoiceConnectors {3} - chimesdkvoice
ChimeSDKVoice.ListVoiceProfileDomains {3} - chimesdkvoice
ChimeSDKVoice.ListVoiceProfiles {3} - chimesdkvoice
ChimeSDKVoice.PutSipMediaApplicationAlexaSkillConfiguration {3} - chimesdkvoice
ChimeSDKVoice.PutSipMediaApplicationLoggingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorEmergencyCallingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorLoggingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorOrigination {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorProxy {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorStreamingConfiguration {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorTermination {3} - chimesdkvoice
ChimeSDKVoice.PutVoiceConnectorTerminationCredentials {3} - chimesdkvoice
ChimeSDKVoice.RestorePhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.SearchAvailablePhoneNumbers {3} - chimesdkvoice
ChimeSDKVoice.StartSpeakerSearchTask {3} - chimesdkvoice
ChimeSDKVoice.StartVoiceToneAnalysisTask {3} - chimesdkvoice
ChimeSDKVoice.StopSpeakerSearchTask {3} - chimesdkvoice
ChimeSDKVoice.StopVoiceToneAnalysisTask {3} - chimesdkvoice
ChimeSDKVoice.TagResource {3} - chimesdkvoice
ChimeSDKVoice.UntagResource {3} - chimesdkvoice
ChimeSDKVoice.UpdateGlobalSettings {3} - chimesdkvoice
ChimeSDKVoice.UpdatePhoneNumber {3} - chimesdkvoice
ChimeSDKVoice.UpdatePhoneNumberSettings {3} - chimesdkvoice
ChimeSDKVoice.UpdateProxySession {3} - chimesdkvoice
ChimeSDKVoice.UpdateSipMediaApplication {3} - chimesdkvoice
ChimeSDKVoice.UpdateSipMediaApplicationCall {3} - chimesdkvoice
ChimeSDKVoice.UpdateSipRule {3} - chimesdkvoice
ChimeSDKVoice.UpdateVoiceConnector {3} - chimesdkvoice
ChimeSDKVoice.UpdateVoiceConnectorGroup {3} - chimesdkvoice
ChimeSDKVoice.UpdateVoiceProfile {3} - chimesdkvoice
ChimeSDKVoice.UpdateVoiceProfileDomain {3} - chimesdkvoice
ChimeSDKVoice.ValidateE911Address {3} - chimesdkvoice
OpenSearchServerless.BatchGetCollection {3} - opensearchserverless
OpenSearchServerless.BatchGetVpcEndpoint {3} - opensearchserverless
OpenSearchServerless.CreateAccessPolicy {3} - opensearchserverless
OpenSearchServerless.CreateCollection {3} - opensearchserverless
OpenSearchServerless.CreateSecurityConfig {3} - opensearchserverless
OpenSearchServerless.CreateSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.CreateVpcEndpoint {3} - opensearchserverless
OpenSearchServerless.DeleteAccessPolicy {3} - opensearchserverless
OpenSearchServerless.DeleteCollection {3} - opensearchserverless
OpenSearchServerless.DeleteSecurityConfig {3} - opensearchserverless
OpenSearchServerless.DeleteSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.DeleteVpcEndpoint {3} - opensearchserverless
OpenSearchServerless.GetAccessPolicy {3} - opensearchserverless
OpenSearchServerless.GetAccountSettings {3} - opensearchserverless
OpenSearchServerless.GetPoliciesStats {3} - opensearchserverless
OpenSearchServerless.GetSecurityConfig {3} - opensearchserverless
OpenSearchServerless.GetSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.ListAccessPolicies {3} - opensearchserverless
OpenSearchServerless.ListCollections {3} - opensearchserverless
OpenSearchServerless.ListSecurityConfigs {3} - opensearchserverless
OpenSearchServerless.ListSecurityPolicies {3} - opensearchserverless
OpenSearchServerless.ListTagsForResource {3} - opensearchserverless
OpenSearchServerless.ListVpcEndpoints {3} - opensearchserverless
OpenSearchServerless.TagResource {3} - opensearchserverless
OpenSearchServerless.UntagResource {3} - opensearchserverless
OpenSearchServerless.UpdateAccessPolicy {3} - opensearchserverless
OpenSearchServerless.UpdateAccountSettings {3} - opensearchserverless
OpenSearchServerless.UpdateCollection {3} - opensearchserverless
OpenSearchServerless.UpdateSecurityConfig {3} - opensearchserverless
OpenSearchServerless.UpdateSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.UpdateVpcEndpoint {3} - opensearchserverless
SageMakerMetrics.BatchPutMetrics {3} - sagemakermetrics
KinesisVideoWebRTCStorage.JoinStorageSession {3} - kinesisvideowebrtcstorage
IVSRealTime.CreateParticipantToken {3} - ivsrealtime
IVSRealTime.CreateStage {3} - ivsrealtime
IVSRealTime.DeleteStage {3} - ivsrealtime
IVSRealTime.DisconnectParticipant {3} - ivsrealtime
IVSRealTime.GetParticipant {3} - ivsrealtime
IVSRealTime.GetStage {3} - ivsrealtime
IVSRealTime.GetStageSession {3} - ivsrealtime
IVSRealTime.ListParticipantEvents {3} - ivsrealtime
IVSRealTime.ListParticipants {3} - ivsrealtime
IVSRealTime.ListStageSessions {3} - ivsrealtime
IVSRealTime.ListStages {3} - ivsrealtime
IVSRealTime.ListTagsForResource {3} - ivsrealtime
IVSRealTime.TagResource {3} - ivsrealtime
IVSRealTime.UntagResource {3} - ivsrealtime
IVSRealTime.UpdateStage {3} - ivsrealtime
VPCLattice.BatchUpdateRule {3} - vpclattice
PaymentCryptographyData.DecryptData {3} - paymentcryptographydata
PaymentCryptographyData.EncryptData {3} - paymentcryptographydata
PaymentCryptographyData.GenerateCardValidationData {3} - paymentcryptographydata
PaymentCryptographyData.GenerateMac {3} - paymentcryptographydata
PaymentCryptographyData.GeneratePinData {3} - paymentcryptographydata
PaymentCryptographyData.ReEncryptData {3} - paymentcryptographydata
PaymentCryptographyData.TranslatePinData {3} - paymentcryptographydata
PaymentCryptographyData.VerifyAuthRequestCryptogram {3} - paymentcryptographydata
PaymentCryptographyData.VerifyCardValidationData {3} - paymentcryptographydata
PaymentCryptographyData.VerifyMac {3} - paymentcryptographydata
PaymentCryptographyData.VerifyPinData {3} - paymentcryptographydata
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
    try {
        var known_permissions = {};
        var iamdefdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/aws/iam_definition.json');
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

        var mapdata = await fetch('https://raw.githubusercontent.com/iann0036/iam-dataset/main/aws/map.json');
        var map = await mapdata.json();

        for (let reskey of Object.keys(res)) {
            if (Object.keys(map['sdk_method_iam_mappings']).includes(reskey)) {
                delete res[reskey];
            }
        }
        
        console.log("\n[-----]\n");

        console.log(JSON.stringify(res, null, 4));

    } catch(err) {
        console.log(err);
    }
}

go();
