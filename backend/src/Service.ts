import { AttributeValue, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand , DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { uuid } from 'uuidv4';
import { Todo} from "./Todo";
import { TodoUpdateRequest } from "./TodoUpdateRequest";


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName: string|undefined = process.env.TODOS_TABLE_NAME;


export class Service{
	
	async getTodo( id:string ): Promise<Todo> {
		
		const getCommand = new GetCommand({
			TableName: tableName,
			Key: {
				id: id,
			}
		});
		
		const response = await docClient.send( getCommand );
		console.log(response);
		
		if( !response.Item ){
			throw new Error();
		}
		
		const todo:Todo = response.Item as Todo;
		return todo;
		
	}
	async createTodo( todo:Todo ) {
		
		todo.id = uuid();
		
		const putCommand = new PutCommand({
			TableName: tableName,
			Item: todo,
		});
		
		await docClient.send( putCommand );
		
		return todo;
		
	}
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ){
		
		const updateCommand = new UpdateCommand({
			TableName: tableName,
			Key: { id: id },
			UpdateExpression: this.getUpdateExpression( todoUpdateRequest ),
			ExpressionAttributeValues: this.getExpressionAttributeValues( todoUpdateRequest ),
			ReturnValues: "ALL_NEW",
		});
		
		const response = await docClient.send( updateCommand );
		console.log( response );
		
		const updatedTodo:Todo = response.Attributes as Todo;
		return updatedTodo;
		
	}
	
	
	getUpdateExpression( object:Object ): string{
		
		/*
			need to turn this:
				{
					name: "Andrey",
					address: "123 Street Drive"
				}
			
			into this:
				SET name = :name, address = :address
			
			
		*/
		
		const updateExpressions:string[] = [];
		
		let fieldName: keyof typeof object;
		for ( fieldName in object )
		{
			//const fieldValue = object[fieldName];
			
			//example of one expression: 
			//	address = :address
			
			const updateExpression = fieldName + " = " + ":" + fieldName;
			updateExpressions.push( updateExpression );
		}
		
		const updateExpression:string = "SET " + updateExpressions.join(", ");
		return updateExpression;
		
	}

	getExpressionAttributeValues( object:Object ): object{
		
		/*
			need to turn this:
				{
					name: "Andrey",
					address: "123 Street Drive"
				}
			
			into this:
				{
					":name" : "Andrey",
					":address " : "123 Street Drive" ,
				}
			
			
		*/
		
		const expressionAttributeValues: Record<string,any> = {};
		//const expressionAttributeValues: {[k: string]: any} = {};
		
		let fieldName: keyof typeof object;
		for ( fieldName in object )
		{
			const fieldValue = object[fieldName];
			
			
			const key = ":" + fieldName;
			expressionAttributeValues[key] = fieldValue;
			
		}
		
		return expressionAttributeValues;
		
	}
	
	async deleteTodo( id:string ) {
		
		const todo:Todo = await this.getTodo(id);
		
		const deletedCommand = new DeleteCommand({
			TableName: tableName,
			Key: {
				id: id,
			},
		});
		
		await docClient.send( deletedCommand );
		
		return todo;
		
	}
	
	
	async getAllTodos() : Promise<Todo[]> {
		
		const scanCommand = new ScanCommand({
			TableName: tableName,
		});
		
		const response = await client.send( scanCommand );
		console.log(response);
		
		if( !response.Items ){
			throw new Error("failed to get stuff from DB");
		}
		
		
		// const todos:Todo[] = response.Items
		// 	.map( item => { 
		// 		return item as Todo 
		// 	});
		
		const todos:Todo[] = response.Items as Todo[];
		return todos;
		
	}
	
	
}