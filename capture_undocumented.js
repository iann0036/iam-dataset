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
CloudFront.CreateResponseHeadersPolicy {3} - cloudfront
CloudFront.DeleteResponseHeadersPolicy {3} - cloudfront
CloudFront.GetResponseHeadersPolicy {3} - cloudfront
CloudFront.GetResponseHeadersPolicyConfig {3} - cloudfront
CloudFront.ListDistributionsByResponseHeadersPolicyId {3} - cloudfront
CloudFront.ListResponseHeadersPolicies {3} - cloudfront
CloudFront.UpdateResponseHeadersPolicy {3} - cloudfront
CognitoIdentityServiceProvider.RevokeToken {3} - cognitoidp
DirectoryService.DescribeClientAuthenticationSettings {3} - ds
DynamoDB.DescribeEndpoints {3} - dynamodb
EC2.AllocateIpamPoolCidr {3} - ec2
EC2.CreateIpam {3} - ec2
EC2.CreateIpamPool {3} - ec2
EC2.CreateIpamScope {3} - ec2
EC2.CreateNetworkInsightsAccessScope {3} - ec2
EC2.CreatePublicIpv4Pool {3} - ec2
EC2.DeleteIpam {3} - ec2
EC2.DeleteIpamPool {3} - ec2
EC2.DeleteIpamScope {3} - ec2
EC2.DeleteNetworkInsightsAccessScope {3} - ec2
EC2.DeleteNetworkInsightsAccessScopeAnalysis {3} - ec2
EC2.DeletePublicIpv4Pool {3} - ec2
EC2.DeprovisionIpamPoolCidr {3} - ec2
EC2.DeprovisionPublicIpv4PoolCidr {3} - ec2
EC2.DescribeIpamPools {3} - ec2
EC2.DescribeIpamScopes {3} - ec2
EC2.DescribeIpams {3} - ec2
EC2.DescribeNetworkInsightsAccessScopeAnalyses {3} - ec2
EC2.DescribeNetworkInsightsAccessScopes {3} - ec2
EC2.DescribeSnapshotTierStatus {3} - ec2
EC2.DisableIpamOrganizationAdminAccount {3} - ec2
EC2.EnableIpamOrganizationAdminAccount {3} - ec2
EC2.GetInstanceTypesFromInstanceRequirements {3} - ec2
EC2.GetIpamAddressHistory {3} - ec2
EC2.GetIpamPoolAllocations {3} - ec2
EC2.GetIpamPoolCidrs {3} - ec2
EC2.GetIpamResourceCidrs {3} - ec2
EC2.GetNetworkInsightsAccessScopeAnalysisFindings {3} - ec2
EC2.GetNetworkInsightsAccessScopeContent {3} - ec2
EC2.GetSpotPlacementScores {3} - ec2
EC2.ListSnapshotsInRecycleBin {3} - ec2
EC2.ModifyIpam {3} - ec2
EC2.ModifyIpamPool {3} - ec2
EC2.ModifyIpamResourceCidr {3} - ec2
EC2.ModifyIpamScope {3} - ec2
EC2.ModifyPrivateDnsNameOptions {3} - ec2
EC2.ModifySnapshotTier {3} - ec2
EC2.MoveByoipCidrToIpam {3} - ec2
EC2.ProvisionIpamPoolCidr {3} - ec2
EC2.ProvisionPublicIpv4PoolCidr {3} - ec2
EC2.ReleaseIpamPoolAllocation {3} - ec2
EC2.RestoreSnapshotFromRecycleBin {3} - ec2
EC2.RestoreSnapshotTier {3} - ec2
EC2.StartNetworkInsightsAccessScopeAnalysis {3} - ec2
Kinesis.UpdateStreamMode {3} - kinesis
Pinpoint.SendOTPMessage {3} - mobiletargeting
Pinpoint.VerifyOTPMessage {3} - mobiletargeting
Redshift.DescribeReservedNodeExchangeStatus {3} - redshift
Redshift.GetReservedNodeExchangeConfigurationOptions {3} - redshift
Shield.DisableApplicationLayerAutomaticResponse {3} - shield
Shield.EnableApplicationLayerAutomaticResponse {3} - shield
Shield.UpdateApplicationLayerAutomaticResponse {3} - shield
SNS.PublishBatch {3} - sns
StorageGateway.UpdateSMBLocalGroups {3} - storagegateway
AppSync.AssociateApi {3} - appsync
AppSync.CreateDomainName {3} - appsync
AppSync.DeleteDomainName {3} - appsync
AppSync.DisassociateApi {3} - appsync
AppSync.GetApiAssociation {3} - appsync
AppSync.GetDomainName {3} - appsync
AppSync.ListDomainNames {3} - appsync
AppSync.UpdateDomainName {3} - appsync
SageMaker.CreateStudioLifecycleConfig {3} - sagemaker
SageMaker.RetryPipelineExecution {3} - sagemaker
TranscribeService.ListTagsForResource {3} - transcribe
TranscribeService.TagResource {3} - transcribe
TranscribeService.UntagResource {3} - transcribe
Connect.StartContactStreaming {3} - connect
Connect.UpdateContactFlowModuleContent {3} - connect
MediaTailor.ConfigureLogsForPlaybackConfiguration {3} - mediatailor
MediaTailor.CreatePrefetchSchedule {3} - mediatailor
EKS.RegisterCluster {3} - eks
DataSync.CreateLocationHdfs {3} - datasync
DataSync.DescribeLocationHdfs {3} - datasync
DataSync.UpdateLocationHdfs {3} - datasync
FSx.ReleaseFileSystemNfsV3Locks {3} - fsx
Kafka.CreateClusterV2 {3} - kafka
Kafka.DescribeClusterV2 {3} - kafka
Kafka.ListClustersV2 {3} - kafka
ApiGatewayV2.CreateAuthorizer {3} - apigateway
ApiGatewayV2.CreateVpcLink {3} - apigateway
Textract.AnalyzeID {3} - textract
LakeFormation.CancelTransaction {3} - lakeformation
LakeFormation.CommitTransaction {3} - lakeformation
LakeFormation.CreateDataCellsFilter {3} - lakeformation
LakeFormation.DeleteDataCellsFilter {3} - lakeformation
LakeFormation.DeleteObjectsOnCancel {3} - lakeformation
LakeFormation.DescribeTransaction {3} - lakeformation
LakeFormation.ExtendTransaction {3} - lakeformation
LakeFormation.GetQueryState {3} - lakeformation
LakeFormation.GetQueryStatistics {3} - lakeformation
LakeFormation.GetTableObjects {3} - lakeformation
LakeFormation.GetWorkUnitResults {3} - lakeformation
LakeFormation.GetWorkUnits {3} - lakeformation
LakeFormation.ListDataCellsFilter {3} - lakeformation
LakeFormation.ListTableStorageOptimizers {3} - lakeformation
LakeFormation.ListTransactions {3} - lakeformation
LakeFormation.StartQueryPlanning {3} - lakeformation
LakeFormation.StartTransaction {3} - lakeformation
LakeFormation.UpdateTableObjects {3} - lakeformation
LakeFormation.UpdateTableStorageOptimizer {3} - lakeformation
ForecastService.DescribeExplainability {3} - forecast
WAFV2.ListAvailableManagedRuleGroupVersions {3} - wafv2
Kendra.AssociateEntitiesToExperience {3} - kendra
Kendra.AssociatePersonasToEntities {3} - kendra
Kendra.CreateExperience {3} - kendra
Kendra.DeleteExperience {3} - kendra
Kendra.DescribeExperience {3} - kendra
Kendra.DisassociateEntitiesFromExperience {3} - kendra
Kendra.DisassociatePersonasFromEntities {3} - kendra
Kendra.GetSnapshots {3} - kendra
Kendra.ListEntityPersonas {3} - kendra
Kendra.ListExperienceEntities {3} - kendra
Kendra.ListExperiences {3} - kendra
Kendra.UpdateExperience {3} - kendra
Outposts.CancelOrder {3} - outposts
Outposts.CreateSite {3} - outposts
Outposts.GetCatalogItem {3} - outposts
Outposts.GetOrder {3} - outposts
Outposts.GetSite {3} - outposts
Outposts.GetSiteAddress {3} - outposts
Outposts.ListCatalogItems {3} - outposts
Outposts.ListOrders {3} - outposts
Outposts.UpdateSite {3} - outposts
Outposts.UpdateSiteAddress {3} - outposts
Outposts.UpdateSiteRackPhysicalProperties {3} - outposts
TimestreamQuery.PrepareQuery {3} - timestream
AmplifyBackend.CreateBackendStorage {3} - amplifybackend
AmplifyBackend.DeleteBackendStorage {3} - amplifybackend
AmplifyBackend.GetBackendStorage {3} - amplifybackend
AmplifyBackend.ImportBackendStorage {3} - amplifybackend
AmplifyBackend.ListS3Buckets {3} - amplifybackend
AmplifyBackend.UpdateBackendStorage {3} - amplifybackend
IotDeviceAdvisor.GetEndpoint {3} - iotdeviceadvisor
IoTWireless.AssociateMulticastGroupWithFuotaTask {3} - iot
IoTWireless.AssociateWirelessDeviceWithFuotaTask {3} - iot
IoTWireless.AssociateWirelessDeviceWithMulticastGroup {3} - iot
IoTWireless.CancelMulticastGroupSession {3} - iot
IoTWireless.CreateFuotaTask {3} - iot
IoTWireless.CreateMulticastGroup {3} - iot
IoTWireless.DeleteFuotaTask {3} - iot
IoTWireless.DeleteMulticastGroup {3} - iot
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
IoTWireless.SendDataToMulticastGroup {3} - iot
IoTWireless.StartBulkAssociateWirelessDeviceWithMulticastGroup {3} - iot
IoTWireless.StartBulkDisassociateWirelessDeviceFromMulticastGroup {3} - iot
IoTWireless.StartFuotaTask {3} - iot
IoTWireless.StartMulticastGroupSession {3} - iot
IoTWireless.UpdateFuotaTask {3} - iot
IoTWireless.UpdateMulticastGroup {3} - iot
IoTWireless.UpdateNetworkAnalyzerConfiguration {3} - iot
IoTWireless.UpdateResourceEventConfiguration {3} - iot
Location.SearchPlaceIndexForSuggestions {3} - geo
Finspacedata.CreateDataView {3} - finspacedata
Finspacedata.CreateDataset {3} - finspacedata
Finspacedata.DeleteDataset {3} - finspacedata
Finspacedata.GetChangeset {3} - finspacedata
Finspacedata.GetDataView {3} - finspacedata
Finspacedata.GetDataset {3} - finspacedata
Finspacedata.ListChangesets {3} - finspacedata
Finspacedata.ListDataViews {3} - finspacedata
Finspacedata.ListDatasets {3} - finspacedata
Finspacedata.UpdateChangeset {3} - finspacedata
Finspacedata.UpdateDataset {3} - finspacedata
Proton.CreateRepository {3} - proton
Proton.CreateTemplateSyncConfig {3} - proton
Proton.DeleteRepository {3} - proton
Proton.DeleteTemplateSyncConfig {3} - proton
Proton.GetRepository {3} - proton
Proton.GetRepositorySyncStatus {3} - proton
Proton.GetTemplateSyncConfig {3} - proton
Proton.GetTemplateSyncStatus {3} - proton
Proton.ListEnvironmentOutputs {3} - proton
Proton.ListEnvironmentProvisionedResources {3} - proton
Proton.ListRepositories {3} - proton
Proton.ListRepositorySyncDefinitions {3} - proton
Proton.ListServiceInstanceOutputs {3} - proton
Proton.ListServiceInstanceProvisionedResources {3} - proton
Proton.ListServicePipelineOutputs {3} - proton
Proton.ListServicePipelineProvisionedResources {3} - proton
Proton.NotifyResourceDeploymentStatusChange {3} - proton
Proton.UpdateTemplateSyncConfig {3} - proton
AppConfigData.GetLatestConfiguration {3} - appconfigdata
AppConfigData.StartConfigurationSession {3} - appconfigdata
Evidently.BatchEvaluateFeature {3} - evidently
Evidently.EvaluateFeature {3} - evidently
Evidently.ListTagsForResource {3} - evidently
Evidently.PutProjectEvents {3} - evidently
Evidently.TagResource {3} - evidently
Evidently.UntagResource {3} - evidently
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
