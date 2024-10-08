import { AttributeValue, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand , DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { uuid } from 'uuidv4';
import { Todo } from "./Todo";
import { TodoUpdateRequest } from "./TodoUpdateRequest";
import { SortOrder } from "./SortOrder";
import { getExpressionAttributeValues, getUpdateExpression } from "./DynamoUtils";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName: string|undefined = process.env.TODOS_TABLE_NAME;

const SORT_ORDER_ID = "_sortOrder";

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
	async createTodo( todo:Todo ): Promise<Todo> {
		
		todo.id = uuid();
		
		const putCommand = new PutCommand({
			TableName: tableName,
			Item: todo,
		});
		
		await docClient.send( putCommand );
		
		
		const sortOrder:SortOrder = await this.getSortOrder();
		sortOrder.sortOrder.push( todo.id );
		await this.updateSortOrder(sortOrder);
		
		
		return todo;
		
	}
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ): Promise<Todo> {
		
		const updateCommand = new UpdateCommand({
			TableName: tableName,
			Key: { id: id },
			UpdateExpression: getUpdateExpression( todoUpdateRequest ),
			ExpressionAttributeValues: getExpressionAttributeValues( todoUpdateRequest ),
			ReturnValues: "ALL_NEW",
		});
		
		const response = await docClient.send( updateCommand );
		console.log( response );
		
		const updatedTodo:Todo = response.Attributes as Todo;
		return updatedTodo;
		
	}
	async deleteTodo( id:string ): Promise<Todo> {
		
		const todo:Todo = await this.getTodo(id);
		
		const deletedCommand = new DeleteCommand({
			TableName: tableName,
			Key: {
				id: id,
			},
		});
		
		await docClient.send( deletedCommand );
		
		
		const sortOrder:SortOrder = await this.getSortOrder();
		sortOrder.sortOrder = sortOrder.sortOrder.filter( id1 => id1 != id );
		await this.updateSortOrder(sortOrder);
		
		
		return todo;
		
	}
	async getAllTodos(): Promise<Todo[]> {
		
		const scanCommand = new ScanCommand({
			TableName: tableName,
			FilterExpression: "id <> :id",
			ExpressionAttributeValues: {
				":id": SORT_ORDER_ID
			},
		});
		
		const response = await client.send( scanCommand );
		console.log(response);
		
		if( !response.Items ){
			throw new Error("failed to get stuff from DB");
		}
		
		const todos:Todo[] = response.Items as Todo[];
		return todos;
		
	}
	
	
	
	async getSortOrder(): Promise<SortOrder> {
		
		const id = SORT_ORDER_ID;
		
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
		
		const responseItem = response.Item;
		delete responseItem.id;
		
		const sortOrder:SortOrder = responseItem as SortOrder;
		return sortOrder;
		
	}
	async updateSortOrder( sortOrder:SortOrder ): Promise<SortOrder> {
		
		const id = SORT_ORDER_ID;
		
		const updateCommand = new UpdateCommand({
			TableName: tableName,
			Key: { id: id },
			UpdateExpression: getUpdateExpression( sortOrder ),
			ExpressionAttributeValues: getExpressionAttributeValues( sortOrder ),
			ReturnValues: "ALL_NEW",
		});
		
		const response = await docClient.send( updateCommand );
		console.log( response );
		
		
		const responseAttributes = response.Attributes;
		delete responseAttributes?.id;
		
		const updatedSortOrder:SortOrder = responseAttributes as SortOrder;
		return updatedSortOrder;
		
	}
	
	
}