# https://github.com/z0ph/MAMIP.git

import os
import json
import re

PRIVESC_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "iam:PassRole",
    "iam:CreatePolicyVersion",
    "iam:SetDefaultPolicyVersion",
    "iam:CreateAccessKey",
    "iam:CreateLoginProfile",
    "iam:UpdateLoginProfile",
    "iam:AttachUserPolicy",
    "iam:AttachGroupPolicy",
    "iam:AttachRolePolicy",
    "iam:PutUserPolicy",
    "iam:PutGroupPolicy",
    "iam:PutRolePolicy",
    "iam:AddUserToGroup",
    "iam:UpdateAssumeRolePolicy",
    "iam:CreateServiceLinkedRole",
    "iam:CreateVirtualMFADevice",
    "iam:ResyncMFADevice",
    "iam:EnableMFADevice",
    "glue:UpdateDevEndpoint",
    "codestar:CreateProject",
    "codestar:AssociateTeamMember"
]

RESEXPOSURE_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "acm-pca:CreatePermission",
    "acm-pca:DeletePermission",
    "acm-pca:DeletePolicy",
    "acm-pca:PutPolicy",
    "apigateway:UpdateRestApiPolicy",
    "backup:DeleteBackupVaultAccessPolicy",
    "backup:PutBackupVaultAccessPolicy",
    "chime:DeleteVoiceConnectorTerminationCredentials",
    "chime:PutVoiceConnectorTerminationCredentials",
    "cloudformation:SetStackPolicy",
    "cloudsearch:UpdateServiceAccessPolicies",
    "codeartifact:DeleteDomainPermissionsPolicy",
    "codeartifact:DeleteRepositoryPermissionsPolicy",
    "codebuild:DeleteResourcePolicy",
    "codebuild:DeleteSourceCredentials",
    "codebuild:ImportSourceCredentials",
    "codebuild:PutResourcePolicy",
    "codeguru-profiler:PutPermission",
    "codeguru-profiler:RemovePermission",
    "codestar:AssociateTeamMember",
    "codestar:CreateProject",
    "codestar:DeleteProject",
    "codestar:DisassociateTeamMember",
    "codestar:UpdateTeamMember",
    "cognito-identity:CreateIdentityPool",
    "cognito-identity:DeleteIdentities",
    "cognito-identity:DeleteIdentityPool",
    "cognito-identity:GetId",
    "cognito-identity:MergeDeveloperIdentities",
    "cognito-identity:SetIdentityPoolRoles",
    "cognito-identity:UnlinkDeveloperIdentity",
    "cognito-identity:UnlinkIdentity",
    "cognito-identity:UpdateIdentityPool",
    "deeplens:AssociateServiceRoleToAccount",
    "ds:CreateConditionalForwarder",
    "ds:CreateDirectory",
    "ds:CreateMicrosoftAD",
    "ds:CreateTrust",
    "ds:ShareDirectory",
    "ec2:CreateNetworkInterfacePermission",
    "ec2:DeleteNetworkInterfacePermission",
    "ec2:ModifySnapshotAttribute",
    "ec2:ModifyVpcEndpointServicePermissions",
    "ec2:ResetSnapshotAttribute",
    "ecr:DeleteRepositoryPolicy",
    "ecr:SetRepositoryPolicy",
    "elasticfilesystem:DeleteFileSystemPolicy",
    "elasticfilesystem:PutFileSystemPolicy",
    "elasticmapreduce:PutBlockPublicAccessConfiguration",
    "es:CreateElasticsearchDomain",
    "es:UpdateElasticsearchDomainConfig",
    "glacier:AbortVaultLock",
    "glacier:CompleteVaultLock",
    "glacier:DeleteVaultAccessPolicy",
    "glacier:InitiateVaultLock",
    "glacier:SetDataRetrievalPolicy",
    "glacier:SetVaultAccessPolicy",
    "glue:DeleteResourcePolicy",
    "glue:PutResourcePolicy",
    "greengrass:AssociateServiceRoleToAccount",
    "health:DisableHealthServiceAccessForOrganization",
    "health:EnableHealthServiceAccessForOrganization",
    "iam:AddClientIDToOpenIDConnectProvider",
    "iam:AddRoleToInstanceProfile",
    "iam:AddUserToGroup",
    "iam:AttachGroupPolicy",
    "iam:AttachRolePolicy",
    "iam:AttachUserPolicy",
    "iam:ChangePassword",
    "iam:CreateAccessKey",
    "iam:CreateAccountAlias",
    "iam:CreateGroup",
    "iam:CreateInstanceProfile",
    "iam:CreateLoginProfile",
    "iam:CreateOpenIDConnectProvider",
    "iam:CreatePolicy",
    "iam:CreatePolicyVersion",
    "iam:CreateRole",
    "iam:CreateSAMLProvider",
    "iam:CreateServiceLinkedRole",
    "iam:CreateServiceSpecificCredential",
    "iam:CreateUser",
    "iam:CreateVirtualMFADevice",
    "iam:DeactivateMFADevice",
    "iam:DeleteAccessKey",
    "iam:DeleteAccountAlias",
    "iam:DeleteAccountPasswordPolicy",
    "iam:DeleteGroup",
    "iam:DeleteGroupPolicy",
    "iam:DeleteInstanceProfile",
    "iam:DeleteLoginProfile",
    "iam:DeleteOpenIDConnectProvider",
    "iam:DeletePolicy",
    "iam:DeletePolicyVersion",
    "iam:DeleteRole",
    "iam:DeleteRolePermissionsBoundary",
    "iam:DeleteRolePolicy",
    "iam:DeleteSAMLProvider",
    "iam:DeleteSSHPublicKey",
    "iam:DeleteServerCertificate",
    "iam:DeleteServiceLinkedRole",
    "iam:DeleteServiceSpecificCredential",
    "iam:DeleteSigningCertificate",
    "iam:DeleteUser",
    "iam:DeleteUserPermissionsBoundary",
    "iam:DeleteUserPolicy",
    "iam:DeleteVirtualMFADevice",
    "iam:DetachGroupPolicy",
    "iam:DetachRolePolicy",
    "iam:DetachUserPolicy",
    "iam:EnableMFADevice",
    "iam:PassRole",
    "iam:PutGroupPolicy",
    "iam:PutRolePermissionsBoundary",
    "iam:PutRolePolicy",
    "iam:PutUserPermissionsBoundary",
    "iam:PutUserPolicy",
    "iam:RemoveClientIDFromOpenIDConnectProvider",
    "iam:RemoveRoleFromInstanceProfile",
    "iam:RemoveUserFromGroup",
    "iam:ResetServiceSpecificCredential",
    "iam:ResyncMFADevice",
    "iam:SetDefaultPolicyVersion",
    "iam:SetSecurityTokenServicePreferences",
    "iam:UpdateAccessKey",
    "iam:UpdateAccountPasswordPolicy",
    "iam:UpdateAssumeRolePolicy",
    "iam:UpdateGroup",
    "iam:UpdateLoginProfile",
    "iam:UpdateOpenIDConnectProviderThumbprint",
    "iam:UpdateRole",
    "iam:UpdateRoleDescription",
    "iam:UpdateSAMLProvider",
    "iam:UpdateSSHPublicKey",
    "iam:UpdateServerCertificate",
    "iam:UpdateServiceSpecificCredential",
    "iam:UpdateSigningCertificate",
    "iam:UpdateUser",
    "iam:UploadSSHPublicKey",
    "iam:UploadServerCertificate",
    "iam:UploadSigningCertificate",
    "imagebuilder:PutComponentPolicy",
    "imagebuilder:PutImagePolicy",
    "imagebuilder:PutImageRecipePolicy",
    "iot:AttachPolicy",
    "iot:AttachPrincipalPolicy",
    "iot:DetachPolicy",
    "iot:DetachPrincipalPolicy",
    "iot:SetDefaultAuthorizer",
    "iot:SetDefaultPolicyVersion",
    "iotsitewise:CreateAccessPolicy",
    "iotsitewise:DeleteAccessPolicy",
    "iotsitewise:UpdateAccessPolicy",
    "kms:CreateGrant",
    "kms:PutKeyPolicy",
    "kms:RetireGrant",
    "kms:RevokeGrant",
    "lakeformation:BatchGrantPermissions",
    "lakeformation:BatchRevokePermissions",
    "lakeformation:GrantPermissions",
    "lakeformation:PutDataLakeSettings",
    "lakeformation:RevokePermissions",
    "lambda:AddLayerVersionPermission",
    "lambda:AddPermission",
    "lambda:DisableReplication",
    "lambda:EnableReplication",
    "lambda:RemoveLayerVersionPermission",
    "lambda:RemovePermission",
    "license-manager:UpdateServiceSettings",
    "lightsail:GetRelationalDatabaseMasterUserPassword",
    "logs:DeleteResourcePolicy",
    "logs:PutResourcePolicy",
    "mediapackage:RotateIngestEndpointCredentials",
    "mediastore:DeleteContainerPolicy",
    "mediastore:PutContainerPolicy",
    "opsworks:SetPermission",
    "opsworks:UpdateUserProfile",
    "quicksight:CreateAdmin",
    "quicksight:CreateGroup",
    "quicksight:CreateGroupMembership",
    "quicksight:CreateIAMPolicyAssignment",
    "quicksight:CreateUser",
    "quicksight:DeleteGroup",
    "quicksight:DeleteGroupMembership",
    "quicksight:DeleteIAMPolicyAssignment",
    "quicksight:DeleteUser",
    "quicksight:DeleteUserByPrincipalId",
    "quicksight:RegisterUser",
    "quicksight:UpdateDashboardPermissions",
    "quicksight:UpdateGroup",
    "quicksight:UpdateIAMPolicyAssignment",
    "quicksight:UpdateTemplatePermissions",
    "quicksight:UpdateUser",
    "ram:AcceptResourceShareInvitation",
    "ram:AssociateResourceShare",
    "ram:CreateResourceShare",
    "ram:DeleteResourceShare",
    "ram:DisassociateResourceShare",
    "ram:EnableSharingWithAwsOrganization",
    "ram:RejectResourceShareInvitation",
    "ram:UpdateResourceShare",
    "rds:AuthorizeDBSecurityGroupIngress",
    "rds-db:connect",
    "redshift:AuthorizeSnapshotAccess",
    "redshift:CreateClusterUser",
    "redshift:CreateSnapshotCopyGrant",
    "redshift:JoinGroup",
    "redshift:ModifyClusterIamRoles",
    "redshift:RevokeSnapshotAccess",
    "route53resolver:PutResolverRulePolicy",
    "s3:BypassGovernanceRetention",
    "s3:DeleteAccessPointPolicy",
    "s3:DeleteBucketPolicy",
    "s3:ObjectOwnerOverrideToBucketOwner",
    "s3:PutAccessPointPolicy",
    "s3:PutAccountPublicAccessBlock",
    "s3:PutBucketAcl",
    "s3:PutBucketPolicy",
    "s3:PutBucketPublicAccessBlock",
    "s3:PutObjectAcl",
    "s3:PutObjectVersionAcl",
    "secretsmanager:DeleteResourcePolicy",
    "secretsmanager:PutResourcePolicy",
    "secretsmanager:ValidateResourcePolicy",
    "servicecatalog:CreatePortfolioShare",
    "servicecatalog:DeletePortfolioShare",
    "sns:AddPermission",
    "sns:CreateTopic",
    "sns:RemovePermission",
    "sns:SetTopicAttributes",
    "sqs:AddPermission",
    "sqs:CreateQueue",
    "sqs:RemovePermission",
    "sqs:SetQueueAttributes",
    "ssm:ModifyDocumentPermission",
    "sso:AssociateDirectory",
    "sso:AssociateProfile",
    "sso:CreateApplicationInstance",
    "sso:CreateApplicationInstanceCertificate",
    "sso:CreatePermissionSet",
    "sso:CreateProfile",
    "sso:CreateTrust",
    "sso:DeleteApplicationInstance",
    "sso:DeleteApplicationInstanceCertificate",
    "sso:DeletePermissionSet",
    "sso:DeletePermissionsPolicy",
    "sso:DeleteProfile",
    "sso:DisassociateDirectory",
    "sso:DisassociateProfile",
    "sso:ImportApplicationInstanceServiceProviderMetadata",
    "sso:PutPermissionsPolicy",
    "sso:StartSSO",
    "sso:UpdateApplicationInstanceActiveCertificate",
    "sso:UpdateApplicationInstanceDisplayData",
    "sso:UpdateApplicationInstanceResponseConfiguration",
    "sso:UpdateApplicationInstanceResponseSchemaConfiguration",
    "sso:UpdateApplicationInstanceSecurityConfiguration",
    "sso:UpdateApplicationInstanceServiceProviderConfiguration",
    "sso:UpdateApplicationInstanceStatus",
    "sso:UpdateDirectoryAssociation",
    "sso:UpdatePermissionSet",
    "sso:UpdateProfile",
    "sso:UpdateSSOConfiguration",
    "sso:UpdateTrust",
    "sso-directory:AddMemberToGroup",
    "sso-directory:CreateAlias",
    "sso-directory:CreateGroup",
    "sso-directory:CreateUser",
    "sso-directory:DeleteGroup",
    "sso-directory:DeleteUser",
    "sso-directory:DisableUser",
    "sso-directory:EnableUser",
    "sso-directory:RemoveMemberFromGroup",
    "sso-directory:UpdateGroup",
    "sso-directory:UpdatePassword",
    "sso-directory:UpdateUser",
    "sso-directory:VerifyEmail",
    "storagegateway:DeleteChapCredentials",
    "storagegateway:SetLocalConsolePassword",
    "storagegateway:SetSMBGuestPassword",
    "storagegateway:UpdateChapCredentials",
    "waf:DeletePermissionPolicy",
    "waf:PutPermissionPolicy",
    "waf-regional:DeletePermissionPolicy",
    "waf-regional:PutPermissionPolicy",
    "wafv2:CreateWebACL",
    "wafv2:DeletePermissionPolicy",
    "wafv2:DeleteWebACL",
    "wafv2:PutPermissionPolicy",
    "wafv2:UpdateWebACL",
    "worklink:UpdateDevicePolicyConfiguration",
    "workmail:ResetPassword",
    "workmail:ResetUserPassword",
    "xray:PutEncryptionConfig"
]

CREDEXPOSURE_ACTIONS = [ # https://cloudsplaining.readthedocs.io/en/latest/glossary/privilege-escalation/
    "chime:CreateApiKey",
    "codeartifact:GetAuthorizationToken",
    "codepipeline:PollForJobs",
    "cognito-identity:GetOpenIdToken",
    "cognito-identity:GetOpenIdTokenForDeveloperIdentity",
    "cognito-identity:GetCredentialsForIdentity",
    "connect:GetFederationToken",
    "connect:GetFederationTokens",
    "ec2:GetPasswordData",
    "ecr:GetAuthorizationToken",
    "gamelift:RequestUploadCredentials",
    "iam:CreateAccessKey",
    "iam:CreateLoginProfile",
    "iam:CreateServiceSpecificCredential",
    "iam:ResetServiceSpecificCredential",
    "iam:UpdateAccessKey",
    "lightsail:GetInstanceAccessDetails",
    "lightsail:GetRelationalDatabaseMasterUserPassword",
    "rds-db:connect",
    "redshift:GetClusterCredentials",
    "sso:GetRoleCredentials",
    "mediapackage:RotateChannelCredentials",
    "mediapackage:RotateIngestEndpointCredentials",
    "sts:AssumeRole",
    "sts:AssumeRoleWithSAML",
    "sts:AssumeRoleWithWebIdentity",
    "sts:GetFederationToken",
    "sts:GetSessionToken"
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

                        if potentialaction in PRIVESC_ACTIONS:
                            privesc = True

                        if potentialaction in RESEXPOSURE_ACTIONS:
                            resource_exposure = True

                        if potentialaction in CREDEXPOSURE_ACTIONS:
                            credentials_exposure = True

                        if allactions[potentialaction] == "Unknown":
                            undocumented = True

                        effective_actions.append({
                            'action': action,
                            'effective_action': potentialaction,
                            'access_level': allactions[potentialaction],
                            'condition': condition,
                            'privesc': (potentialaction in PRIVESC_ACTIONS),
                            'resource_exposure': (potentialaction in RESEXPOSURE_ACTIONS),
                            'credentials_exposure': (potentialaction in CREDEXPOSURE_ACTIONS)
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

                if potentialaction in PRIVESC_ACTIONS:
                    privesc = True

                if potentialaction in RESEXPOSURE_ACTIONS:
                    resource_exposure = True

                if potentialaction in CREDEXPOSURE_ACTIONS:
                    credentials_exposure = True

                effective_actions.append({
                    'action': "NotAction",
                    'effective_action': potentialaction,
                    'access_level': allactions[potentialaction],
                    'condition': condition,
                    'privesc': (potentialaction in PRIVESC_ACTIONS),
                    'resource_exposure': (potentialaction in RESEXPOSURE_ACTIONS),
                    'credentials_exposure': (potentialaction in CREDEXPOSURE_ACTIONS)
                })
        else:
            malformed = True

    access_level_order = {
        "List": 1,
        "Read": 2,
        "Tagging": 3,
        "Write": 4,
        "Permissions management": 5
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
