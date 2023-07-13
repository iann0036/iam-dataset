// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.TagResource {3} - apigateway
AutoScaling.AttachTrafficSources {3} - autoscaling
AutoScaling.DescribeTrafficSources {3} - autoscaling
AutoScaling.DetachTrafficSources {3} - autoscaling
CloudFront.CopyDistribution {3} - cloudfront
CloudFront.CreateContinuousDeploymentPolicy {3} - cloudfront
CloudFront.DeleteContinuousDeploymentPolicy {3} - cloudfront
CloudFront.GetContinuousDeploymentPolicy {3} - cloudfront
CloudFront.GetContinuousDeploymentPolicyConfig {3} - cloudfront
CloudFront.ListContinuousDeploymentPolicies {3} - cloudfront
CloudFront.UpdateContinuousDeploymentPolicy {3} - cloudfront
CloudFront.UpdateDistributionWithStagingConfig {3} - cloudfront
ConfigService.GetResourceEvaluationSummary {3} - config
ConfigService.ListResourceEvaluations {3} - config
ConfigService.StartResourceEvaluation {3} - config
ECS.GetTaskProtection {3} - ecs
ECS.UpdateTaskProtection {3} - ecs
EMR.GetClusterSessionCredentials {3} - elasticmapreduce
ES.AuthorizeVpcEndpointAccess {3} - es
ES.CreateVpcEndpoint {3} - es
ES.DeleteVpcEndpoint {3} - es
ES.DescribeVpcEndpoints {3} - es
ES.ListVpcEndpointAccess {3} - es
ES.ListVpcEndpoints {3} - es
ES.ListVpcEndpointsForDomain {3} - es
ES.RevokeVpcEndpointAccess {3} - es
ES.UpdateVpcEndpoint {3} - es
Iot.ListRelatedResourcesForAuditFinding {3} - iot
Organizations.DeleteResourcePolicy {3} - organizations
Organizations.DescribeResourcePolicy {3} - organizations
Organizations.PutResourcePolicy {3} - organizations
SSM.DeleteResourcePolicy {3} - ssm
SSM.GetResourcePolicies {3} - ssm
SSM.PutResourcePolicy {3} - ssm
Glue.BatchGetDataQualityResult {3} - glue
Glue.UpdateJobFromSourceControl {3} - glue
Glue.UpdateSourceControlFromJob {3} - glue
AppSync.EvaluateCode {3} - appsync
KinesisVideo.DescribeMappedResourceConfiguration {3} - kinesisvideo
KinesisVideo.DescribeMediaStorageConfiguration {3} - kinesisvideo
KinesisVideo.UpdateMediaStorageConfiguration {3} - kinesisvideo
SageMaker.ListAliases {3} - sagemaker
SageMaker.UpdateImageVersion {3} - sagemaker
Connect.ListRules {3} - connect
EKS.DescribeAddonConfiguration {3} - eks
Chime.ValidateE911Address {3} - chime
QuickSight.DescribeAnalysisDefinition {3} - quicksight
QuickSight.DescribeDashboardDefinition {3} - quicksight
QuickSight.DescribeTemplateDefinition {3} - quicksight
ManagedBlockchain.CreateAccessor {3} - managedblockchain
ManagedBlockchain.DeleteAccessor {3} - managedblockchain
ManagedBlockchain.GetAccessor {3} - managedblockchain
ManagedBlockchain.ListAccessors {3} - managedblockchain
GroundStation.CreateEphemeris {3} - groundstation
GroundStation.DeleteEphemeris {3} - groundstation
GroundStation.DescribeEphemeris {3} - groundstation
GroundStation.ListEphemerides {3} - groundstation
GroundStation.UpdateEphemeris {3} - groundstation
Personalize.CreateMetricAttribution {3} - personalize
Personalize.DeleteMetricAttribution {3} - personalize
Personalize.DescribeMetricAttribution {3} - personalize
Personalize.ListMetricAttributionMetrics {3} - personalize
Personalize.ListMetricAttributions {3} - personalize
Personalize.UpdateMetricAttribution {3} - personalize
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
IoTSiteWise.ListAssetModelProperties {3} - iotsitewise
IoTSiteWise.ListAssetProperties {3} - iotsitewise
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
OpenSearch.AuthorizeVpcEndpointAccess {3} - es
OpenSearch.CreateVpcEndpoint {3} - es
OpenSearch.DeleteVpcEndpoint {3} - es
OpenSearch.DescribeVpcEndpoints {3} - es
OpenSearch.ListVpcEndpointAccess {3} - es
OpenSearch.ListVpcEndpoints {3} - es
OpenSearch.ListVpcEndpointsForDomain {3} - es
OpenSearch.RevokeVpcEndpointAccess {3} - es
OpenSearch.UpdateVpcEndpoint {3} - es
Grafana.DescribeWorkspaceConfiguration {3} - grafana
Grafana.UpdateWorkspaceConfiguration {3} - grafana
Panorama.SignalApplicationInstanceNodeInstances {3} - panorama
RedshiftServerless.GetTableRestoreStatus {3} - redshiftserverless
RedshiftServerless.ListTableRestoreStatus {3} - redshiftserverless
RedshiftServerless.RestoreTableFromSnapshot {3} - redshiftserverless
BackupStorage.DeleteObject {3} - backupstorage
IoTFleetWise.BatchCreateVehicle {3} - iotfleetwise
IoTFleetWise.BatchUpdateVehicle {3} - iotfleetwise
ConnectCases.BatchGetField {3} - connectcases
ConnectCases.BatchPutFieldOptions {3} - connectcases
ConnectCases.CreateCase {3} - connectcases
ConnectCases.CreateDomain {3} - connectcases
ConnectCases.CreateField {3} - connectcases
ConnectCases.CreateLayout {3} - connectcases
ConnectCases.CreateRelatedItem {3} - connectcases
ConnectCases.CreateTemplate {3} - connectcases
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
SSMContacts.GetContactPolicy {1}
SSMContacts.ListTagsForResource {1}
AmplifyUIBuilder.UpdateComponent {1}
Connect.SearchSecurityProfiles {1}
Connect.SearchQueues {1}
Connect.SearchRoutingProfiles {1}
Connect.SearchUsers {1}
EMRcontainers.CreateJobTemplate {1}
IoTTwinMaker.BatchPutPropertyValues {1}
IoTTwinMaker.GetPropertyValueHistory {1}
AmplifyUIBuilder.CreateComponent {1}
AmplifyUIBuilder.CreateTheme {1}
AmplifyUIBuilder.UpdateTheme {1}
EMRServerless.StartJobRun {1}
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
