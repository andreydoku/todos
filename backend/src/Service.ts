import { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand, ScanCommand, UpdateItemCommand, UpdateItemCommandOutput, ReturnValue } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { uuid } from 'uuidv4';
import { Todo, newTodo } from "./Todo";


const db = new DynamoDBClient({});
const tableName:string|undefined = process.env.TODOS_TABLE_NAME;


export class Service{
	
	async getTodo(id:string) : Promise<Todo> {
		
		const params = {
            TableName: tableName,
            Key: marshall({ id: id }),
        };
        let { Item } = await db.send(new GetItemCommand(params));
		
		if( !Item ){
			throw new Error("failed to get stuff from DB");
		}
		
		const unmarshalledItem = unmarshall(Item);
		
		const todo:Todo = newTodo(unmarshalledItem);
		return todo;
		
	}
	async createTodo( todo:Todo ) : Promise<Todo> {
		
		console.log("service.createTodo. " + "tableName: " + tableName);
		
		todo.id = uuid();
		
		const params = {
            TableName: tableName,
            Item: marshall(todo || {}),
        };
		
		await db.send(new PutItemCommand(params));
		
		return todo;
		
	}
	async updateTodo( id:string , title: string ){
		
		const params = {
            TableName: tableName,
            Key: marshall({ id: id }),
			UpdateExpression: 'set title = :title',
			ExpressionAttributeValues: {
				':title': marshall(title),
			},
			ReturnValues: ReturnValue.ALL_NEW,
        };
        const result:UpdateItemCommandOutput = await db.send(new UpdateItemCommand(params));
		console.log({result})
		return result;
		
	}
	async deleteTodo( id:string ): Promise<Todo>{
		
		const todo:Todo = await this.getTodo(id);
		
		const params = {
            TableName: tableName,
            Key: marshall({ id: id }),
        };
        await db.send(new DeleteItemCommand(params));
		
		return todo;
		
	}
	
	
	async getAllTodos() : Promise<Todo[]> {
		
		const params = {
            TableName: tableName,
        };
		const { Items } = await db.send(new ScanCommand(params));
		
		
		if( !Items ){
			throw new Error("failed to get stuff from DB");
		}
		
		
		const todos:Todo[] = Items
			.map( item => unmarshall(item) )
			.map( unmarshalledItem => newTodo(unmarshalledItem) );
		
		return todos;
	}
	
	
}