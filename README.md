# SDK Actions to IAM Mapping

A series of tools to develop a comprehensive map (`map.json`) from SDK calls to IAM actions.

It is currently being used to support [https://github.com/iann0036/iamlive](https://github.com/iann0036/iamlive) and [https://github.com/iann0036/iamfast](https://github.com/iann0036/iamfast).

Mapping tool hosted version: [https://iann0036.github.io/sdk-iam-map/index.html#](https://iann0036.github.io/sdk-iam-map/index.html#).

Template checking notes: check for `/{` or `""` or `\`` mistakes after full mapping.

Current position: Glacier.UploadMultipartPart

## Syntax Definition

`${PropertyName}` - Variable substitution for the `PropertyName` property

`.` - A property within an object/map

`[]` - For each value within the array

`%urlencode:${PropertyName}%` - Performs a URL-encoding on the `PropertyName` property
