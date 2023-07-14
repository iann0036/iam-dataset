const fetch = require('node-fetch');
const fs = require('fs');

async function x() {
    var packagedata = await fetch('https://raw.githubusercontent.com/aws/aws-sdk-js/master/package.json');
    var package = await packagedata.json();
    var out = {};

    var sdkmetadatadata = await fetch(`https://5jts1lgtk8.execute-api.ap-southeast-2.amazonaws.com/metadataproxy/${package['version']}`);
    sdkmetadata = await sdkmetadatadata.json();

    for (var sdkmetadataservice of sdkmetadata['services']) {
        var svcname = sdkmetadataservice['name'].split(".")[1];
        var shortname = sdkmetadataservice['prefix'] || sdkmetadataservice['identifier'];
        var version = sdkmetadataservice['versions'][sdkmetadataservice['versions'].length - 1];

        try {
            var REPLACESHORTNAME = {
                'acmpca': 'acm-pca',
                'applicationautoscaling': 'application-autoscaling',
                'applicationinsights': 'application-insights',
                'augmentedairuntime': 'sagemaker-a2i-runtime',
                'autoscalingplans': 'autoscaling-plans',
                'cloudwatch': 'monitoring',
                'cloudwatchevents': 'events',
                'cloudwatchlogs': 'logs',
                'codegurureviewer': 'codeguru-reviewer',
                'codestarconnections': 'codestar-connections',
                'codestarnotifications': 'codestar-notifications',
                'cognitoidentity': 'cognito-identity',
                'cognitoidentityserviceprovider': 'cognito-idp',
                'cognitosync': 'cognito-sync',
                'computeoptimizer': 'compute-optimizer',
                'configservice': 'config',
                'connectcontactlens': 'connect-contact-lens',
                'costexplorer': 'ce',
                'customerprofiles': 'customer-profiles',
                'devopsguru': 'devops-guru',
                'directoryservice': 'ds',
                'dynamodbstreams': 'streams.dynamodb',
                'ec2instanceconnect': 'ec2-instance-connect',
                'ecrpublic': 'ecr-public',
                'efs': 'elasticfilesystem',
                'elasticinference': 'elastic-inference',
                'elb': 'elasticloadbalancing',
                'elbv2': 'elasticloadbalancingv2',
                'emr': 'elasticmapreduce',
                'emrcontainers': 'emr-containers',
                'forecastqueryservice': 'forecastquery',
                'forecastservice': 'forecast',
                'iot1clickdevicesservice': 'iot1click-devices',
                'iot1clickprojects': 'iot1click-projects',
                'iotdata': 'iot-data',
                'ioteventsdata': 'iotevents-data',
                'iotjobsdataplane': 'iot-jobs-data',
                'kinesisvideoarchivedmedia': 'kinesis-video-archived-media',
                'kinesisvideomedia': 'kinesis-video-media',
                'kinesisvideosignalingchannels': 'kinesis-video-signaling',
                'lexmodelbuildingservice': 'lex-models',
                'lexmodelsv2': 'models.lex.v2',
                'lexruntime': 'runtime.lex',
                'lexruntimev2': 'runtime.lex.v2',
                'licensemanager': 'license-manager',
                'marketplacecatalog': 'marketplace-catalog',
                'marketplaceentitlementservice': 'entitlement.marketplace',
                'marketplacemetering': 'meteringmarketplace',
                'mediapackagevod': 'mediapackage-vod',
                'mediastoredata': 'mediastore-data',
                'migrationhub': 'AWSMigrationHub',
                'migrationhubconfig': 'migrationhub-config',
                'mturk': 'mturk-requester',
                'networkfirewall': 'network-firewall',
                'personalizeevents': 'personalize-events',
                'personalizeruntime': 'personalize-runtime',
                'pinpointemail': 'pinpoint-email',
                'pinpointsmsvoice': 'sms-voice',
                'qldbsession': 'qldb-session',
                'rdsdataservice': 'rds-data',
                'redshiftdata': 'redshift-data',
                'resourcegroups': 'resource-groups',
                'sagemakeredge': 'sagemaker-edge',
                'sagemakerfeaturestoreruntime': 'sagemaker-featurestore-runtime',
                'sagemakerruntime': 'runtime.sagemaker',
                'serverlessapplicationrepository': 'serverlessrepo',
                'servicecatalogappregistry': 'servicecatalog-appregistry',
                'servicequotas': 'service-quotas',
                'ses': 'email',
                'simpledb': 'sdb',
                'ssoadmin': 'sso-admin',
                'ssooidc': 'sso-oidc',
                'stepfunctions': 'states',
                'timestreamquery': 'timestream-query',
                'timestreamwrite': 'timestream-write',
                'transcribeservice': 'transcribe',
                'wafregional': 'waf-regional',
                'finspacedata': 'finspace-data',
                'ssmcontacts': 'ssm-contacts',
                'ssmincidents': 'ssm-incidents',
                'route53recoverycluster': 'route53-recovery-cluster',
                'route53recoverycontrolconfig': 'route53-recovery-control-config',
                'route53recoveryreadiness': 'route53-recovery-readiness',
                'chimesdkidentity': 'chime-sdk-identity',
                'chimesdkmessaging': 'chime-sdk-messaging',
                'snowdevicemanagement': 'snow-device-management',
                'voiceid': 'voice-id',
                'chimesdkmeetings': 'chime-sdk-meetings',
                'migrationhubrefactorspaces': 'migration-hub-refactor-spaces',
                'backupgateway': 'backup-gateway',
                'workspacesweb': 'workspaces-web',
                'emrserverless': 'emr-serverless',
                'chimesdkmediapipelines': 'chime-sdk-media-pipelines',
                'licensemanagerusersubscriptions': 'license-manager-user-subscriptions',
                'redshiftserverless': 'redshift-serverless',
                'pinpointsmsvoicev2': 'pinpoint-sms-voice-v2',
                'supportapp': 'support-app',
                'resourceexplorer2': 'resource-explorer-2',
                'chimesdkvoice': 'chime-sdk-voice',
                'iotroborunner': 'iot-roborunner',
                'ssmsap': 'ssm-sap',
                'arczonalshift': 'arc-zonal-shift',
                'docdbelastic': 'docdb-elastic',
                'sagemakergeospatial': 'sagemaker-geospatial',
                'kinesisvideowebrtcstorage': 'kinesis-video-webrtc-storage',
                'licensemanagerlinuxsubscriptions': 'license-manager-linux-subscriptions',
                'kendraranking': 'kendra-ranking',
                'cloudtraildata': 'cloudtrail-data',
                'ivsrealtime': 'ivs-realtime',
                'vpclattice': 'vpc-lattice',
                'sagemakermetrics': 'sagemaker-metrics',
                'paymentcryptography': 'payment-cryptography',
                'paymentcryptographydata': 'payment-cryptography-data',
                'codegurusecurity': 'codeguru-security'
            };
            var sdkshortname = shortname;
            if (REPLACESHORTNAME[shortname]) {
                sdkshortname = REPLACESHORTNAME[shortname];
            }

            var sdkdatatxt = await fetch(`https://raw.githubusercontent.com/aws/aws-sdk-js/master/apis/${sdkshortname}-${version}.normal.json`);
            var sdkdata = await sdkdatatxt.json();

            for (var op of Object.keys(sdkdata["operations"])) {
                var actionname = svcname + "." + op;


                out[actionname] = sdkdata["operations"][op]["documentation"];
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    fs.writeFileSync('docs.json', JSON.stringify(out))
}

x();
