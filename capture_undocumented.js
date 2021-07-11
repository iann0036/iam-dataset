// a fuzzer for undocumented params

const AWS = require('aws-sdk');
const fetch = require('node-fetch');

var credentials = new AWS.SharedIniFileCredentials({profile: 'nothing'});
AWS.config.credentials = credentials;
AWS.config.region = 'us-east-1';

var long_undocumented_test_list = `
AppStream.CreateUpdatedImage
AutoScaling.GetPredictiveScalingForecast
CloudDirectory.GetAppliedSchemaVersion
CloudDirectory.UpgradeAppliedSchema
CloudDirectory.UpgradePublishedSchema
CloudFormation.ActivateType
CloudFormation.BatchDescribeTypeConfigurations
CloudFormation.DeactivateType
CloudFormation.DescribePublisher
CloudFormation.PublishType
CloudFormation.RegisterPublisher
CloudFormation.SetTypeConfiguration
CloudFormation.TestType
CloudFront.AssociateAlias
CloudFront.ListConflictingAliases
CloudWatchEvents.CreateApiDestination
CloudWatchEvents.CreateConnection
CloudWatchEvents.DeauthorizeConnection
CloudWatchEvents.DeleteApiDestination
CloudWatchEvents.DeleteConnection
CloudWatchEvents.DescribeApiDestination
CloudWatchEvents.DescribeConnection
CloudWatchEvents.ListApiDestinations
CloudWatchEvents.ListConnections
CloudWatchEvents.UpdateApiDestination
CloudWatchEvents.UpdateConnection
CloudWatchLogs.DeleteQueryDefinition
CloudWatchLogs.DescribeQueryDefinitions
CloudWatchLogs.PutQueryDefinition
CodePipeline.GetActionType
CodePipeline.UpdateActionType
CognitoIdentityServiceProvider.RevokeToken
ConfigService.DescribeAggregateComplianceByConformancePacks
ConfigService.GetAggregateConformancePackComplianceSummary
DirectConnect.AssociateMacSecKey
DirectConnect.DisassociateMacSecKey
DirectConnect.UpdateConnection
DirectoryService.AddRegion
DirectoryService.DescribeRegions
DirectoryService.DisableClientAuthentication
DirectoryService.EnableClientAuthentication
DirectoryService.RemoveRegion
DMS.DescribeEndpointSettings
DMS.DescribePendingMaintenanceActions
DynamoDB.DescribeEndpoints
EC2.AssociateTrunkInterface
EC2.DescribeSecurityGroupRules
EC2.DescribeTrunkInterfaceAssociations
EC2.DisassociateTrunkInterface
EC2.ModifySecurityGroupRules
EFS.DescribeAccountPreferences
EFS.PutAccountPreferences
ElasticBeanstalk.UpdateTagsForResource
EMR.CreateStudio
EMR.CreateStudioSessionMapping
EMR.DeleteStudio
EMR.DeleteStudioSessionMapping
EMR.DescribeNotebookExecution
EMR.DescribeStudio
EMR.GetStudioSessionMapping
EMR.ListNotebookExecutions
EMR.ListStudioSessionMappings
EMR.ListStudios
EMR.SetVisibleToAllUsers
EMR.StartNotebookExecution
EMR.StopNotebookExecution
EMR.UpdateStudio
EMR.UpdateStudioSessionMapping
ES.DescribeDomainAutoTunes
Pinpoint.GetApplicationDateRangeKpi
Pinpoint.GetCampaignDateRangeKpi
Pinpoint.GetJourneyDateRangeKpi
Pinpoint.GetJourneyExecutionActivityMetrics
Pinpoint.GetJourneyExecutionMetrics
Pinpoint.PhoneNumberValidate
Redshift.AddPartner
Redshift.AuthorizeEndpointAccess
Redshift.CreateEndpointAccess
Redshift.DeleteEndpointAccess
Redshift.DeletePartner
Redshift.DescribeEndpointAccess
Redshift.DescribeEndpointAuthorization
Redshift.DescribePartners
Redshift.ModifyEndpointAccess
Redshift.RevokeEndpointAccess
Redshift.UpdatePartnerStatus
S3.DeleteBucketIntelligentTieringConfiguration
S3.ListBucketIntelligentTieringConfigurations
S3.WriteGetObjectResponse
S3Control.CreateAccessPointForObjectLambda
S3Control.CreateJob
S3Control.DeleteAccessPointForObjectLambda
S3Control.DeleteAccessPointPolicyForObjectLambda
S3Control.DeletePublicAccessBlock
S3Control.DescribeJob
S3Control.GetAccessPointConfigurationForObjectLambda
S3Control.GetAccessPointForObjectLambda
S3Control.GetAccessPointPolicyForObjectLambda
S3Control.GetAccessPointPolicyStatusForObjectLambda
S3Control.GetPublicAccessBlock
S3Control.ListAccessPointsForObjectLambda
S3Control.ListJobs
S3Control.PutAccessPointConfigurationForObjectLambda
S3Control.PutAccessPointPolicyForObjectLambda
S3Control.PutBucketLifecycleConfiguration
S3Control.PutPublicAccessBlock
Snowball.CreateLongTermPricing
Snowball.ListLongTermPricing
Snowball.UpdateLongTermPricing
SSM.UnlabelParameterVersion
MigrationHub.ListApplicationStates
CloudHSMV2.ModifyBackupAttributes
CloudHSMV2.ModifyCluster
Glue.UpdateColumnStatisticsForPartition
Glue.UpdateColumnStatisticsForTable
MediaLive.CreatePartnerInput
SageMaker.SendPipelineExecutionStepFailure
SageMaker.SendPipelineExecutionStepSuccess
AlexaForBusiness.AssociateDeviceWithNetworkProfile
AlexaForBusiness.CreateGatewayGroup
AlexaForBusiness.CreateNetworkProfile
AlexaForBusiness.DeleteDeviceUsageData
AlexaForBusiness.DeleteGatewayGroup
AlexaForBusiness.DeleteNetworkProfile
AlexaForBusiness.GetGateway
AlexaForBusiness.GetGatewayGroup
AlexaForBusiness.GetInvitationConfiguration
AlexaForBusiness.ListGatewayGroups
AlexaForBusiness.ListGateways
AlexaForBusiness.PutInvitationConfiguration
AlexaForBusiness.SendAnnouncement
AlexaForBusiness.UpdateGateway
AlexaForBusiness.UpdateGatewayGroup
AlexaForBusiness.UpdateNetworkProfile
ServiceDiscovery.UpdateHttpNamespace
ServiceDiscovery.UpdatePrivateDnsNamespace
ServiceDiscovery.UpdatePublicDnsNamespace
MediaTailor.CreateChannel
MediaTailor.CreateProgram
MediaTailor.CreateSourceLocation
MediaTailor.CreateVodSource
MediaTailor.DeleteChannel
MediaTailor.DeleteChannelPolicy
MediaTailor.DeleteProgram
MediaTailor.DeleteSourceLocation
MediaTailor.DeleteVodSource
MediaTailor.DescribeChannel
MediaTailor.DescribeProgram
MediaTailor.DescribeSourceLocation
MediaTailor.DescribeVodSource
MediaTailor.GetChannelPolicy
MediaTailor.GetChannelSchedule
MediaTailor.ListAlerts
MediaTailor.ListChannels
MediaTailor.ListSourceLocations
MediaTailor.ListVodSources
MediaTailor.PutChannelPolicy
MediaTailor.StartChannel
MediaTailor.StopChannel
MediaTailor.UpdateChannel
MediaTailor.UpdateSourceLocation
MediaTailor.UpdateVodSource
PinpointEmail.GetDomainDeliverabilityCampaign
PinpointEmail.ListDomainDeliverabilityCampaigns
QuickSight.CreateFolder
QuickSight.CreateFolderMembership
QuickSight.DeleteFolder
QuickSight.DeleteFolderMembership
QuickSight.DescribeFolder
QuickSight.DescribeFolderPermissions
QuickSight.DescribeFolderResolvedPermissions
QuickSight.ListFolderMembers
QuickSight.ListFolders
QuickSight.SearchFolders
QuickSight.UpdateFolder
QuickSight.UpdateFolderPermissions
RDSDataService.BatchExecuteStatement
RDSDataService.BeginTransaction
RDSDataService.CommitTransaction
RDSDataService.ExecuteSql
RDSDataService.ExecuteStatement
RDSDataService.RollbackTransaction
DataSync.UpdateLocationNfs
DataSync.UpdateLocationObjectStorage
DataSync.UpdateLocationSmb
Transfer.CreateAccess
Transfer.DeleteAccess
Transfer.DescribeAccess
Transfer.ListAccesses
Transfer.UpdateAccess
KinesisAnalyticsV2.CreateApplicationPresignedUrl
KinesisAnalyticsV2.DescribeApplicationVersion
KinesisAnalyticsV2.ListApplicationVersions
KinesisAnalyticsV2.RollbackApplication
KinesisAnalyticsV2.UpdateApplicationMaintenanceConfiguration
ApiGatewayManagementApi.DeleteConnection
ApiGatewayManagementApi.GetConnection
ApiGatewayManagementApi.PostToConnection
DocDB.AddSourceIdentifierToSubscription
DocDB.CreateEventSubscription
DocDB.CreateGlobalCluster
DocDB.DeleteEventSubscription
DocDB.DeleteGlobalCluster
DocDB.DescribeEventSubscriptions
DocDB.DescribeGlobalClusters
DocDB.ModifyEventSubscription
DocDB.ModifyGlobalCluster
DocDB.RemoveFromGlobalCluster
DocDB.RemoveSourceIdentifierFromSubscription
MediaPackageVod.ConfigureLogs
IoTEvents.DescribeDetectorModelAnalysis
IoTEvents.GetDetectorModelAnalysisResults
IoTEvents.StartDetectorModelAnalysis
IoTEventsData.BatchAcknowledgeAlarm
IoTEventsData.BatchDisableAlarm
IoTEventsData.BatchEnableAlarm
IoTEventsData.BatchResetAlarm
IoTEventsData.BatchSnoozeAlarm
IoTEventsData.DescribeAlarm
IoTEventsData.ListAlarms
Personalize.CreateDatasetExportJob
Personalize.DescribeDatasetExportJob
Personalize.ListDatasetExportJobs
Personalize.StopSolutionVersionCreation
EventBridge.CreateApiDestination
EventBridge.CreateConnection
EventBridge.DeauthorizeConnection
EventBridge.DeleteApiDestination
EventBridge.DeleteConnection
EventBridge.DescribeApiDestination
EventBridge.DescribeConnection
EventBridge.ListApiDestinations
EventBridge.ListConnections
EventBridge.UpdateApiDestination
EventBridge.UpdateConnection
LakeFormation.AddLFTagsToResource
LakeFormation.CreateLFTag
LakeFormation.DeleteLFTag
LakeFormation.GetLFTag
LakeFormation.GetResourceLFTags
LakeFormation.ListLFTags
LakeFormation.RemoveLFTagsFromResource
LakeFormation.SearchDatabasesByLFTags
LakeFormation.SearchTablesByLFTags
LakeFormation.UpdateLFTag
ForecastService.DeleteResourceTree
ForecastService.StopResource
WorkMailMessageFlow.PutRawMessageContent
SSO.GetRoleCredentials
SSO.ListAccountRoles
SSO.ListAccounts
SSO.Logout
SSOOIDC.CreateToken
SSOOIDC.RegisterClient
SSOOIDC.StartDeviceAuthorization
SESV2.CreateContact
SESV2.CreateContactList
SESV2.CreateCustomVerificationEmailTemplate
SESV2.CreateEmailIdentityPolicy
SESV2.CreateEmailTemplate
SESV2.CreateImportJob
SESV2.DeleteContact
SESV2.DeleteContactList
SESV2.DeleteEmailIdentityPolicy
SESV2.DeleteEmailTemplate
SESV2.DeleteSuppressedDestination
SESV2.GetContact
SESV2.GetContactList
SESV2.GetDomainDeliverabilityCampaign
SESV2.GetEmailIdentityPolicies
SESV2.GetEmailTemplate
SESV2.GetImportJob
SESV2.GetSuppressedDestination
SESV2.ListContactLists
SESV2.ListContacts
SESV2.ListDomainDeliverabilityCampaigns
SESV2.ListEmailTemplates
SESV2.ListImportJobs
SESV2.ListSuppressedDestinations
SESV2.PutAccountDetails
SESV2.PutAccountSuppressionAttributes
SESV2.PutConfigurationSetSuppressionOptions
SESV2.PutEmailIdentityConfigurationSetAttributes
SESV2.PutEmailIdentityDkimSigningAttributes
SESV2.PutSuppressedDestination
SESV2.SendBulkEmail
SESV2.TestRenderEmailTemplate
SESV2.UpdateContact
SESV2.UpdateContactList
SESV2.UpdateEmailIdentityPolicy
SESV2.UpdateEmailTemplate
ConnectParticipant.CompleteAttachmentUpload
ConnectParticipant.CreateParticipantConnection
ConnectParticipant.DisconnectParticipant
ConnectParticipant.GetAttachment
ConnectParticipant.GetTranscript
ConnectParticipant.SendEvent
ConnectParticipant.SendMessage
ConnectParticipant.StartAttachmentUpload
Kendra.BatchGetDocumentStatus
IoTSiteWise.DescribeStorageConfiguration
IoTSiteWise.GetInterpolatedAssetPropertyValues
IoTSiteWise.PutStorageConfiguration
ServiceCatalogAppRegistry.CreateApplication
ServiceCatalogAppRegistry.UpdateApplication
AmplifyBackend.ImportBackendAuth
ConnectContactLens.ListRealtimeContactAnalysisSegments
SageMakerFeatureStoreRuntime.BatchGetRecord
CustomerProfiles.GetMatches
CustomerProfiles.MergeProfiles
GreengrassV2.BatchAssociateClientDeviceWithCoreDevice
GreengrassV2.BatchDisassociateClientDeviceFromCoreDevice
GreengrassV2.GetComponentVersionArtifact
GreengrassV2.ListClientDevicesAssociatedWithCoreDevice
GreengrassV2.ResolveComponentCandidates
Location.BatchDeleteDevicePositionHistory
Location.CalculateRoute
Location.CreateRouteCalculator
Location.DeleteRouteCalculator
Location.DescribeRouteCalculator
Location.ListDevicePositions
Location.ListRouteCalculators
Location.ListTagsForResource
Location.TagResource
Location.UntagResource
LexModelsV2.CreateExport
LexModelsV2.CreateResourcePolicy
LexModelsV2.CreateResourcePolicyStatement
LexModelsV2.CreateUploadUrl
LexModelsV2.DeleteExport
LexModelsV2.DeleteImport
LexModelsV2.DeleteResourcePolicy
LexModelsV2.DeleteResourcePolicyStatement
LexModelsV2.DescribeExport
LexModelsV2.DescribeImport
LexModelsV2.DescribeResourcePolicy
LexModelsV2.ListExports
LexModelsV2.ListImports
LexModelsV2.StartImport
LexModelsV2.UpdateExport
LexModelsV2.UpdateResourcePolicy
LexRuntimeV2.RecognizeUtterance
Finspace.CreateEnvironment
Finspace.DeleteEnvironment
Finspace.GetEnvironment
Finspace.ListEnvironments
Finspace.ListTagsForResource
Finspace.TagResource
Finspace.UntagResource
Finspace.UpdateEnvironment
Finspacedata.CreateChangeset
Finspacedata.GetProgrammaticAccessCredentials
Finspacedata.GetWorkingLocation
SSMContacts.GetContactPolicy
SSMContacts.ListTagsForResource
SSMContacts.TagResource
SSMContacts.UntagResource
Proton.AcceptEnvironmentAccountConnection
Proton.CancelEnvironmentDeployment
Proton.CancelServiceInstanceDeployment
Proton.CancelServicePipelineDeployment
Proton.CreateEnvironmentAccountConnection
Proton.CreateEnvironmentTemplateVersion
Proton.CreateServiceTemplateVersion
Proton.DeleteEnvironmentAccountConnection
Proton.DeleteEnvironmentTemplateVersion
Proton.DeleteServiceTemplateVersion
Proton.GetAccountSettings
Proton.GetEnvironmentAccountConnection
Proton.GetEnvironmentTemplateVersion
Proton.GetServiceTemplateVersion
Proton.ListEnvironmentAccountConnections
Proton.ListEnvironmentTemplateVersions
Proton.ListServiceTemplateVersions
Proton.RejectEnvironmentAccountConnection
Proton.UpdateAccountSettings
Proton.UpdateEnvironmentAccountConnection
Proton.UpdateEnvironmentTemplateVersion
Proton.UpdateServiceTemplateVersion
EMR.AddInstanceFleet
EMR.AddInstanceGroups
EMR.ModifyInstanceGroups
SSM.GetInventory
SSM.GetOpsSummary
CostExplorer.CreateAnomalyMonitor
CostExplorer.CreateCostCategoryDefinition
CostExplorer.GetCostAndUsage
CostExplorer.GetCostAndUsageWithResources
CostExplorer.GetCostCategories
CostExplorer.GetCostForecast
CostExplorer.GetDimensionValues
CostExplorer.GetReservationCoverage
CostExplorer.GetReservationPurchaseRecommendation
CostExplorer.GetReservationUtilization
CostExplorer.GetRightsizingRecommendation
CostExplorer.GetSavingsPlansCoverage
CostExplorer.GetSavingsPlansPurchaseRecommendation
CostExplorer.GetSavingsPlansUtilization
CostExplorer.GetSavingsPlansUtilizationDetails
CostExplorer.GetTags
CostExplorer.GetUsageForecast
CostExplorer.UpdateCostCategoryDefinition
SageMaker.Search
Kendra.Query
EMRcontainers.StartJobRun
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
