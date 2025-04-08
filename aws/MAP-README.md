# Detailed information about the map.json file

The AWS map.json file is a JSON file that contains mappings of SDK calls to IAM actions. The file is structured in a way that allows for easy parsing and understanding of the relationships between SDK calls and IAM actions. Though there is a [custom mapping tool](https://iann0036.github.io/iam-dataset/util/index.html#) that can be used to assist in the update this file, it is not required to make changes to the file.

## File Structure

```jsonc
{
    "info": "string", // basic information about the origin of the file
    "sdk_permissionless_actions": [ // list of SDK calls that do not require permissions
       "DynamoDB.DescribeEndpoints",
        ...
    ],
    "sdk_method_iam_mappings": { // mapping of SDK calls to IAM actions, keyed by the SDK/API method name
        "Budgets.CreateBudget": [ // list of IAM permissions that are used to call the SDK method
            { // variant 1, used when the IAM permission has a resource type with variables associated with it
                "action": "budgets:CreateBudget", // the IAM action name
                "resource_mappings": { // mapping of the variables in the ARN templates for the resource types (as present in https://docs.aws.amazon.com/service-authorization/latest/reference/reference.html) to the properties in the SDK call
                    "BudgetName": { // the ARN variable name
                        "template": "${Budget.BudgetName}" // the template to use to extract the value to be used in place of the ARN variable from the SDK call
                    },
                    ...
                },
                "undocumented": true, // (optional for all variants) if present and true, marks that the action is not documented within the AWS IAM documentation (SAR) - typically these are discovered through error messages
            },
            { // variant 2, used when the IAM permission has a resource type associated with it but the resource type has no variables
                "action": "sts:GetSessionToken",
                "resource_mappings": {}
            },
            { // variant 3, used when the IAM ARN itself uses the specified template
                "action": "acm:UpdateCertificateOptions",
                "resource_mappings": {},
                "resourcearn_mappings": {
                    "certificate": "${CertificateArn}", // a mapping of the resource type to a template used to fulfil the entire ARN
                    ...
                }
            },
            { // variant 4, used to explicitely override the provided ARN template with the specified template
                "action": "iam:PassRole",
                "arn_override": {
                    "template": "%%iftemplatematch%${IamRoleArn}%%"
                }
            },
            { // additional note: the use of the "conditions" property may be present however is in draft and not yet fully supported - please do not use at this time
                "action": "dynamodb:PartiQLSelect",
                "resource_mappings": {},
                "conditions": {
                    "lhs": "Statements[].Statement",
                    "op": "IContains",
                    "rhs": "SELECT "
                }
            },
            ...
        ],
        ... 
    },
    "sdk_service_mappings": { // mapping of friendly service names (as produced by CSM or the SDK) to IAM namespaces, IAM namespaces may appear more than once
        "ACM PCA": "acm-pca",
        ...
    },
    "service_sdk_mappings": { // mapping of IAM namespaces to an array of possible friendly service names (as produced by CSM or the SDK)
        "a4b": [
            "AlexaForBusiness"
        ],
        ...
    }
}
```

## Template Syntax

The following syntax items may be used within the `template` and similar properties of the map.json file. Any other text will be treated as a literal string.

`${PropertyName}` - Variable substitution for the `PropertyName` property.

`.` - A property within an object/map, used within variable substitution.

`[]` - For each value within the array, used within variable substitution.

`%%urlencode%${PropertyName}%%` - Performs a URL-encoding on the `PropertyName` property.

`%%many%${PropertyName}%${PropertyName2}%${PropertyName3}%%` - For each of the `PropertyName`, `PropertyName2` & `PropertyName3` properties (any length)

`%%iftemplatematch%${ArnProperty}%%` - Only valid if the template matches the resource type's template. If invalid, required resource types should use a wildcard (`*`) for the ARN and non-required resource types should omit the indicated IAM permission entirely.

`%%iftruthy%${PropertyName}%ValueIfTrue%ValueIfFalse%%` - Truthy test.

`%%regex%${PropertyName}%/(.+)/g%%` - Returns first capture group of Regex.
