
API Invoke URL
	dev: https://keiy978fn5.execute-api.us-east-2.amazonaws.com
	
Lambdas
	[todos-getTodo-dev](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/todos-getTodo-dev)
	[todos-createTodo-dev](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/todos-createTodo-dev)
	[todos-updateTodo-dev](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/todos-updateTodo-dev)
	[todos-deleteTodo-dev](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/todos-deleteTodo-dev)
	[todos-getAllTodos-dev](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/todos-getAllTodos-dev)


to deploy
	```sls deploy```

to deploy just 1 function
	```sls deploy -f getTodo```


# Curl Commands

## Get Todo
```
curl  -X GET \
  'https://keiy978fn5.execute-api.us-east-2.amazonaws.com/todos/5e1d2b47-d809-4d4e-9995-0db328467543' \
  --header 'Accept: */*' \
```
```
{
  "id": "5e1d2b47-d809-4d4e-9995-0db328467543",
  "done": false,
  "title": "title"
}
```


# Serverless Framework AWS NodeJS Example

## Initial setup

Be sure to modify the `allowedOrigins` in `serverless.yml` and replace `SERVICE_NAME` with the appropriate name for the server. Additionally, it's important to use the appropriate profiles configured through AWS CLI, once this is completed, be sure to change the `profile: AWS_PROFILE` field in `serverless.yml` config file.

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
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