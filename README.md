# IAM Dataset

> **Note**
> This repository is currently undergoing a directory restructure. If you previously relied on `.json` files in the root of this repository, these should now be accessed from within the `aws/` directory if hotlinking or consumed with CI/CD.

A series of tools to develop a comprehensive map (`map.json`) from SDK calls to IAM actions, and evaluation of managed policies.

It is currently being used to support:

* [https://github.com/iann0036/iamlive](https://github.com/iann0036/iamlive)
* [https://github.com/iann0036/iamfast](https://github.com/iann0036/iamfast)
* [https://github.com/iann0036/permissions.cloud](https://github.com/iann0036/permissions.cloud)

Mapping tool hosted version: [https://iann0036.github.io/iam-dataset/index.html#](https://iann0036.github.io/iam-dataset/index.html#).

## map.json Syntax Definition

`${PropertyName}` - Variable substitution for the `PropertyName` property

`.` - A property within an object/map

`[]` - For each value within the array

`%%urlencode%${PropertyName}%%` - Performs a URL-encoding on the `PropertyName` property

`%%many%${PropertyName}%${PropertyName2}%${PropertyName3}%%` - For each of the `PropertyName`, `PropertyName2` & `PropertyName3` properties (any length)

`%%iftemplatematch%${ArnProperty}%%` - Only valid if the template matches the resource type's template

`%%iftruthy%${PropertyName}%ValueIfTrue%ValueIfFalse%%` - Truthy test

`%%regex%${PropertyName}%/(.+)/g%%` - Returns first capture group of Regex
