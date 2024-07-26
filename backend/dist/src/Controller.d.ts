import { APIGatewayProxyHandler } from 'aws-lambda';
import { Todo } from "./Todo";
export declare const getTodo: APIGatewayProxyHandler;
export declare const createTodo: APIGatewayProxyHandler;
export declare function validateRequestForCreateTodo(todo: Todo): string | null;
export declare const updateTodo: APIGatewayProxyHandler;
export declare const deleteTodo: APIGatewayProxyHandler;
export declare const getAllTodos: APIGatewayProxyHandler;
