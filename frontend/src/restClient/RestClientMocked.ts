import { Todo } from "../models/Todo";
import { TodoUpdateRequest } from "../models/TodoUpdateRequest";
import { RestClient } from "./RestClient";





export class RestClientMocked extends RestClient {
	
	todos:Todo[] = [
		{ "id": "87809db0-017a-49ae-9787-ed9bc6cc5b06", "doDate": "2024-08-02", "done": false, "title": "update resume"       },
		{ "id": "bcc4bd70-816e-42a9-a62e-61a6d3a4e974", "doDate": "2024-07-31", "done": true , "title": "clean room"          },
		{ "id": "71fa9826-3c83-4a1d-9b37-9e7f94901c05", "doDate": "2024-08-01", "done": false, "title": "buy workout clothes" },
		{ "id": "d850329b-bde1-44d8-b8c5-ffd7383e2d39", "doDate": "2024-08-01", "done": false, "title": "workout"             },
		{ "id": "4548c9fd-0a63-4f80-85ec-ed6fbda61ee1", "doDate": "2024-08-02", "done": false, "title": "apply for jobs"      },
		{ "id": "8cd3e932-c155-40a5-965e-7abcc78f39f8", "doDate": "2024-07-31", "done": false, "title": "clean kitchen"       }
	]
	
	async getAllTodos(): Promise<Todo[]> {
		
		return new Promise((resolve, reject) => {
			
			resolve( this.todos );
			
		});
		
	}
	
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ): Promise<Todo> {
		
		
		return new Promise((resolve, reject) => {
			
			const index = this.todos.findIndex( todo => id == todo.id );
			const updatedTodo = this.todos[index];
			
			const{ title , doDate , done } = todoUpdateRequest;
		
			if( title  != null && title  != undefined )	updatedTodo.title = title;
			if( doDate != null && doDate != undefined )	updatedTodo.doDate = doDate;
			if( done   != null && done   != undefined )	updatedTodo.done = done;
			
			
			this.todos[index] = updatedTodo;
			
			
			resolve( updatedTodo );
			
		});
		
	}
	
	async deleteTodo( id:string ): Promise<Todo> {
		
		return new Promise((resolve, reject) => {
			reject("delete not supported in mocked rest client")
		});
		
	}
	
	async addTodo( todo:Todo ): Promise<Todo> {
		
		return new Promise((resolve, reject) => {
			reject("add not supported in mocked rest client")
		});
		
	}
	

}
