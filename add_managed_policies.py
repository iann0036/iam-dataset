# https://github.com/z0ph/MAMIP.git

import os
import json
import re

PRIVESC_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "iam:passrole",
    "iam:createpolicyversion",
    "iam:setdefaultpolicyversion",
    "iam:createaccesskey",
    "iam:createloginprofile",
    "iam:updateloginprofile",
    "iam:attachuserpolicy",
    "iam:attachgrouppolicy",
    "iam:attachrolepolicy",
    "iam:putuserpolicy",
    "iam:putgrouppolicy",
    "iam:putrolepolicy",
    "iam:addusertogroup",
    "iam:updateassumerolepolicy",
    "iam:createservicelinkedrole",
    "iam:createvirtualmfadevice",
    "iam:resyncmfadevice",
    "iam:enablemfadevice",
    "glue:updatedevendpoint",
    "codestar:createproject",
    "codestar:associateteammember"
]

RESEXPOSURE_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "acm-pca:createpermission",
    "acm-pca:deletepermission",
    "acm-pca:deletepolicy",
    "acm-pca:putpolicy",
    "apigateway:updaterestapipolicy",
    "backup:deletebackupvaultaccesspolicy",
    "backup:putbackupvaultaccesspolicy",
    "chime:deletevoiceconnectorterminationcredentials",
    "chime:putvoiceconnectorterminationcredentials",
    "cloudformation:setstackpolicy",
    "cloudsearch:updateserviceaccesspolicies",
    "codeartifact:deletedomainpermissionspolicy",
    "codeartifact:deleterepositorypermissionspolicy",
    "codebuild:deleteresourcepolicy",
    "codebuild:deletesourcecredentials",
    "codebuild:importsourcecredentials",
    "codebuild:putresourcepolicy",
    "codeguru-profiler:putpermission",
    "codeguru-profiler:removepermission",
    "codestar:associateteammember",
    "codestar:createproject",
    "codestar:deleteproject",
    "codestar:disassociateteammember",
    "codestar:updateteammember",
    "cognito-identity:createidentitypool",
    "cognito-identity:deleteidentities",
    "cognito-identity:deleteidentitypool",
    "cognito-identity:getid",
    "cognito-identity:mergedeveloperidentities",
    "cognito-identity:setidentitypoolroles",
    "cognito-identity:unlinkdeveloperidentity",
    "cognito-identity:unlinkidentity",
    "cognito-identity:updateidentitypool",
    "deeplens:associateserviceroletoaccount",
    "ds:createconditionalforwarder",
    "ds:createdirectory",
    "ds:createmicrosoftad",
    "ds:createtrust",
    "ds:sharedirectory",
    "ec2:createnetworkinterfacepermission",
    "ec2:deletenetworkinterfacepermission",
    "ec2:modifysnapshotattribute",
    "ec2:modifyvpcendpointservicepermissions",
    "ec2:resetsnapshotattribute",
    "ecr:deleterepositorypolicy",
    "ecr:setrepositorypolicy",
    "elasticfilesystem:deletefilesystempolicy",
    "elasticfilesystem:putfilesystempolicy",
    "elasticmapreduce:putblockpublicaccessconfiguration",
    "es:createelasticsearchdomain",
    "es:updateelasticsearchdomainconfig",
    "glacier:abortvaultlock",
    "glacier:completevaultlock",
    "glacier:deletevaultaccesspolicy",
    "glacier:initiatevaultlock",
    "glacier:setdataretrievalpolicy",
    "glacier:setvaultaccesspolicy",
    "glue:deleteresourcepolicy",
    "glue:putresourcepolicy",
    "greengrass:associateserviceroletoaccount",
    "health:disablehealthserviceaccessfororganization",
    "health:enablehealthserviceaccessfororganization",
    "iam:addclientidtoopenidconnectprovider",
    "iam:addroletoinstanceprofile",
    "iam:addusertogroup",
    "iam:attachgrouppolicy",
    "iam:attachrolepolicy",
    "iam:attachuserpolicy",
    "iam:changepassword",
    "iam:createaccesskey",
    "iam:createaccountalias",
    "iam:creategroup",
    "iam:createinstanceprofile",
    "iam:createloginprofile",
    "iam:createopenidconnectprovider",
    "iam:createpolicy",
    "iam:createpolicyversion",
    "iam:createrole",
    "iam:createsamlprovider",
    "iam:createservicelinkedrole",
    "iam:createservicespecificcredential",
    "iam:createuser",
    "iam:createvirtualmfadevice",
    "iam:deactivatemfadevice",
    "iam:deleteaccesskey",
    "iam:deleteaccountalias",
    "iam:deleteaccountpasswordpolicy",
    "iam:deletegroup",
    "iam:deletegrouppolicy",
    "iam:deleteinstanceprofile",
    "iam:deleteloginprofile",
    "iam:deleteopenidconnectprovider",
    "iam:deletepolicy",
    "iam:deletepolicyversion",
    "iam:deleterole",
    "iam:deleterolepermissionsboundary",
    "iam:deleterolepolicy",
    "iam:deletesamlprovider",
    "iam:deletesshpublickey",
    "iam:deleteservercertificate",
    "iam:deleteservicelinkedrole",
    "iam:deleteservicespecificcredential",
    "iam:deletesigningcertificate",
    "iam:deleteuser",
    "iam:deleteuserpermissionsboundary",
    "iam:deleteuserpolicy",
    "iam:deletevirtualmfadevice",
    "iam:detachgrouppolicy",
    "iam:detachrolepolicy",
    "iam:detachuserpolicy",
    "iam:enablemfadevice",
    "iam:passrole",
    "iam:putgrouppolicy",
    "iam:putrolepermissionsboundary",
    "iam:putrolepolicy",
    "iam:putuserpermissionsboundary",
    "iam:putuserpolicy",
    "iam:removeclientidfromopenidconnectprovider",
    "iam:removerolefrominstanceprofile",
    "iam:removeuserfromgroup",
    "iam:resetservicespecificcredential",
    "iam:resyncmfadevice",
    "iam:setdefaultpolicyversion",
    "iam:setsecuritytokenservicepreferences",
    "iam:updateaccesskey",
    "iam:updateaccountpasswordpolicy",
    "iam:updateassumerolepolicy",
    "iam:updategroup",
    "iam:updateloginprofile",
    "iam:updateopenidconnectproviderthumbprint",
    "iam:updaterole",
    "iam:updateroledescription",
    "iam:updatesamlprovider",
    "iam:updatesshpublickey",
    "iam:updateservercertificate",
    "iam:updateservicespecificcredential",
    "iam:updatesigningcertificate",
    "iam:updateuser",
    "iam:uploadsshpublickey",
    "iam:uploadservercertificate",
    "iam:uploadsigningcertificate",
    "imagebuilder:putcomponentpolicy",
    "imagebuilder:putimagepolicy",
    "imagebuilder:putimagerecipepolicy",
    "iot:attachpolicy",
    "iot:attachprincipalpolicy",
    "iot:detachpolicy",
    "iot:detachprincipalpolicy",
    "iot:setdefaultauthorizer",
    "iot:setdefaultpolicyversion",
    "iotsitewise:createaccesspolicy",
    "iotsitewise:deleteaccesspolicy",
    "iotsitewise:updateaccesspolicy",
    "kms:creategrant",
    "kms:putkeypolicy",
    "kms:retiregrant",
    "kms:revokegrant",
    "lakeformation:batchgrantpermissions",
    "lakeformation:batchrevokepermissions",
    "lakeformation:grantpermissions",
    "lakeformation:putdatalakesettings",
    "lakeformation:revokepermissions",
    "lambda:addlayerversionpermission",
    "lambda:addpermission",
    "lambda:disablereplication",
    "lambda:enablereplication",
    "lambda:removelayerversionpermission",
    "lambda:removepermission",
    "license-manager:updateservicesettings",
    "lightsail:getrelationaldatabasemasteruserpassword",
    "logs:deleteresourcepolicy",
    "logs:putresourcepolicy",
    "mediapackage:rotateingestendpointcredentials",
    "mediastore:deletecontainerpolicy",
    "mediastore:putcontainerpolicy",
    "opsworks:setpermission",
    "opsworks:updateuserprofile",
    "quicksight:createadmin",
    "quicksight:creategroup",
    "quicksight:creategroupmembership",
    "quicksight:createiampolicyassignment",
    "quicksight:createuser",
    "quicksight:deletegroup",
    "quicksight:deletegroupmembership",
    "quicksight:deleteiampolicyassignment",
    "quicksight:deleteuser",
    "quicksight:deleteuserbyprincipalid",
    "quicksight:registeruser",
    "quicksight:updatedashboardpermissions",
    "quicksight:updategroup",
    "quicksight:updateiampolicyassignment",
    "quicksight:updatetemplatepermissions",
    "quicksight:updateuser",
    "ram:acceptresourceshareinvitation",
    "ram:associateresourceshare",
    "ram:createresourceshare",
    "ram:deleteresourceshare",
    "ram:disassociateresourceshare",
    "ram:enablesharingwithawsorganization",
    "ram:rejectresourceshareinvitation",
    "ram:updateresourceshare",
    "rds:authorizedbsecuritygroupingress",
    "rds-db:connect",
    "redshift:authorizesnapshotaccess",
    "redshift:createclusteruser",
    "redshift:createsnapshotcopygrant",
    "redshift:joingroup",
    "redshift:modifyclusteriamroles",
    "redshift:revokesnapshotaccess",
    "route53resolver:putresolverrulepolicy",
    "s3:bypassgovernanceretention",
    "s3:deleteaccesspointpolicy",
    "s3:deletebucketpolicy",
    "s3:objectowneroverridetobucketowner",
    "s3:putaccesspointpolicy",
    "s3:putaccountpublicaccessblock",
    "s3:putbucketacl",
    "s3:putbucketpolicy",
    "s3:putbucketpublicaccessblock",
    "s3:putobjectacl",
    "s3:putobjectversionacl",
    "secretsmanager:deleteresourcepolicy",
    "secretsmanager:putresourcepolicy",
    "secretsmanager:validateresourcepolicy",
    "servicecatalog:createportfolioshare",
    "servicecatalog:deleteportfolioshare",
    "sns:addpermission",
    "sns:createtopic",
    "sns:removepermission",
    "sns:settopicattributes",
    "sqs:addpermission",
    "sqs:createqueue",
    "sqs:removepermission",
    "sqs:setqueueattributes",
    "ssm:modifydocumentpermission",
    "sso:associatedirectory",
    "sso:associateprofile",
    "sso:createapplicationinstance",
    "sso:createapplicationinstancecertificate",
    "sso:createpermissionset",
    "sso:createprofile",
    "sso:createtrust",
    "sso:deleteapplicationinstance",
    "sso:deleteapplicationinstancecertificate",
    "sso:deletepermissionset",
    "sso:deletepermissionspolicy",
    "sso:deleteprofile",
    "sso:disassociatedirectory",
    "sso:disassociateprofile",
    "sso:importapplicationinstanceserviceprovidermetadata",
    "sso:putpermissionspolicy",
    "sso:startsso",
    "sso:updateapplicationinstanceactivecertificate",
    "sso:updateapplicationinstancedisplaydata",
    "sso:updateapplicationinstanceresponseconfiguration",
    "sso:updateapplicationinstanceresponseschemaconfiguration",
    "sso:updateapplicationinstancesecurityconfiguration",
    "sso:updateapplicationinstanceserviceproviderconfiguration",
    "sso:updateapplicationinstancestatus",
    "sso:updatedirectoryassociation",
    "sso:updatepermissionset",
    "sso:updateprofile",
    "sso:updatessoconfiguration",
    "sso:updatetrust",
    "sso-directory:addmembertogroup",
    "sso-directory:createalias",
    "sso-directory:creategroup",
    "sso-directory:createuser",
    "sso-directory:deletegroup",
    "sso-directory:deleteuser",
    "sso-directory:disableuser",
    "sso-directory:enableuser",
    "sso-directory:removememberfromgroup",
    "sso-directory:updategroup",
    "sso-directory:updatepassword",
    "sso-directory:updateuser",
    "sso-directory:verifyemail",
    "storagegateway:deletechapcredentials",
    "storagegateway:setlocalconsolepassword",
    "storagegateway:setsmbguestpassword",
    "storagegateway:updatechapcredentials",
    "waf:deletepermissionpolicy",
    "waf:putpermissionpolicy",
    "waf-regional:deletepermissionpolicy",
    "waf-regional:putpermissionpolicy",
    "wafv2:createwebacl",
    "wafv2:deletepermissionpolicy",
    "wafv2:deletewebacl",
    "wafv2:putpermissionpolicy",
    "wafv2:updatewebacl",
    "worklink:updatedevicepolicyconfiguration",
    "workmail:resetpassword",
    "workmail:resetuserpassword",
    "xray:putencryptionconfig"
]

CREDEXPOSURE_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "chime:createapikey",
    "codeartifact:getauthorizationtoken",
    "codepipeline:pollforjobs",
    "cognito-identity:getopenidtoken",
    "cognito-identity:getopenidtokenfordeveloperidentity",
    "cognito-identity:getcredentialsforidentity",
    "connect:getfederationtoken",
    "connect:getfederationtokens",
    "ec2:getpassworddata",
    "ecr:getauthorizationtoken",
    "gamelift:requestuploadcredentials",
    "iam:createaccesskey",
    "iam:createloginprofile",
    "iam:createservicespecificcredential",
    "iam:resetservicespecificcredential",
    "iam:updateaccesskey",
    "lightsail:getinstanceaccessdetails",
    "lightsail:getrelationaldatabasemasteruserpassword",
    "rds-db:connect",
    "redshift:getclustercredentials",
    "sso:getrolecredentials",
    "mediapackage:rotatechannelcredentials",
    "mediapackage:rotateingestendpointcredentials",
    "sts:assumerole",
    "sts:assumerolewithsaml",
    "sts:assumerolewithwebidentity",
    "sts:getfederationtoken",
    "sts:getsessiontoken"
]

iam_def = []
with open("iam_definition.json", "r") as f:
    iam_def = json.loads(f.read())

allactions = {}
for service in iam_def:
    for privilege in service['privileges']:
        allactions[service['prefix'] + ":" + privilege['privilege']] = privilege['access_level']

deprecated_policies = []
with open("MAMIP/DEPRECATED.json", "r") as f:
    deprecated_policies = json.loads(f.read())

policies = []

for policyname in os.listdir("MAMIP/policies/"):
    policy = {}
    detailed_policy = {}

    with open("MAMIP/policies/{}".format(policyname), "r") as f:
        policy = json.loads(f.read())

    policieslist = {}
    with open("MAMIP/policies-list.json", "r") as f:
        policieslist = json.loads(f.read())

    updatedate = None
    for policieslistitem in policieslist['Policies']:
        if policieslistitem['PolicyName'] == policyname:
            updatedate = policieslistitem['UpdateDate']

    privesc = False
    resource_exposure = False
    credentials_exposure = False
    malformed = False
    undocumented = False
    if not isinstance(policy['PolicyVersion']['Document']['Statement'], list):
        policy['PolicyVersion']['Document']['Statement'] = [policy['PolicyVersion']['Document']['Statement']]

    access_levels = []
    effective_actions = []

    unknown_actions = []
    for statement in policy['PolicyVersion']['Document']['Statement']:
        if 'Action' in statement and statement['Effect'] == "Allow":
            if not isinstance(statement['Action'], list):
                statement['Action'] = [statement['Action']]

            for action in statement['Action']:
                foundmatch = False
                matchexpression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
                for potentialaction in allactions.keys():
                    if re.search(matchexpression.lower(), potentialaction.lower()):
                        access_levels.append(allactions[potentialaction])
                        foundmatch = True

                        condition = None
                        if 'Condition' in statement:
                            condition = statement['Condition']

                        if potentialaction.lower() in PRIVESC_ACTIONS:
                            privesc = True

                        if potentialaction.lower() in RESEXPOSURE_ACTIONS:
                            resource_exposure = True

                        if potentialaction.lower() in CREDEXPOSURE_ACTIONS:
                            credentials_exposure = True

                        if allactions[potentialaction] == "Unknown":
                            undocumented = True

                        effective_actions.append({
                            'action': action,
                            'effective_action': potentialaction,
                            'access_level': allactions[potentialaction],
                            'condition': condition,
                            'privesc': (potentialaction.lower() in PRIVESC_ACTIONS),
                            'resource_exposure': (potentialaction.lower() in RESEXPOSURE_ACTIONS),
                            'credentials_exposure': (potentialaction.lower() in CREDEXPOSURE_ACTIONS)
                        })

                if not foundmatch:
                    condition = None
                    if 'Condition' in statement:
                        condition = statement['Condition']
                        
                    unknown_actions.append({
                        'action': action,
                        'condition': condition
                    })
        elif 'Action' in statement and statement['Effect'] == "Deny":
            pass
        elif 'NotAction' in statement and statement['Effect'] == "Allow":
            if not isinstance(statement['NotAction'], list):
                statement['NotAction'] = [statement['NotAction']]

            for potentialaction in allactions.keys():
                matched = False
                for action in statement['NotAction']:
                    matchexpression = "^" + action.replace("*", ".*").replace("?", ".{{1}}") + "$"
                    if re.search(matchexpression.lower(), potentialaction.lower()):
                        matched = True
                        break

                if matched:
                    continue
                
                access_levels.append(allactions[potentialaction])

                condition = None
                if 'Condition' in statement:
                    condition = statement['Condition']

                if potentialaction.lower() in PRIVESC_ACTIONS:
                    privesc = True

                if potentialaction.lower() in RESEXPOSURE_ACTIONS:
                    resource_exposure = True

                if potentialaction.lower() in CREDEXPOSURE_ACTIONS:
                    credentials_exposure = True

                effective_actions.append({
                    'action': "NotAction",
                    'effective_action': potentialaction,
                    'access_level': allactions[potentialaction],
                    'condition': condition,
                    'privesc': (potentialaction.lower() in PRIVESC_ACTIONS),
                    'resource_exposure': (potentialaction.lower() in RESEXPOSURE_ACTIONS),
                    'credentials_exposure': (potentialaction.lower() in CREDEXPOSURE_ACTIONS)
                })
        else:
            malformed = True

    access_level_order = {
        "List": 1,
        "Read": 2,
        "Tagging": 3,
        "Write": 4,
        "Permissions management": 5,
        "Unknown": 6
    }
    access_levels = list(set(access_levels))
    access_levels.sort(key=lambda x: access_level_order[x])

    policies.append({
        'name': policyname,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': (len(unknown_actions) > 0),
        'access_levels': access_levels,
        'privesc': privesc,
        'resource_exposure': resource_exposure,
        'credentials_exposure': credentials_exposure,
        'undocumented_actions': undocumented
    })

    detailed_policy = {
        'name': policyname,
        'deprecated': (policyname in deprecated_policies),
        'createdate': policy['PolicyVersion']['CreateDate'],
        'updatedate': updatedate,
        'version': policy['PolicyVersion']['VersionId'],
        'malformed': malformed,
        'unknown_actions': unknown_actions,
        'access_levels': access_levels,
        'privesc': privesc,
        'resource_exposure': resource_exposure,
        'credentials_exposure': credentials_exposure,
        'undocumented_actions': undocumented,
        'document': policy['PolicyVersion']['Document'],
        'effective_actions': effective_actions
    }

    with open("managedpolicies/{}.json".format(policyname), "w") as f:
        f.write(json.dumps(detailed_policy))

with open("managed_policies.json", "w") as f:
    f.write(json.dumps({
        "policies": policies
    }))
