# SDK Actions to IAM Mapping

A series of tools to develop a comprehensive map (`map.json`) from SDK calls to IAM actions.

It is currently being used to support [https://github.com/iann0036/iamlive](https://github.com/iann0036/iamlive) and [https://github.com/iann0036/iamfast](https://github.com/iann0036/iamfast).

Mapping tool hosted version: [https://iann0036.github.io/sdk-iam-map/index.html#](https://iann0036.github.io/sdk-iam-map/index.html#).

## Syntax Definition

`${PropertyName}` - Variable substitution for the `PropertyName` property

`.` - A property within an object/map

`[]` - For each value within the array

`%%urlencode%${PropertyName}%%` - Performs a URL-encoding on the `PropertyName` property

`%%many%${PropertyName}%${PropertyName2}%${PropertyName3}%%` - For each of the `PropertyName`, `PropertyName2` & `PropertyName3` properties (any length)

`%%iftemplatematch%${ArnProperty}%%` - Only valid if the template matches the resource type's template

`%%iftruthy%${PropertyName}%ValueIfTrue%ValueIfFalse%%` - Truthy test

`%%regex%${PropertyName}%/(.+)/g%%` - Returns first capture group of Regex

## Notes

Template checking notes: check for `/{` or `""` or `\`` or `" ` or `"%m` or `"%$` or `}%"` or `}[]` mistakes after full mapping.

TODO: Handle ${aws:username} in iamlive
TODO: WAFV2.Check* crash
TODO: Check LexModelsV2 mapped correctly
TODO: DataBrew iam:PassRole
TODO: OpsWorks stack ARN trailing /
TODO: Dependant actions in map