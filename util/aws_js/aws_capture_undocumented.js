// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
APIGateway.TagResource {3} - apigateway
CloudTrail.ListInsightsMetricData {3} - cloudtrail
Lambda.InvokeWithResponseStream {3} - lambda
S3.CreateSession {3} - s3
S3.ListDirectoryBuckets {3} - s3
S3Control.DeleteBucketReplication {3} - s3
S3Control.GetBucketReplication {3} - s3
S3Control.PutBucketReplication {3} - s3
Glue.BatchGetDataQualityResult {3} - glue
Glue.BatchPutDataQualityStatisticAnnotation {3} - glue
Glue.ListDataQualityStatisticAnnotations {3} - glue
Glue.ListDataQualityStatistics {3} - glue
QuickSight.DescribeAnalysisDefinition {3} - quicksight
QuickSight.DescribeDashboardDefinition {3} - quicksight
QuickSight.DescribeTemplateDefinition {3} - quicksight
MediaConnect.DescribeFlowSourceThumbnail {3} - mediaconnect
Personalize.UpdateSolution {3} - personalize
LakeFormation.AssumeDecoratedRoleWithSAML {3} - lakeformation
LakeFormation.GetTemporaryGluePartitionCredentials {3} - lakeformation
LakeFormation.GetTemporaryGlueTableCredentials {3} - lakeformation
MarketplaceCatalog.BatchDescribeEntities {3} - awsmarketplace
AccessAnalyzer.GetFindingV2 {3} - accessanalyzer
AccessAnalyzer.ListFindingsV2 {3} - accessanalyzer
LexModelsV2.ListUtteranceAnalyticsData {3} - lex
LexModelsV2.ListUtteranceMetrics {3} - lex
Finspacedata.CreateDataView {3} - finspaceapi
Finspacedata.UpdateChangeset {3} - finspaceapi
ChimeSDKMessaging.DeleteMessagingStreamingConfigurations {3} - chimesdkmessaging
ChimeSDKMessaging.GetMessagingStreamingConfigurations {3} - chimesdkmessaging
ChimeSDKMessaging.PutChannelExpirationSettings {3} - chimesdkmessaging
ChimeSDKMessaging.PutMessagingStreamingConfigurations {3} - chimesdkmessaging
Keyspaces.GetTableAutoScalingSettings {3} - keyspaces
PinpointSMSVoiceV2.AssociateProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateRegistration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateRegistrationAssociation {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateRegistrationAttachment {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateRegistrationVersion {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.CreateVerifiedDestinationNumber {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteAccountDefaultProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteMediaMessageSpendLimitOverride {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteRegistration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteRegistrationAttachment {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteRegistrationFieldValue {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DeleteVerifiedDestinationNumber {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeProtectConfigurations {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationAttachments {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationFieldDefinitions {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationFieldValues {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationSectionDefinitions {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationTypeDefinitions {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrationVersions {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeRegistrations {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DescribeVerifiedDestinationNumbers {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DisassociateProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.DiscardRegistrationVersion {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.GetProtectConfigurationCountryRuleSet {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.ListRegistrationAssociations {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.PutRegistrationFieldValue {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.ReleaseSenderId {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.RequestSenderId {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.SendDestinationNumberVerificationCode {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.SendMediaMessage {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.SetAccountDefaultProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.SetMediaMessageSpendLimitOverride {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.SubmitRegistrationVersion {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.UpdateProtectConfiguration {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.UpdateProtectConfigurationCountryRuleSet {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.UpdateSenderId {3} - pinpointsmsvoicev2
PinpointSMSVoiceV2.VerifyDestinationNumber {3} - pinpointsmsvoicev2
ChimeSDKMediaPipelines.CreateMediaInsightsPipeline {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.CreateMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.CreateMediaPipelineKinesisVideoStreamPool {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.CreateMediaStreamPipeline {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.DeleteMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.DeleteMediaPipelineKinesisVideoStreamPool {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.GetMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.GetMediaPipelineKinesisVideoStreamPool {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.GetSpeakerSearchTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.GetVoiceToneAnalysisTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.ListMediaInsightsPipelineConfigurations {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.ListMediaPipelineKinesisVideoStreamPools {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.StartSpeakerSearchTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.StartVoiceToneAnalysisTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.StopSpeakerSearchTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.StopVoiceToneAnalysisTask {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineConfiguration {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.UpdateMediaInsightsPipelineStatus {3} - chimesdkmediapipelines
ChimeSDKMediaPipelines.UpdateMediaPipelineKinesisVideoStreamPool {3} - chimesdkmediapipelines
ConnectCases.BatchGetField {3} - connectcases
ConnectCases.BatchPutFieldOptions {3} - connectcases
ConnectCases.CreateCase {3} - connectcases
ConnectCases.CreateDomain {3} - connectcases
ConnectCases.CreateField {3} - connectcases
ConnectCases.CreateLayout {3} - connectcases
ConnectCases.CreateRelatedItem {3} - connectcases
ConnectCases.CreateTemplate {3} - connectcases
ConnectCases.DeleteDomain {3} - connectcases
ConnectCases.DeleteField {3} - connectcases
ConnectCases.DeleteLayout {3} - connectcases
ConnectCases.DeleteTemplate {3} - connectcases
ConnectCases.GetCase {3} - connectcases
ConnectCases.GetCaseAuditEvents {3} - connectcases
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
OpenSearchServerless.BatchGetEffectiveLifecyclePolicy {3} - opensearchserverless
OpenSearchServerless.BatchGetLifecyclePolicy {3} - opensearchserverless
OpenSearchServerless.BatchGetVpcEndpoint {3} - opensearchserverless
OpenSearchServerless.CreateAccessPolicy {3} - opensearchserverless
OpenSearchServerless.CreateCollection {3} - opensearchserverless
OpenSearchServerless.CreateLifecyclePolicy {3} - opensearchserverless
OpenSearchServerless.CreateSecurityConfig {3} - opensearchserverless
OpenSearchServerless.CreateSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.CreateVpcEndpoint {3} - opensearchserverless
OpenSearchServerless.DeleteAccessPolicy {3} - opensearchserverless
OpenSearchServerless.DeleteCollection {3} - opensearchserverless
OpenSearchServerless.DeleteLifecyclePolicy {3} - opensearchserverless
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
OpenSearchServerless.ListLifecyclePolicies {3} - opensearchserverless
OpenSearchServerless.ListSecurityConfigs {3} - opensearchserverless
OpenSearchServerless.ListSecurityPolicies {3} - opensearchserverless
OpenSearchServerless.ListTagsForResource {3} - opensearchserverless
OpenSearchServerless.ListVpcEndpoints {3} - opensearchserverless
OpenSearchServerless.TagResource {3} - opensearchserverless
OpenSearchServerless.UntagResource {3} - opensearchserverless
OpenSearchServerless.UpdateAccessPolicy {3} - opensearchserverless
OpenSearchServerless.UpdateAccountSettings {3} - opensearchserverless
OpenSearchServerless.UpdateCollection {3} - opensearchserverless
OpenSearchServerless.UpdateLifecyclePolicy {3} - opensearchserverless
OpenSearchServerless.UpdateSecurityConfig {3} - opensearchserverless
OpenSearchServerless.UpdateSecurityPolicy {3} - opensearchserverless
OpenSearchServerless.UpdateVpcEndpoint {3} - opensearchserverless
CodeCatalyst.CreateAccessToken {3} - codecatalyst
CodeCatalyst.CreateDevEnvironment {3} - codecatalyst
CodeCatalyst.CreateProject {3} - codecatalyst
CodeCatalyst.CreateSourceRepository {3} - codecatalyst
CodeCatalyst.CreateSourceRepositoryBranch {3} - codecatalyst
CodeCatalyst.DeleteAccessToken {3} - codecatalyst
CodeCatalyst.DeleteDevEnvironment {3} - codecatalyst
CodeCatalyst.DeleteProject {3} - codecatalyst
CodeCatalyst.DeleteSourceRepository {3} - codecatalyst
CodeCatalyst.DeleteSpace {3} - codecatalyst
CodeCatalyst.GetDevEnvironment {3} - codecatalyst
CodeCatalyst.GetProject {3} - codecatalyst
CodeCatalyst.GetSourceRepository {3} - codecatalyst
CodeCatalyst.GetSourceRepositoryCloneUrls {3} - codecatalyst
CodeCatalyst.GetSpace {3} - codecatalyst
CodeCatalyst.GetSubscription {3} - codecatalyst
CodeCatalyst.GetUserDetails {3} - codecatalyst
CodeCatalyst.GetWorkflow {3} - codecatalyst
CodeCatalyst.GetWorkflowRun {3} - codecatalyst
CodeCatalyst.ListAccessTokens {3} - codecatalyst
CodeCatalyst.ListDevEnvironmentSessions {3} - codecatalyst
CodeCatalyst.ListDevEnvironments {3} - codecatalyst
CodeCatalyst.ListEventLogs {3} - codecatalyst
CodeCatalyst.ListProjects {3} - codecatalyst
CodeCatalyst.ListSourceRepositories {3} - codecatalyst
CodeCatalyst.ListSourceRepositoryBranches {3} - codecatalyst
CodeCatalyst.ListSpaces {3} - codecatalyst
CodeCatalyst.ListWorkflowRuns {3} - codecatalyst
CodeCatalyst.ListWorkflows {3} - codecatalyst
CodeCatalyst.StartDevEnvironment {3} - codecatalyst
CodeCatalyst.StartDevEnvironmentSession {3} - codecatalyst
CodeCatalyst.StartWorkflowRun {3} - codecatalyst
CodeCatalyst.StopDevEnvironment {3} - codecatalyst
CodeCatalyst.StopDevEnvironmentSession {3} - codecatalyst
CodeCatalyst.UpdateDevEnvironment {3} - codecatalyst
CodeCatalyst.UpdateProject {3} - codecatalyst
CodeCatalyst.UpdateSpace {3} - codecatalyst
CodeCatalyst.VerifySession {3} - codecatalyst
SageMakerMetrics.BatchPutMetrics {3} - sagemakermetrics
KinesisVideoWebRTCStorage.JoinStorageSession {3} - kinesisvideowebrtcstorage
KinesisVideoWebRTCStorage.JoinStorageSessionAsViewer {3} - kinesisvideowebrtcstorage
IVSRealTime.CreateEncoderConfiguration {3} - ivsrealtime
IVSRealTime.CreateParticipantToken {3} - ivsrealtime
IVSRealTime.CreateStage {3} - ivsrealtime
IVSRealTime.CreateStorageConfiguration {3} - ivsrealtime
IVSRealTime.DeleteEncoderConfiguration {3} - ivsrealtime
IVSRealTime.DeletePublicKey {3} - ivsrealtime
IVSRealTime.DeleteStage {3} - ivsrealtime
IVSRealTime.DeleteStorageConfiguration {3} - ivsrealtime
IVSRealTime.DisconnectParticipant {3} - ivsrealtime
IVSRealTime.GetComposition {3} - ivsrealtime
IVSRealTime.GetEncoderConfiguration {3} - ivsrealtime
IVSRealTime.GetParticipant {3} - ivsrealtime
IVSRealTime.GetPublicKey {3} - ivsrealtime
IVSRealTime.GetStage {3} - ivsrealtime
IVSRealTime.GetStageSession {3} - ivsrealtime
IVSRealTime.GetStorageConfiguration {3} - ivsrealtime
IVSRealTime.ImportPublicKey {3} - ivsrealtime
IVSRealTime.ListCompositions {3} - ivsrealtime
IVSRealTime.ListEncoderConfigurations {3} - ivsrealtime
IVSRealTime.ListParticipantEvents {3} - ivsrealtime
IVSRealTime.ListParticipants {3} - ivsrealtime
IVSRealTime.ListPublicKeys {3} - ivsrealtime
IVSRealTime.ListStageSessions {3} - ivsrealtime
IVSRealTime.ListStages {3} - ivsrealtime
IVSRealTime.ListStorageConfigurations {3} - ivsrealtime
IVSRealTime.ListTagsForResource {3} - ivsrealtime
IVSRealTime.StartComposition {3} - ivsrealtime
IVSRealTime.StopComposition {3} - ivsrealtime
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
VerifiedPermissions.BatchIsAuthorizedWithToken {3} - verifiedpermissions
Neptunedata.CancelGremlinQuery {3} - neptunedata
Neptunedata.CancelLoaderJob {3} - neptunedata
Neptunedata.CancelMLDataProcessingJob {3} - neptunedata
Neptunedata.CancelMLModelTrainingJob {3} - neptunedata
Neptunedata.CancelMLModelTransformJob {3} - neptunedata
Neptunedata.CancelOpenCypherQuery {3} - neptunedata
Neptunedata.CreateMLEndpoint {3} - neptunedata
Neptunedata.DeleteMLEndpoint {3} - neptunedata
Neptunedata.DeletePropertygraphStatistics {3} - neptunedata
Neptunedata.DeleteSparqlStatistics {3} - neptunedata
Neptunedata.ExecuteFastReset {3} - neptunedata
Neptunedata.ExecuteGremlinExplainQuery {3} - neptunedata
Neptunedata.ExecuteGremlinProfileQuery {3} - neptunedata
Neptunedata.ExecuteGremlinQuery {3} - neptunedata
Neptunedata.ExecuteOpenCypherExplainQuery {3} - neptunedata
Neptunedata.ExecuteOpenCypherQuery {3} - neptunedata
Neptunedata.GetEngineStatus {3} - neptunedata
Neptunedata.GetGremlinQueryStatus {3} - neptunedata
Neptunedata.GetLoaderJobStatus {3} - neptunedata
Neptunedata.GetMLDataProcessingJob {3} - neptunedata
Neptunedata.GetMLEndpoint {3} - neptunedata
Neptunedata.GetMLModelTrainingJob {3} - neptunedata
Neptunedata.GetMLModelTransformJob {3} - neptunedata
Neptunedata.GetOpenCypherQueryStatus {3} - neptunedata
Neptunedata.GetPropertygraphStatistics {3} - neptunedata
Neptunedata.GetPropertygraphStream {3} - neptunedata
Neptunedata.GetPropertygraphSummary {3} - neptunedata
Neptunedata.GetRDFGraphSummary {3} - neptunedata
Neptunedata.GetSparqlStatistics {3} - neptunedata
Neptunedata.GetSparqlStream {3} - neptunedata
Neptunedata.ListGremlinQueries {3} - neptunedata
Neptunedata.ListLoaderJobs {3} - neptunedata
Neptunedata.ListMLDataProcessingJobs {3} - neptunedata
Neptunedata.ListMLEndpoints {3} - neptunedata
Neptunedata.ListMLModelTrainingJobs {3} - neptunedata
Neptunedata.ListMLModelTransformJobs {3} - neptunedata
Neptunedata.ListOpenCypherQueries {3} - neptunedata
Neptunedata.ManagePropertygraphStatistics {3} - neptunedata
Neptunedata.ManageSparqlStatistics {3} - neptunedata
Neptunedata.StartLoaderJob {3} - neptunedata
Neptunedata.StartMLDataProcessingJob {3} - neptunedata
Neptunedata.StartMLModelTrainingJob {3} - neptunedata
Neptunedata.StartMLModelTransformJob {3} - neptunedata
BedrockRuntime.Converse {3} - bedrock
BedrockRuntime.ConverseStream {3} - bedrock
QConnect.CreateAssistant {3} - qconnect
QConnect.CreateAssistantAssociation {3} - qconnect
QConnect.CreateContent {3} - qconnect
QConnect.CreateContentAssociation {3} - qconnect
QConnect.CreateKnowledgeBase {3} - qconnect
QConnect.CreateQuickResponse {3} - qconnect
QConnect.CreateSession {3} - qconnect
QConnect.DeleteAssistant {3} - qconnect
QConnect.DeleteAssistantAssociation {3} - qconnect
QConnect.DeleteContent {3} - qconnect
QConnect.DeleteContentAssociation {3} - qconnect
QConnect.DeleteImportJob {3} - qconnect
QConnect.DeleteKnowledgeBase {3} - qconnect
QConnect.DeleteQuickResponse {3} - qconnect
QConnect.GetAssistant {3} - qconnect
QConnect.GetAssistantAssociation {3} - qconnect
QConnect.GetContent {3} - qconnect
QConnect.GetContentAssociation {3} - qconnect
QConnect.GetContentSummary {3} - qconnect
QConnect.GetImportJob {3} - qconnect
QConnect.GetKnowledgeBase {3} - qconnect
QConnect.GetQuickResponse {3} - qconnect
QConnect.GetRecommendations {3} - qconnect
QConnect.GetSession {3} - qconnect
QConnect.ListAssistantAssociations {3} - qconnect
QConnect.ListAssistants {3} - qconnect
QConnect.ListContentAssociations {3} - qconnect
QConnect.ListContents {3} - qconnect
QConnect.ListImportJobs {3} - qconnect
QConnect.ListKnowledgeBases {3} - qconnect
QConnect.ListQuickResponses {3} - qconnect
QConnect.ListTagsForResource {3} - qconnect
QConnect.NotifyRecommendationsReceived {3} - qconnect
QConnect.PutFeedback {3} - qconnect
QConnect.QueryAssistant {3} - qconnect
QConnect.RemoveKnowledgeBaseTemplateUri {3} - qconnect
QConnect.SearchContent {3} - qconnect
QConnect.SearchQuickResponses {3} - qconnect
QConnect.SearchSessions {3} - qconnect
QConnect.StartContentUpload {3} - qconnect
QConnect.StartImportJob {3} - qconnect
QConnect.TagResource {3} - qconnect
QConnect.UntagResource {3} - qconnect
QConnect.UpdateContent {3} - qconnect
QConnect.UpdateKnowledgeBaseTemplateUri {3} - qconnect
QConnect.UpdateQuickResponse {3} - qconnect
QConnect.UpdateSession {3} - qconnect
SupplyChain.CreateBillOfMaterialsImportJob {3} - supplychain
SupplyChain.GetBillOfMaterialsImportJob {3} - supplychain
SupplyChain.SendDataIntegrationEvent {3} - supplychain
MailManager.CreateAddonInstance {3} - mailmanager
MailManager.CreateAddonSubscription {3} - mailmanager
MailManager.CreateArchive {3} - mailmanager
MailManager.CreateIngressPoint {3} - mailmanager
MailManager.CreateRelay {3} - mailmanager
MailManager.CreateRuleSet {3} - mailmanager
MailManager.CreateTrafficPolicy {3} - mailmanager
MailManager.DeleteAddonInstance {3} - mailmanager
MailManager.DeleteAddonSubscription {3} - mailmanager
MailManager.DeleteArchive {3} - mailmanager
MailManager.DeleteIngressPoint {3} - mailmanager
MailManager.DeleteRelay {3} - mailmanager
MailManager.DeleteRuleSet {3} - mailmanager
MailManager.DeleteTrafficPolicy {3} - mailmanager
MailManager.GetAddonInstance {3} - mailmanager
MailManager.GetAddonSubscription {3} - mailmanager
MailManager.GetArchive {3} - mailmanager
MailManager.GetArchiveExport {3} - mailmanager
MailManager.GetArchiveMessage {3} - mailmanager
MailManager.GetArchiveMessageContent {3} - mailmanager
MailManager.GetArchiveSearch {3} - mailmanager
MailManager.GetArchiveSearchResults {3} - mailmanager
MailManager.GetIngressPoint {3} - mailmanager
MailManager.GetRelay {3} - mailmanager
MailManager.GetRuleSet {3} - mailmanager
MailManager.GetTrafficPolicy {3} - mailmanager
MailManager.ListAddonInstances {3} - mailmanager
MailManager.ListAddonSubscriptions {3} - mailmanager
MailManager.ListArchiveExports {3} - mailmanager
MailManager.ListArchiveSearches {3} - mailmanager
MailManager.ListArchives {3} - mailmanager
MailManager.ListIngressPoints {3} - mailmanager
MailManager.ListRelays {3} - mailmanager
MailManager.ListRuleSets {3} - mailmanager
MailManager.ListTagsForResource {3} - mailmanager
MailManager.ListTrafficPolicies {3} - mailmanager
MailManager.StartArchiveExport {3} - mailmanager
MailManager.StartArchiveSearch {3} - mailmanager
MailManager.StopArchiveExport {3} - mailmanager
MailManager.StopArchiveSearch {3} - mailmanager
MailManager.TagResource {3} - mailmanager
MailManager.UntagResource {3} - mailmanager
MailManager.UpdateArchive {3} - mailmanager
MailManager.UpdateIngressPoint {3} - mailmanager
MailManager.UpdateRelay {3} - mailmanager
MailManager.UpdateRuleSet {3} - mailmanager
MailManager.UpdateTrafficPolicy {3} - mailmanager
TaxSettings.BatchDeleteTaxRegistration {3} - taxsettings
TaxSettings.BatchPutTaxRegistration {3} - taxsettings
TaxSettings.DeleteTaxRegistration {3} - taxsettings
TaxSettings.GetTaxRegistration {3} - taxsettings
TaxSettings.GetTaxRegistrationDocument {3} - taxsettings
TaxSettings.ListTaxRegistrations {3} - taxsettings
TaxSettings.PutTaxRegistration {3} - taxsettings
QApps.UpdateLibraryItemMetadata {3} - qapps
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
