// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
AppStream.CreateUpdatedImage {2} - appstream
AutoScaling.GetPredictiveScalingForecast {2} - autoscaling
CloudDirectory.GetAppliedSchemaVersion {2} - clouddirectory
CloudDirectory.UpgradeAppliedSchema {2} - clouddirectory
CloudDirectory.UpgradePublishedSchema {2} - clouddirectory
CloudFormation.ActivateType {2} - cloudformation
CloudFormation.BatchDescribeTypeConfigurations {2} - cloudformation
CloudFormation.DeactivateType {2} - cloudformation
CloudFormation.DescribePublisher {2} - cloudformation
CloudFormation.PublishType {2} - cloudformation
CloudFormation.RegisterPublisher {2} - cloudformation
CloudFormation.SetTypeConfiguration {2} - cloudformation
CloudFormation.TestType {2} - cloudformation
CloudFront.AssociateAlias {2} - cloudfront
CloudFront.ListConflictingAliases {2} - cloudfront
CodePipeline.GetActionType {2} - codepipeline
CodePipeline.UpdateActionType {2} - codepipeline
CognitoIdentityServiceProvider.RevokeToken {2} - cognitoidp
DirectConnect.AssociateMacSecKey {2} - directconnect
DirectConnect.DisassociateMacSecKey {2} - directconnect
DirectConnect.UpdateConnection {2} - directconnect
DMS.DescribeEndpointSettings {2} - dms
DMS.DescribePendingMaintenanceActions {2} - dms
DynamoDB.DescribeEndpoints {2} - dynamodb
EC2.AssociateTrunkInterface {2} - ec2
EC2.DescribeSecurityGroupRules {2} - ec2
EC2.DescribeTrunkInterfaceAssociations {2} - ec2
EC2.DisassociateTrunkInterface {2} - ec2
EC2.ModifySecurityGroupRules {2} - ec2
ElasticBeanstalk.UpdateTagsForResource {2} - elasticbeanstalk
EMR.SetVisibleToAllUsers {2} - elasticmapreduce
ES.DescribeDomainAutoTunes {2} - es
Redshift.AddPartner {2} - redshift
Redshift.AuthorizeEndpointAccess {2} - redshift
Redshift.CreateEndpointAccess {2} - redshift
Redshift.DeleteEndpointAccess {2} - redshift
Redshift.DeletePartner {2} - redshift
Redshift.DescribeEndpointAccess {2} - redshift
Redshift.DescribeEndpointAuthorization {2} - redshift
Redshift.DescribePartners {2} - redshift
Redshift.ModifyEndpointAccess {2} - redshift
Redshift.RevokeEndpointAccess {2} - redshift
Redshift.UpdatePartnerStatus {2} - redshift
S3.DeleteBucketIntelligentTieringConfiguration {2} - s3
S3.ListBucketIntelligentTieringConfigurations {2} - s3
S3.WriteGetObjectResponse {2} - s3
S3Control.CreateAccessPointForObjectLambda {2} - s3outposts
S3Control.CreateJob {2} - s3outposts
S3Control.DeleteAccessPointForObjectLambda {2} - s3outposts
S3Control.DeleteAccessPointPolicyForObjectLambda {2} - s3outposts
S3Control.DeletePublicAccessBlock {2} - s3outposts
S3Control.DescribeJob {2} - s3outposts
S3Control.GetAccessPointConfigurationForObjectLambda {2} - s3outposts
S3Control.GetAccessPointForObjectLambda {2} - s3outposts
S3Control.GetAccessPointPolicyForObjectLambda {2} - s3outposts
S3Control.GetAccessPointPolicyStatusForObjectLambda {2} - s3outposts
S3Control.GetPublicAccessBlock {2} - s3outposts
S3Control.ListAccessPointsForObjectLambda {2} - s3outposts
S3Control.ListJobs {2} - s3outposts
S3Control.PutAccessPointConfigurationForObjectLambda {2} - s3outposts
S3Control.PutAccessPointPolicyForObjectLambda {2} - s3outposts
S3Control.PutBucketLifecycleConfiguration {2} - s3outposts
S3Control.PutPublicAccessBlock {2} - s3outposts
Snowball.CreateLongTermPricing {2} - snowball
Snowball.ListLongTermPricing {2} - snowball
Snowball.UpdateLongTermPricing {2} - snowball
SSM.UnlabelParameterVersion {2} - ssm
Glue.UpdateColumnStatisticsForPartition {2} - glue
Glue.UpdateColumnStatisticsForTable {2} - glue
MediaLive.CreatePartnerInput {2} - medialive
SageMaker.SendPipelineExecutionStepFailure {2} - sagemaker
SageMaker.SendPipelineExecutionStepSuccess {2} - sagemaker
ServiceDiscovery.UpdateHttpNamespace {2} - servicediscovery
ServiceDiscovery.UpdatePrivateDnsNamespace {2} - servicediscovery
ServiceDiscovery.UpdatePublicDnsNamespace {2} - servicediscovery
MediaTailor.CreateChannel {2} - mediatailor
MediaTailor.CreateProgram {2} - mediatailor
MediaTailor.CreateSourceLocation {2} - mediatailor
MediaTailor.CreateVodSource {2} - mediatailor
MediaTailor.DeleteChannel {2} - mediatailor
MediaTailor.DeleteChannelPolicy {2} - mediatailor
MediaTailor.DeleteProgram {2} - mediatailor
MediaTailor.DeleteSourceLocation {2} - mediatailor
MediaTailor.DeleteVodSource {2} - mediatailor
MediaTailor.DescribeChannel {2} - mediatailor
MediaTailor.DescribeProgram {2} - mediatailor
MediaTailor.DescribeSourceLocation {2} - mediatailor
MediaTailor.DescribeVodSource {2} - mediatailor
MediaTailor.GetChannelPolicy {2} - mediatailor
MediaTailor.GetChannelSchedule {2} - mediatailor
MediaTailor.ListAlerts {2} - mediatailor
MediaTailor.ListChannels {2} - mediatailor
MediaTailor.ListSourceLocations {2} - mediatailor
MediaTailor.ListVodSources {2} - mediatailor
MediaTailor.PutChannelPolicy {2} - mediatailor
MediaTailor.StartChannel {2} - mediatailor
MediaTailor.StopChannel {2} - mediatailor
MediaTailor.UpdateChannel {2} - mediatailor
MediaTailor.UpdateSourceLocation {2} - mediatailor
MediaTailor.UpdateVodSource {2} - mediatailor
QuickSight.CreateFolder {2} - quicksight
QuickSight.CreateFolderMembership {2} - quicksight
QuickSight.DeleteFolder {2} - quicksight
QuickSight.DeleteFolderMembership {2} - quicksight
QuickSight.DescribeFolder {2} - quicksight
QuickSight.DescribeFolderPermissions {2} - quicksight
QuickSight.DescribeFolderResolvedPermissions {2} - quicksight
QuickSight.ListFolderMembers {2} - quicksight
QuickSight.ListFolders {2} - quicksight
QuickSight.SearchFolders {2} - quicksight
QuickSight.UpdateFolder {2} - quicksight
QuickSight.UpdateFolderPermissions {2} - quicksight
DataSync.UpdateLocationNfs {2} - datasync
DataSync.UpdateLocationObjectStorage {2} - datasync
DataSync.UpdateLocationSmb {2} - datasync
Transfer.CreateAccess {2} - transfer
Transfer.DeleteAccess {2} - transfer
Transfer.DescribeAccess {2} - transfer
Transfer.ListAccesses {2} - transfer
Transfer.UpdateAccess {2} - transfer
KinesisAnalyticsV2.DescribeApplicationVersion {2} - kinesisanalytics
KinesisAnalyticsV2.ListApplicationVersions {2} - kinesisanalytics
KinesisAnalyticsV2.RollbackApplication {2} - kinesisanalytics
KinesisAnalyticsV2.UpdateApplicationMaintenanceConfiguration {2} - kinesisanalytics
ApiGatewayManagementApi.DeleteConnection {2} - apigateway
ApiGatewayManagementApi.GetConnection {2} - apigateway
ApiGatewayManagementApi.PostToConnection {2} - apigateway
MediaPackageVod.ConfigureLogs {2} - mediapackagevod
IoTEvents.DescribeDetectorModelAnalysis {2} - iotevents
IoTEvents.GetDetectorModelAnalysisResults {2} - iotevents
IoTEvents.StartDetectorModelAnalysis {2} - iotevents
Personalize.CreateDatasetExportJob {2} - personalize
Personalize.DescribeDatasetExportJob {2} - personalize
Personalize.ListDatasetExportJobs {2} - personalize
Personalize.StopSolutionVersionCreation {2} - personalize
LakeFormation.AddLFTagsToResource {2} - lakeformation
LakeFormation.CreateLFTag {2} - lakeformation
LakeFormation.DeleteLFTag {2} - lakeformation
LakeFormation.GetLFTag {2} - lakeformation
LakeFormation.GetResourceLFTags {2} - lakeformation
LakeFormation.ListLFTags {2} - lakeformation
LakeFormation.RemoveLFTagsFromResource {2} - lakeformation
LakeFormation.SearchDatabasesByLFTags {2} - lakeformation
LakeFormation.SearchTablesByLFTags {2} - lakeformation
LakeFormation.UpdateLFTag {2} - lakeformation
WorkMailMessageFlow.PutRawMessageContent {2} - workmailmessageflow
SSO.GetRoleCredentials {2} - sso
SSO.ListAccountRoles {2} - sso
SSO.ListAccounts {2} - sso
SSO.Logout {2} - sso
SSOOIDC.CreateToken {2} - ssodirectory
SSOOIDC.RegisterClient {2} - ssodirectory
SSOOIDC.StartDeviceAuthorization {2} - ssodirectory
ConnectParticipant.CompleteAttachmentUpload {2} - executeapi
ConnectParticipant.CreateParticipantConnection {2} - executeapi
ConnectParticipant.DisconnectParticipant {2} - executeapi
ConnectParticipant.GetAttachment {2} - executeapi
ConnectParticipant.GetTranscript {2} - executeapi
ConnectParticipant.SendEvent {2} - executeapi
ConnectParticipant.SendMessage {2} - executeapi
ConnectParticipant.StartAttachmentUpload {2} - executeapi
Kendra.BatchGetDocumentStatus {2} - kendra
IoTSiteWise.DescribeStorageConfiguration {2} - iotsitewise
IoTSiteWise.GetInterpolatedAssetPropertyValues {2} - iotsitewise
IoTSiteWise.PutStorageConfiguration {2} - iotsitewise
AmplifyBackend.ImportBackendAuth {2} - amplifybackend
CustomerProfiles.GetMatches {2} - profile
CustomerProfiles.MergeProfiles {2} - profile
GreengrassV2.BatchAssociateClientDeviceWithCoreDevice {2} - greengrass
GreengrassV2.BatchDisassociateClientDeviceFromCoreDevice {2} - greengrass
GreengrassV2.ListClientDevicesAssociatedWithCoreDevice {2} - greengrass
LexModelsV2.CreateResourcePolicyStatement {2} - lex
LexModelsV2.DeleteResourcePolicyStatement {2} - lex
LexRuntimeV2.RecognizeUtterance {2} - lex
Finspace.CreateEnvironment {2} - finspace
Finspace.DeleteEnvironment {2} - finspace
Finspace.GetEnvironment {2} - finspace
Finspace.ListEnvironments {2} - finspace
Finspace.ListTagsForResource {2} - finspace
Finspace.TagResource {2} - finspace
Finspace.UntagResource {2} - finspace
Finspace.UpdateEnvironment {2} - finspace
Finspacedata.CreateChangeset {2} - finspacedata
Finspacedata.GetProgrammaticAccessCredentials {2} - finspacedata
Finspacedata.GetWorkingLocation {2} - finspacedata
SSMContacts.GetContactPolicy {2} - ssmcontacts
SSMContacts.ListTagsForResource {2} - ssmcontacts
SSMContacts.TagResource {2} - ssmcontacts
SSMContacts.UntagResource {2} - ssmcontacts
Proton.AcceptEnvironmentAccountConnection {2} - proton
Proton.CancelEnvironmentDeployment {2} - proton
Proton.CancelServiceInstanceDeployment {2} - proton
Proton.CancelServicePipelineDeployment {2} - proton
Proton.CreateEnvironmentAccountConnection {2} - proton
Proton.CreateEnvironmentTemplateVersion {2} - proton
Proton.CreateServiceTemplateVersion {2} - proton
Proton.DeleteEnvironmentAccountConnection {2} - proton
Proton.DeleteEnvironmentTemplateVersion {2} - proton
Proton.DeleteServiceTemplateVersion {2} - proton
Proton.GetAccountSettings {2} - proton
Proton.GetEnvironmentAccountConnection {2} - proton
Proton.GetEnvironmentTemplateVersion {2} - proton
Proton.GetServiceTemplateVersion {2} - proton
Proton.ListEnvironmentAccountConnections {2} - proton
Proton.ListEnvironmentTemplateVersions {2} - proton
Proton.ListServiceTemplateVersions {2} - proton
Proton.RejectEnvironmentAccountConnection {2} - proton
Proton.UpdateAccountSettings {2} - proton
Proton.UpdateEnvironmentAccountConnection {2} - proton
Proton.UpdateEnvironmentTemplateVersion {2} - proton
Proton.UpdateServiceTemplateVersion {2} - proton
EMR.AddInstanceFleet {1}
EMR.AddInstanceGroups {1}
EMR.ModifyInstanceGroups {1}
CostExplorer.CreateAnomalyMonitor {1}
CostExplorer.CreateCostCategoryDefinition {1}
CostExplorer.UpdateCostCategoryDefinition {1}
`;

var found_permissions = [];

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
            while (!complete) {
                try {
                    await svc[method].call(svc, params).promise();
                    complete = true;
                } catch (err) {
                    if (err.message) {
                        if (err.message.includes("not authorized to perform: ")) {
                            let match = err.message.match(/not authorized to perform: ([a-zA-Z0-9:]+)(?: on resource: (.+))?/);
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
        } else {
            if (!known_permissions[item['permission']]) {
                console.log("Invalid hit: " + item['permission']);
            }
        }
    }

    console.log(JSON.stringify(res, null, 4));
}

go();
