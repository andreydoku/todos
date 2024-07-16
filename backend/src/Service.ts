import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand , DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { uuid } from 'uuidv4';
import { Todo} from "./Todo";


const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName: string|undefined = process.env.TODOS_TABLE_NAME;


export class Service{
	
	async getTodo(id:string): Promise<Todo> {
		
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
	async updateTodo( id:string , title: string ){
		
		const updateCommand = new UpdateCommand({
			TableName: tableName,
			Key: { 
				id: id
			},
			UpdateExpression: "SET title = :title",
			ExpressionAttributeValues: {
				":title": title,
			},
			ReturnValues: "ALL_NEW",
		});
		
		
		const response = await docClient.send( updateCommand );
		console.log( response );
		
		const updatedTodo:Todo = response.Attributes as Todo;
		return updatedTodo;
		
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