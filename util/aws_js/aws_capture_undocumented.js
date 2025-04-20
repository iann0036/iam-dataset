// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.CreateDomainNameAccessAssociation {3} - apigateway
APIGateway.DeleteDomainNameAccessAssociation {3} - apigateway
APIGateway.GetDomainNameAccessAssociations {3} - apigateway
APIGateway.RejectDomainNameAccessAssociation {3} - apigateway
AppRegistry.AssociateAttributeGroup {3} - servicecatalogappregistry
AppRegistry.AssociateResource {3} - servicecatalogappregistry
AppRegistry.CreateApplication {3} - servicecatalogappregistry
AppRegistry.CreateAttributeGroup {3} - servicecatalogappregistry
AppRegistry.DeleteApplication {3} - servicecatalogappregistry
AppRegistry.DeleteAttributeGroup {3} - servicecatalogappregistry
AppRegistry.DisassociateAttributeGroup {3} - servicecatalogappregistry
AppRegistry.DisassociateResource {3} - servicecatalogappregistry
AppRegistry.GetApplication {3} - servicecatalogappregistry
AppRegistry.GetAssociatedResource {3} - servicecatalogappregistry
AppRegistry.GetAttributeGroup {3} - servicecatalogappregistry
AppRegistry.GetConfiguration {3} - servicecatalogappregistry
AppRegistry.ListApplications {3} - servicecatalogappregistry
AppRegistry.ListAssociatedAttributeGroups {3} - servicecatalogappregistry
AppRegistry.ListAssociatedResources {3} - servicecatalogappregistry
AppRegistry.ListAttributeGroups {3} - servicecatalogappregistry
AppRegistry.ListAttributeGroupsForApplication {3} - servicecatalogappregistry
AppRegistry.ListTagsForResource {3} - servicecatalogappregistry
AppRegistry.PutConfiguration {3} - servicecatalogappregistry
AppRegistry.SyncResource {3} - servicecatalogappregistry
AppRegistry.TagResource {3} - servicecatalogappregistry
AppRegistry.UntagResource {3} - servicecatalogappregistry
AppRegistry.UpdateApplication {3} - servicecatalogappregistry
AppRegistry.UpdateAttributeGroup {3} - servicecatalogappregistry
BCMPricingCalculator.BatchCreateBillScenarioCommitmentModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchCreateBillScenarioUsageModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchCreateWorkloadEstimateUsage {3} - bcmpricingcalculator
BCMPricingCalculator.BatchDeleteBillScenarioCommitmentModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchDeleteBillScenarioUsageModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchDeleteWorkloadEstimateUsage {3} - bcmpricingcalculator
BCMPricingCalculator.BatchUpdateBillScenarioCommitmentModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchUpdateBillScenarioUsageModification {3} - bcmpricingcalculator
BCMPricingCalculator.BatchUpdateWorkloadEstimateUsage {3} - bcmpricingcalculator
BedrockAgent.AssociateAgentCollaborator {3} - bedrockagent
BedrockAgent.DeleteKnowledgeBaseDocuments {3} - bedrockagent
BedrockAgent.DisassociateAgentCollaborator {3} - bedrockagent
BedrockAgent.GetAgentCollaborator {3} - bedrockagent
BedrockAgent.GetKnowledgeBaseDocuments {3} - bedrockagent
BedrockAgent.IngestKnowledgeBaseDocuments {3} - bedrockagent
BedrockAgent.ListAgentCollaborators {3} - bedrockagent
BedrockAgent.ListKnowledgeBaseDocuments {3} - bedrockagent
BedrockAgent.StopIngestionJob {3} - bedrockagent
BedrockAgent.UpdateAgentCollaborator {3} - bedrockagent
BedrockAgent.ValidateFlowDefinition {3} - bedrockagent
BedrockAgentRuntime.CreateInvocation {3} - bedrockagentruntime
BedrockAgentRuntime.CreateSession {3} - bedrockagentruntime
BedrockAgentRuntime.DeleteSession {3} - bedrockagentruntime
BedrockAgentRuntime.EndSession {3} - bedrockagentruntime
BedrockAgentRuntime.GenerateQuery {3} - bedrockagentruntime
BedrockAgentRuntime.GetInvocationStep {3} - bedrockagentruntime
BedrockAgentRuntime.GetSession {3} - bedrockagentruntime
BedrockAgentRuntime.InvokeInlineAgent {3} - bedrockagentruntime
BedrockAgentRuntime.ListInvocationSteps {3} - bedrockagentruntime
BedrockAgentRuntime.ListInvocations {3} - bedrockagentruntime
BedrockAgentRuntime.ListSessions {3} - bedrockagentruntime
BedrockAgentRuntime.ListTagsForResource {3} - bedrockagentruntime
BedrockAgentRuntime.OptimizePrompt {3} - bedrockagentruntime
BedrockAgentRuntime.PutInvocationStep {3} - bedrockagentruntime
BedrockAgentRuntime.Rerank {3} - bedrockagentruntime
BedrockAgentRuntime.RetrieveAndGenerateStream {3} - bedrockagentruntime
BedrockAgentRuntime.TagResource {3} - bedrockagentruntime
BedrockAgentRuntime.UntagResource {3} - bedrockagentruntime
BedrockAgentRuntime.UpdateSession {3} - bedrockagentruntime
BedrockDataAutomation.CreateBlueprint {3} - bedrockdataautomation
BedrockDataAutomation.CreateBlueprintVersion {3} - bedrockdataautomation
BedrockDataAutomation.CreateDataAutomationProject {3} - bedrockdataautomation
BedrockDataAutomation.DeleteBlueprint {3} - bedrockdataautomation
BedrockDataAutomation.DeleteDataAutomationProject {3} - bedrockdataautomation
BedrockDataAutomation.GetBlueprint {3} - bedrockdataautomation
BedrockDataAutomation.GetDataAutomationProject {3} - bedrockdataautomation
BedrockDataAutomation.ListBlueprints {3} - bedrockdataautomation
BedrockDataAutomation.ListDataAutomationProjects {3} - bedrockdataautomation
BedrockDataAutomation.ListTagsForResource {3} - bedrockdataautomation
BedrockDataAutomation.TagResource {3} - bedrockdataautomation
BedrockDataAutomation.UntagResource {3} - bedrockdataautomation
BedrockDataAutomation.UpdateBlueprint {3} - bedrockdataautomation
BedrockDataAutomation.UpdateDataAutomationProject {3} - bedrockdataautomation
BedrockDataAutomationRuntime.GetDataAutomationStatus {3} - bedrockdataautomationruntime
BedrockDataAutomationRuntime.InvokeDataAutomationAsync {3} - bedrockdataautomationruntime
BedrockDataAutomationRuntime.ListTagsForResource {3} - bedrockdataautomationruntime
BedrockDataAutomationRuntime.TagResource {3} - bedrockdataautomationruntime
BedrockDataAutomationRuntime.UntagResource {3} - bedrockdataautomationruntime
BedrockRuntime.GetAsyncInvoke {3} - bedrockruntime
BedrockRuntime.InvokeModelWithBidirectionalStream {3} - bedrockruntime
BedrockRuntime.ListAsyncInvokes {3} - bedrockruntime
BedrockRuntime.StartAsyncInvoke {3} - bedrockruntime
ChimeSDKMediaPipelines.CreateMediaInsightsPipeline {3} - mediapipelineschime
ChimeSDKMediaPipelines.CreateMediaInsightsPipelineConfiguration {3} - mediapipelineschime
ChimeSDKMediaPipelines.CreateMediaPipelineKinesisVideoStreamPool {3} - mediapipelineschime
ChimeSDKMediaPipelines.CreateMediaStreamPipeline {3} - mediapipelineschime
ChimeSDKMediaPipelines.GetSpeakerSearchTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.GetVoiceToneAnalysisTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.StartSpeakerSearchTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.StartVoiceToneAnalysisTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.StopSpeakerSearchTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.StopVoiceToneAnalysisTask {3} - mediapipelineschime
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineConfiguration {3} - mediapipelineschime
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineStatus {3} - mediapipelineschime
ChimeSDKMessaging.DeleteMessagingStreamingConfigurations {3} - messagingchime
ChimeSDKMessaging.GetMessagingStreamingConfigurations {3} - messagingchime
ChimeSDKMessaging.PutChannelExpirationSettings {3} - messagingchime
ChimeSDKMessaging.PutMessagingStreamingConfigurations {3} - messagingchime
ChimeSDKVoice.BatchDeletePhoneNumber {3} - voicechime
ChimeSDKVoice.CreatePhoneNumberOrder {3} - voicechime
ChimeSDKVoice.CreateProxySession {3} - voicechime
ChimeSDKVoice.CreateSipMediaApplication {3} - voicechime
ChimeSDKVoice.CreateSipMediaApplicationCall {3} - voicechime
ChimeSDKVoice.CreateSipRule {3} - voicechime
ChimeSDKVoice.CreateVoiceProfileDomain {3} - voicechime
ChimeSDKVoice.DeleteVoiceConnectorExternalSystemsConfiguration {3} - voicechime
ChimeSDKVoice.DeleteVoiceConnectorTerminationCredentials {3} - voicechime
ChimeSDKVoice.GetPhoneNumberOrder {3} - voicechime
ChimeSDKVoice.GetVoiceConnectorExternalSystemsConfiguration {3} - voicechime
ChimeSDKVoice.ListSupportedPhoneNumberCountries {3} - voicechime
ChimeSDKVoice.ListTagsForResource {3} - voicechime
ChimeSDKVoice.PutVoiceConnectorExternalSystemsConfiguration {3} - voicechime
ChimeSDKVoice.PutVoiceConnectorProxy {3} - voicechime
ChimeSDKVoice.PutVoiceConnectorStreamingConfiguration {3} - voicechime
ChimeSDKVoice.StartVoiceToneAnalysisTask {3} - voicechime
ChimeSDKVoice.TagResource {3} - voicechime
ChimeSDKVoice.UntagResource {3} - voicechime
ChimeSDKVoice.UpdateProxySession {3} - voicechime
ChimeSDKVoice.UpdateSipMediaApplicationCall {3} - voicechime
CloudControlApi.CancelResourceRequest {3} - cloudcontrolapi
CloudControlApi.CreateResource {3} - cloudcontrolapi
CloudControlApi.DeleteResource {3} - cloudcontrolapi
CloudControlApi.GetResource {3} - cloudcontrolapi
CloudControlApi.GetResourceRequestStatus {3} - cloudcontrolapi
CloudControlApi.ListResourceRequests {3} - cloudcontrolapi
CloudControlApi.ListResources {3} - cloudcontrolapi
CloudControlApi.UpdateResource {3} - cloudcontrolapi
CognitoIdentityProvider.CompleteWebAuthnRegistration {3} - cognitoidp
CognitoIdentityProvider.DeleteWebAuthnCredential {3} - cognitoidp
CognitoIdentityProvider.GetUserAuthFactors {3} - cognitoidp
CognitoIdentityProvider.ListWebAuthnCredentials {3} - cognitoidp
CognitoIdentityProvider.StartWebAuthnRegistration {3} - cognitoidp
DSQL.GetVpcEndpointServiceName {3} - dsql
EC2.AssociateRouteServer {3} - ec2
EC2.CreateRouteServer {3} - ec2
EC2.CreateRouteServerEndpoint {3} - ec2
EC2.CreateRouteServerPeer {3} - ec2
EC2.DeleteRouteServer {3} - ec2
EC2.DeleteRouteServerEndpoint {3} - ec2
EC2.DeleteRouteServerPeer {3} - ec2
EC2.DescribeRouteServerEndpoints {3} - ec2
EC2.DescribeRouteServerPeers {3} - ec2
EC2.DescribeRouteServers {3} - ec2
EC2.DisableRouteServerPropagation {3} - ec2
EC2.DisassociateRouteServer {3} - ec2
EC2.EnableRouteServerPropagation {3} - ec2
EC2.GetRouteServerAssociations {3} - ec2
EC2.GetRouteServerPropagations {3} - ec2
EC2.GetRouteServerRoutingDatabase {3} - ec2
EC2.ModifyRouteServer {3} - ec2
ECRPublic.BatchCheckLayerAvailability {3} - api.ecrpublic
ECRPublic.BatchDeleteImage {3} - api.ecrpublic
ECRPublic.CompleteLayerUpload {3} - api.ecrpublic
ECRPublic.CreateRepository {3} - api.ecrpublic
ECRPublic.DeleteRepository {3} - api.ecrpublic
ECRPublic.DeleteRepositoryPolicy {3} - api.ecrpublic
ECRPublic.DescribeImageTags {3} - api.ecrpublic
ECRPublic.DescribeImages {3} - api.ecrpublic
ECRPublic.DescribeRegistries {3} - api.ecrpublic
ECRPublic.DescribeRepositories {3} - api.ecrpublic
ECRPublic.GetAuthorizationToken {3} - api.ecrpublic
ECRPublic.GetRegistryCatalogData {3} - api.ecrpublic
ECRPublic.GetRepositoryCatalogData {3} - api.ecrpublic
ECRPublic.GetRepositoryPolicy {3} - api.ecrpublic
ECRPublic.InitiateLayerUpload {3} - api.ecrpublic
ECRPublic.ListTagsForResource {3} - api.ecrpublic
ECRPublic.PutImage {3} - api.ecrpublic
ECRPublic.PutRegistryCatalogData {3} - api.ecrpublic
ECRPublic.PutRepositoryCatalogData {3} - api.ecrpublic
ECRPublic.SetRepositoryPolicy {3} - api.ecrpublic
ECRPublic.TagResource {3} - api.ecrpublic
ECRPublic.UntagResource {3} - api.ecrpublic
ECRPublic.UploadLayerPart {3} - api.ecrpublic
FinSpaceData.AssociateUserToPermissionGroup {3} - finspaceapi
FinSpaceData.CreateChangeset {3} - finspaceapi
FinSpaceData.CreateDataView {3} - finspaceapi
FinSpaceData.CreateDataset {3} - finspaceapi
FinSpaceData.CreatePermissionGroup {3} - finspaceapi
FinSpaceData.CreateUser {3} - finspaceapi
FinSpaceData.DeleteDataset {3} - finspaceapi
FinSpaceData.DeletePermissionGroup {3} - finspaceapi
FinSpaceData.DisableUser {3} - finspaceapi
FinSpaceData.DisassociateUserFromPermissionGroup {3} - finspaceapi
FinSpaceData.EnableUser {3} - finspaceapi
FinSpaceData.GetChangeset {3} - finspaceapi
FinSpaceData.GetDataView {3} - finspaceapi
FinSpaceData.GetDataset {3} - finspaceapi
FinSpaceData.GetExternalDataViewAccessDetails {3} - finspaceapi
FinSpaceData.GetPermissionGroup {3} - finspaceapi
FinSpaceData.GetUser {3} - finspaceapi
FinSpaceData.GetWorkingLocation {3} - finspaceapi
FinSpaceData.ListChangesets {3} - finspaceapi
FinSpaceData.ListDataViews {3} - finspaceapi
FinSpaceData.ListDatasets {3} - finspaceapi
FinSpaceData.ListPermissionGroups {3} - finspaceapi
FinSpaceData.ListPermissionGroupsByUser {3} - finspaceapi
FinSpaceData.ListUsers {3} - finspaceapi
FinSpaceData.ListUsersByPermissionGroup {3} - finspaceapi
FinSpaceData.ResetUserPassword {3} - finspaceapi
FinSpaceData.UpdateChangeset {3} - finspaceapi
FinSpaceData.UpdateDataset {3} - finspaceapi
FinSpaceData.UpdatePermissionGroup {3} - finspaceapi
FinSpaceData.UpdateUser {3} - finspaceapi
GeoMaps.GetGlyphs {3} - geomaps
GeoMaps.GetSprites {3} - geomaps
GeoMaps.GetStyleDescriptor {3} - geomaps
Glue.BatchGetDataQualityResult {3} - glue
Glue.BatchPutDataQualityStatisticAnnotation {3} - glue
Glue.ListDataQualityStatisticAnnotations {3} - glue
Glue.ListDataQualityStatistics {3} - glue
IVSRealTime.CreateIngestConfiguration {3} - ivsrealtime
IVSRealTime.CreateStorageConfiguration {3} - ivsrealtime
IVSRealTime.DeleteIngestConfiguration {3} - ivsrealtime
IVSRealTime.GetIngestConfiguration {3} - ivsrealtime
IVSRealTime.ListIngestConfigurations {3} - ivsrealtime
IVSRealTime.TagResource {3} - ivsrealtime
IVSRealTime.UpdateIngestConfiguration {3} - ivsrealtime
IoTDataPlane.DeleteThingShadow {3} - dataats.iot
IoTDataPlane.GetRetainedMessage {3} - dataats.iot
IoTDataPlane.GetThingShadow {3} - dataats.iot
IoTDataPlane.ListNamedShadowsForThing {3} - dataats.iot
IoTDataPlane.ListRetainedMessages {3} - dataats.iot
IoTDataPlane.Publish {3} - dataats.iot
IoTDataPlane.UpdateThingShadow {3} - dataats.iot
IoTDeviceAdvisor.CreateSuiteDefinition {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.DeleteSuiteDefinition {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.GetEndpoint {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.GetSuiteDefinition {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.GetSuiteRun {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.GetSuiteRunReport {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.ListSuiteDefinitions {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.ListSuiteRuns {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.ListTagsForResource {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.StartSuiteRun {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.StopSuiteRun {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.TagResource {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.UntagResource {3} - api.iotdeviceadvisor
IoTDeviceAdvisor.UpdateSuiteDefinition {3} - api.iotdeviceadvisor
IoTJobsDataPlane.StartCommandExecution {3} - data.jobs.iot
IoTManagedIntegrations.CreateCredentialLocker {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateDestination {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateEventLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateManagedThing {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateNotificationConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateOtaTask {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateOtaTaskConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.CreateProvisioningProfile {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteCredentialLocker {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteDestination {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteEventLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteManagedThing {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteNotificationConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteOtaTask {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteOtaTaskConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.DeleteProvisioningProfile {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetCredentialLocker {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetCustomEndpoint {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetDefaultEncryptionConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetDestination {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetDeviceDiscovery {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetEventLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetHubConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetManagedThing {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetManagedThingCapabilities {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetManagedThingConnectivityData {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetManagedThingMetaData {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetManagedThingState {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetNotificationConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetOtaTask {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetOtaTaskConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetProvisioningProfile {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetRuntimeLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.GetSchemaVersion {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListCredentialLockers {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListDestinations {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListEventLogConfigurations {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListManagedThingSchemas {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListManagedThings {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListNotificationConfigurations {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListOtaTaskConfigurations {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListOtaTaskExecutions {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListOtaTasks {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListProvisioningProfiles {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ListSchemaVersions {3} - api.iotmanagedintegrations
IoTManagedIntegrations.PutDefaultEncryptionConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.PutHubConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.PutRuntimeLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.RegisterCustomEndpoint {3} - api.iotmanagedintegrations
IoTManagedIntegrations.ResetRuntimeLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.SendManagedThingCommand {3} - api.iotmanagedintegrations
IoTManagedIntegrations.StartDeviceDiscovery {3} - api.iotmanagedintegrations
IoTManagedIntegrations.UpdateDestination {3} - api.iotmanagedintegrations
IoTManagedIntegrations.UpdateEventLogConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.UpdateManagedThing {3} - api.iotmanagedintegrations
IoTManagedIntegrations.UpdateNotificationConfiguration {3} - api.iotmanagedintegrations
IoTManagedIntegrations.UpdateOtaTask {3} - api.iotmanagedintegrations
Keyspaces.CreateType {3} - cassandra
Keyspaces.DeleteType {3} - cassandra
Keyspaces.GetTableAutoScalingSettings {3} - cassandra
Keyspaces.GetType {3} - cassandra
Keyspaces.ListTypes {3} - cassandra
Keyspaces.UpdateKeyspace {3} - cassandra
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
Lex.DeleteSession {3} - runtime.lex
Lex.GetSession {3} - runtime.lex
Lex.PostContent {3} - runtime.lex
Lex.PostText {3} - runtime.lex
Lex.PutSession {3} - runtime.lex
LexModelsV2.ListUtteranceAnalyticsData {3} - modelsv2lex
LexModelsV2.ListUtteranceMetrics {3} - modelsv2lex
LexRuntimeV2.StartConversation {3} - runtimev2lex
MailManager.CreateAddressList {3} - mailmanager
MailManager.CreateAddressListImportJob {3} - mailmanager
MailManager.CreateRelay {3} - mailmanager
MailManager.CreateTrafficPolicy {3} - mailmanager
MailManager.DeleteAddressList {3} - mailmanager
MailManager.DeregisterMemberFromAddressList {3} - mailmanager
MailManager.GetAddressList {3} - mailmanager
MailManager.GetAddressListImportJob {3} - mailmanager
MailManager.GetArchiveExport {3} - mailmanager
MailManager.GetArchiveSearch {3} - mailmanager
MailManager.GetArchiveSearchResults {3} - mailmanager
MailManager.GetMemberOfAddressList {3} - mailmanager
MailManager.ListAddressListImportJobs {3} - mailmanager
MailManager.ListAddressLists {3} - mailmanager
MailManager.ListMembersOfAddressList {3} - mailmanager
MailManager.ListTagsForResource {3} - mailmanager
MailManager.RegisterMemberToAddressList {3} - mailmanager
MailManager.StartAddressListImportJob {3} - mailmanager
MailManager.StartArchiveExport {3} - mailmanager
MailManager.StartArchiveSearch {3} - mailmanager
MailManager.StopAddressListImportJob {3} - mailmanager
MailManager.StopArchiveExport {3} - mailmanager
MailManager.StopArchiveSearch {3} - mailmanager
MailManager.TagResource {3} - mailmanager
MailManager.UntagResource {3} - mailmanager
MarketplaceCatalog.BatchDescribeEntities {3} - catalog.marketplace
MarketplaceReporting.GetBuyerDashboard {3} - reportingmarketplace
MediaLive.ListSdiSources {3} - medialive
NeptuneGraph.ExecuteQuery {3} - neptunegraph
NeptuneGraph.GetQuery {3} - neptunegraph
Neptunedata.CancelGremlinQuery {3} - neptunedb
Neptunedata.CancelOpenCypherQuery {3} - neptunedb
Neptunedata.DeletePropertygraphStatistics {3} - neptunedb
Neptunedata.DeleteSparqlStatistics {3} - neptunedb
Neptunedata.ExecuteFastReset {3} - neptunedb
Neptunedata.ExecuteGremlinExplainQuery {3} - neptunedb
Neptunedata.ExecuteGremlinProfileQuery {3} - neptunedb
Neptunedata.ExecuteGremlinQuery {3} - neptunedb
Neptunedata.ExecuteOpenCypherExplainQuery {3} - neptunedb
Neptunedata.ExecuteOpenCypherQuery {3} - neptunedb
Neptunedata.GetGremlinQueryStatus {3} - neptunedb
Neptunedata.GetMLDataProcessingJob {3} - neptunedb
Neptunedata.GetMLEndpoint {3} - neptunedb
Neptunedata.GetMLModelTrainingJob {3} - neptunedb
Neptunedata.GetMLModelTransformJob {3} - neptunedb
Neptunedata.GetOpenCypherQueryStatus {3} - neptunedb
Neptunedata.GetPropertygraphStatistics {3} - neptunedb
Neptunedata.GetPropertygraphStream {3} - neptunedb
Neptunedata.GetPropertygraphSummary {3} - neptunedb
Neptunedata.GetRDFGraphSummary {3} - neptunedb
Neptunedata.GetSparqlStatistics {3} - neptunedb
Neptunedata.GetSparqlStream {3} - neptunedb
Neptunedata.ListGremlinQueries {3} - neptunedb
Neptunedata.ListOpenCypherQueries {3} - neptunedb
Neptunedata.ManagePropertygraphStatistics {3} - neptunedb
Neptunedata.ManageSparqlStatistics {3} - neptunedb
PartnerCentralSelling.AcceptEngagementInvitation {3} - partnercentralselling
PartnerCentralSelling.AssignOpportunity {3} - partnercentralselling
PartnerCentralSelling.AssociateOpportunity {3} - partnercentralselling
PartnerCentralSelling.CreateEngagement {3} - partnercentralselling
PartnerCentralSelling.CreateEngagementInvitation {3} - partnercentralselling
PartnerCentralSelling.CreateOpportunity {3} - partnercentralselling
PartnerCentralSelling.CreateResourceSnapshot {3} - partnercentralselling
PartnerCentralSelling.CreateResourceSnapshotJob {3} - partnercentralselling
PartnerCentralSelling.DeleteResourceSnapshotJob {3} - partnercentralselling
PartnerCentralSelling.DisassociateOpportunity {3} - partnercentralselling
PartnerCentralSelling.GetAwsOpportunitySummary {3} - partnercentralselling
PartnerCentralSelling.GetEngagement {3} - partnercentralselling
PartnerCentralSelling.GetEngagementInvitation {3} - partnercentralselling
PartnerCentralSelling.GetOpportunity {3} - partnercentralselling
PartnerCentralSelling.GetResourceSnapshot {3} - partnercentralselling
PartnerCentralSelling.GetResourceSnapshotJob {3} - partnercentralselling
PartnerCentralSelling.GetSellingSystemSettings {3} - partnercentralselling
PartnerCentralSelling.ListEngagementByAcceptingInvitationTasks {3} - partnercentralselling
PartnerCentralSelling.ListEngagementFromOpportunityTasks {3} - partnercentralselling
PartnerCentralSelling.ListEngagementInvitations {3} - partnercentralselling
PartnerCentralSelling.ListEngagementMembers {3} - partnercentralselling
PartnerCentralSelling.ListEngagementResourceAssociations {3} - partnercentralselling
PartnerCentralSelling.ListEngagements {3} - partnercentralselling
PartnerCentralSelling.ListOpportunities {3} - partnercentralselling
PartnerCentralSelling.ListResourceSnapshotJobs {3} - partnercentralselling
PartnerCentralSelling.ListResourceSnapshots {3} - partnercentralselling
PartnerCentralSelling.ListSolutions {3} - partnercentralselling
PartnerCentralSelling.ListTagsForResource {3} - partnercentralselling
PartnerCentralSelling.PutSellingSystemSettings {3} - partnercentralselling
PartnerCentralSelling.RejectEngagementInvitation {3} - partnercentralselling
PartnerCentralSelling.StartEngagementByAcceptingInvitationTask {3} - partnercentralselling
PartnerCentralSelling.StartEngagementFromOpportunityTask {3} - partnercentralselling
PartnerCentralSelling.StartResourceSnapshotJob {3} - partnercentralselling
PartnerCentralSelling.StopResourceSnapshotJob {3} - partnercentralselling
PartnerCentralSelling.SubmitOpportunity {3} - partnercentralselling
PartnerCentralSelling.TagResource {3} - partnercentralselling
PartnerCentralSelling.UntagResource {3} - partnercentralselling
PartnerCentralSelling.UpdateOpportunity {3} - partnercentralselling
PaymentCryptographyData.DecryptData {3} - dataplane.paymentcryptography
PaymentCryptographyData.EncryptData {3} - dataplane.paymentcryptography
PaymentCryptographyData.GenerateCardValidationData {3} - dataplane.paymentcryptography
PaymentCryptographyData.GenerateMac {3} - dataplane.paymentcryptography
PaymentCryptographyData.GenerateMacEmvPinChange {3} - dataplane.paymentcryptography
PaymentCryptographyData.GeneratePinData {3} - dataplane.paymentcryptography
PaymentCryptographyData.ReEncryptData {3} - dataplane.paymentcryptography
PaymentCryptographyData.TranslatePinData {3} - dataplane.paymentcryptography
PaymentCryptographyData.VerifyAuthRequestCryptogram {3} - dataplane.paymentcryptography
PaymentCryptographyData.VerifyCardValidationData {3} - dataplane.paymentcryptography
PaymentCryptographyData.VerifyMac {3} - dataplane.paymentcryptography
PaymentCryptographyData.VerifyPinData {3} - dataplane.paymentcryptography
QApps.BatchCreateCategory {3} - data.qapps
QApps.BatchDeleteCategory {3} - data.qapps
QApps.BatchUpdateCategory {3} - data.qapps
QApps.CreateLibraryItem {3} - data.qapps
QApps.CreatePresignedUrl {3} - data.qapps
QApps.CreateQApp {3} - data.qapps
QApps.DeleteLibraryItem {3} - data.qapps
QApps.DeleteQApp {3} - data.qapps
QApps.DescribeQAppPermissions {3} - data.qapps
QApps.DisassociateLibraryItemReview {3} - data.qapps
QApps.DisassociateQAppFromUser {3} - data.qapps
QApps.ExportQAppSessionData {3} - data.qapps
QApps.GetLibraryItem {3} - data.qapps
QApps.GetQApp {3} - data.qapps
QApps.GetQAppSession {3} - data.qapps
QApps.GetQAppSessionMetadata {3} - data.qapps
QApps.ImportDocument {3} - data.qapps
QApps.ListCategories {3} - data.qapps
QApps.ListLibraryItems {3} - data.qapps
QApps.ListQAppSessionData {3} - data.qapps
QApps.ListQApps {3} - data.qapps
QApps.ListTagsForResource {3} - data.qapps
QApps.PredictQApp {3} - data.qapps
QApps.StartQAppSession {3} - data.qapps
QApps.StopQAppSession {3} - data.qapps
QApps.TagResource {3} - data.qapps
QApps.UntagResource {3} - data.qapps
QApps.UpdateLibraryItem {3} - data.qapps
QApps.UpdateLibraryItemMetadata {3} - data.qapps
QApps.UpdateQApp {3} - data.qapps
QApps.UpdateQAppPermissions {3} - data.qapps
QApps.UpdateQAppSession {3} - data.qapps
QApps.UpdateQAppSessionMetadata {3} - data.qapps
RedshiftDataAPIService.GetStatementResultV2 {3} - redshiftdata
ResourceExplorer2.ListResources {3} - resourceexplorer2
S3Control.DeleteAccessPointScope {3} - s3control
S3Control.DeleteBucketReplication {3} - s3control
S3Control.GetAccessPointScope {3} - s3control
S3Control.GetBucketReplication {3} - s3control
S3Control.ListAccessPointsForDirectoryBuckets {3} - s3control
S3Control.PutAccessPointScope {3} - s3control
S3Control.PutBucketReplication {3} - s3control
SESV2.CreateMultiRegionEndpoint {3} - email
SESV2.DeleteMultiRegionEndpoint {3} - email
SESV2.GetMultiRegionEndpoint {3} - email
SESV2.ListMultiRegionEndpoints {3} - email
SESV2.PutConfigurationSetArchivingOptions {3} - email
SageMaker.BatchDeleteClusterNodes {3} - api.sagemaker
SageMaker.CreateClusterSchedulerConfig {3} - api.sagemaker
SageMaker.CreateComputeQuota {3} - api.sagemaker
SageMaker.CreatePartnerApp {3} - api.sagemaker
SageMaker.CreatePartnerAppPresignedUrl {3} - api.sagemaker
SageMaker.CreateTrainingPlan {3} - api.sagemaker
SageMaker.DeleteClusterSchedulerConfig {3} - api.sagemaker
SageMaker.DeleteComputeQuota {3} - api.sagemaker
SageMaker.DeletePartnerApp {3} - api.sagemaker
SageMaker.DescribeClusterSchedulerConfig {3} - api.sagemaker
SageMaker.DescribeComputeQuota {3} - api.sagemaker
SageMaker.DescribePartnerApp {3} - api.sagemaker
SageMaker.DescribeTrainingPlan {3} - api.sagemaker
SageMaker.ListClusterSchedulerConfigs {3} - api.sagemaker
SageMaker.ListComputeQuotas {3} - api.sagemaker
SageMaker.ListPartnerApps {3} - api.sagemaker
SageMaker.ListTrainingPlans {3} - api.sagemaker
SageMaker.SearchTrainingPlanOfferings {3} - api.sagemaker
SageMaker.UpdateClusterSchedulerConfig {3} - api.sagemaker
SageMaker.UpdateComputeQuota {3} - api.sagemaker
SageMaker.UpdateHubContent {3} - api.sagemaker
SageMaker.UpdateHubContentReference {3} - api.sagemaker
SageMaker.UpdatePartnerApp {3} - api.sagemaker
SageMakerMetrics.BatchGetMetrics {3} - metrics.sagemaker
SagemakerEdgeManager.GetDeployments {3} - edge.sagemaker
SagemakerEdgeManager.GetDeviceRegistration {3} - edge.sagemaker
SagemakerEdgeManager.SendHeartbeat {3} - edge.sagemaker
TaxSettings.BatchGetTaxExemptions {3} - tax
TaxSettings.GetTaxExemptionTypes {3} - tax
TaxSettings.ListTaxExemptions {3} - tax
TaxSettings.PutTaxExemption {3} - tax
TranscribeStreamingService.GetMedicalScribeStream {3} - transcribestreaming
TranscribeStreamingService.StartCallAnalyticsStreamTranscription {3} - transcribestreaming
TranscribeStreamingService.StartMedicalScribeStream {3} - transcribestreaming
TranscribeStreamingService.StartMedicalStreamTranscription {3} - transcribestreaming
TranscribeStreamingService.StartStreamTranscription {3} - transcribestreaming
VPCLattice.BatchUpdateRule {3} - vpclattice
VerifiedPermissions.BatchGetPolicy {3} - verifiedpermissions
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
                known_permissions[iamdefitem.prefix.toLowerCase()+":"+priv.privilege.toLowerCase()] = (priv.access_level == "Unknown");
            }
        }
        
        for (let test_item of long_undocumented_test_list.split("\n")) {
            if (test_item.includes(" (datasource)")) {
                continue
            }
            if (test_item.includes("CodeCatalyst.")) { // breaks CLI
                continue
            }

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
            if (!Object.keys(known_permissions).includes(item['permission'].toLowerCase())) {
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
                if (!known_permissions[item['permission'].toLowerCase()]) {
                    console.log("Invalid hit: " + item['permission']);
                }
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
