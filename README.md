# IAM Dataset

A consolidated series of structured data for cloud identity and access management systems, including datasets for AWS, Azure, and Google Cloud.

It is currently being used to support:

* [iamlive](https://github.com/iann0036/iamlive)
* [iamfast](https://github.com/iann0036/iamfast)
* [aws.permissions.cloud](https://aws.permissions.cloud)
* [azure.permissions.cloud](https://azure.permissions.cloud)
* [gcp.permissions.cloud](https://gcp.permissions.cloud)
* [claws](https://clawsapp.com)
* [LocalStack](https://discuss.localstack.cloud/t/localstack-release-v2-2-0/424#live-policy-streams-9)

Tooling which assists in the generation of some datasources is located in the `util/` directory.

## AWS

For Amazon Web Services IAM, the primary datasources are map.json and iam_definition.json.

In order to assist with the creation of the map.json file, a custom mapping tool may be used to accelerate the process. The mapping tool is currently hosted at: [https://iann0036.github.io/iam-dataset/util/index.html#](https://iann0036.github.io/iam-dataset/util/index.html#)

### map.json

A comprehensive mapping from SDK calls to IAM actions, typically created with the assistance of the mapping tool.

#### map.json Template Syntax

`${PropertyName}` - Variable substitution for the `PropertyName` property

`.` - A property within an object/map

`[]` - For each value within the array

`%%urlencode%${PropertyName}%%` - Performs a URL-encoding on the `PropertyName` property

`%%many%${PropertyName}%${PropertyName2}%${PropertyName3}%%` - For each of the `PropertyName`, `PropertyName2` & `PropertyName3` properties (any length)

`%%iftemplatematch%${ArnProperty}%%` - Only valid if the template matches the resource type's template

`%%iftruthy%${PropertyName}%ValueIfTrue%ValueIfFalse%%` - Truthy test

`%%regex%${PropertyName}%/(.+)/g%%` - Returns first capture group of Regex

### iam_definition.json

A scraping of the [AWS Service Authorization Reference](https://docs.aws.amazon.com/service-authorization/latest/reference/reference.html), the AWS-provided reference of known IAM actions. It is generated using work from [Parliament](https://github.com/duo-labs/parliament).

The file does have some post-crawl patching actions.

### managedpolicies/_name_.json

The details of all AWS Managed Policies, including flags for whether the managed policy contains high sensitivity actions.

## Azure

For Azure, the primary datasource is built-in-roles.json.

### provider-operations.json

The direct output of the command `az provider operation list` which retrieves all operations from all providers.

### built-in-roles-raw.json

The output of the command `az role definition list` with a query for all built-in roles.

### built-in-roles.json

The aggregation of thr built-in roles and provider operations permitted by those built-in roles.

## Google Cloud

For Google Cloud, the primary datasources are methods.json, permissions.json and role_permissions.json.

### predefined_roles.json

The result of the command `gcloud iam roles list`, including deleted roles, showing all predefined roles.

### map.json

A map of IAM permissions required for each method. **[WORK IN PROGRESS]**

### methods.json

The combination of the methods extracted from the Google Cloud Go SDK.

### methods_ext.json

Same as methods.json, but with parameter information.

### permissions.json

IAM Permissions as defined by the online [IAM permissions reference](https://cloud.google.com/iam/docs/permissions-reference).

### role_permissions.json

A mapping of each permission and the roles which the permission has, including whether the containment is undocumented per the IAM permission reference.

### roles/_name_.json

The result of the command `gcloud iam roles describe "$name"` for all built-in roles.
