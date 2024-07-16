
API Invoke URL
	dev: https://p6pfqhi6ok.execute-api.us-east-1.amazonaws.com



<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example

## Initial setup

Be sure to modify the `allowedOrigins` in `serverless.yml` and replace `SERVICE_NAME` with the appropriate name for the server. Additionally, it's important to use the appropriate profiles configured through AWS CLI, once this is completed, be sure to change the `profile: AWS_PROFILE` field in `serverless.yml` config file.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  sendEmail: aws-node-project-dev-send-email (1.5 kB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function sendEmail
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function sendEmail
```