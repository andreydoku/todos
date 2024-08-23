import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Todo } from "./Todo";
import { Service } from "./Service";
import { validateDate, validateTodoUpdateRequest } from './Validator';
import { TodoUpdateRequest } from './TodoUpdateRequest';
import { SortOrder } from './SortOrder';



const service:Service = new Service();

const CORS_HEADERS = {
	"Access-Control-Allow-Origin": '*',
	"Access-Control-Allow-Credentials": true,
}

// GET /todos/{id}
export const getTodo: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	const id:string|undefined = event?.pathParameters?.id;
	console.log( "received GET /todos/{id} request.  ID: " + id );
	
	if( id == undefined ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "ID path parameter required"
			})
		};
	}
	
	try {
		const todo:Todo = await service.getTodo(id);
		
		const response = {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify( todo )
		};
		return response;
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to get Todo.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}

// POST /todos
export const createTodo: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	console.log( "received POST /todos request." );
	
	if(!event.body ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body must contain todo data",
			})
		};
	}
	
	let requestBody;
	try {
        requestBody = JSON.parse(event.body);
    } 
	catch (e: any) {
        
		console.error(e);

		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body is not a valid JSON format",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
		
    }
	
	const validationError = validateTodoUpdateRequest(requestBody);
	if( validationError ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: validationError,
			})
		};
	}
	
	const todo:Todo = requestBody as Todo;
	
	
	try {
		
		const createdTodo = await service.createTodo(todo);
		
		return {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify( createdTodo )
		};
		
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to create Todo.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}


// POST /todos/{id}
export const updateTodo: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	const id:string|undefined = event?.pathParameters?.id;
	console.log( "received POST /todos/{id} request. ID: " + id );
	
	
	if( id == undefined ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "ID path parameter required",
			})
		};
	}
	
	if( !event.body ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body required",
			})
		};
	}
	
	let requestBody;
	try {
        requestBody = JSON.parse(event.body);
    } 
	catch (e: any) {
        
		console.error(e);

		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body is not a valid JSON format",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
		
    }
	
	const validationError = validateTodoUpdateRequest(requestBody);
	if( validationError ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: validationError,
			})
		};
	}
	
	const todoUpdateRequest:TodoUpdateRequest = requestBody as TodoUpdateRequest;
	
	try {
		
		const result = await service.updateTodo(id, todoUpdateRequest);
		
		return {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify(result)
		};
		
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to update Todo.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}

// DELETE /todos/{id}
export const deleteTodo: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	const id:string|undefined = event?.pathParameters?.id;
	console.log( "received DELETE /todos request. ID: " + id );
	
	
	if( id == undefined ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "ID path parameter required",
			})
		};
	}
	
	
	try {
		
		const deletedTodo = await service.deleteTodo(id);
		
		return {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify( deletedTodo )
		};
		
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to delete Todo.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}

// GET /todos
export const getAllTodos: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	console.log( "received GET /todos" );
	
	try {
		
		const Todos:Todo[] = await service.getAllTodos();
		
		const response = {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify( Todos )
		};
		return response;
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to retrieve Todos.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
};





// GET /sortOrder
export const getSortOrder: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	try {
		const sortOrder:SortOrder = await service.getSortOrder();
		
		const response = {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify( sortOrder )
		};
		return response;
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to get sortOrder.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}

// POST /sortOrder
export const updateSortOrder: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	
	console.log( "received POST /sortOrder request." );
	
	if( !event.body ){
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body required",
			})
		};
	}
	
	let requestBody;
	try {
        requestBody = JSON.parse(event.body);
    } 
	catch (e: any) {
        
		console.error(e);

		return {
			statusCode: 400,
			body: JSON.stringify({
				message: "Request body is not a valid JSON format",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
		
    }
	
	try {
		
		const result = await service.updateSortOrder(requestBody);
		
		return {
			statusCode: 200,
			headers: CORS_HEADERS,
			body: JSON.stringify(result)
		};
		
	}
	catch(e: any) {

		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to update sort order.",
				errorMsg: e.message,
				errorStack: e.stack,
			})
		};
	}
	
}