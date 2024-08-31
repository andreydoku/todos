import { Dayjs } from "dayjs";
import { Todo } from "../models/Todo";
import { TodoUpdateRequest } from "../models/TodoUpdateRequest";
import { applyTodoUpdateRequest, getToday } from "../utils/utils";
import { RestClient } from "./RestClient";


const day1:Dayjs = getToday();
const day2:Dayjs = day1.add( 1 , 'day' );
const day3:Dayjs = day1.add( 2 , 'day' );

const dayString1:string = day1.format('YYYY-MM-DD');
const dayString2:string = day2.format('YYYY-MM-DD');
const dayString3:string = day3.format('YYYY-MM-DD');



export class RestClientMocked extends RestClient {
	
	
	todos:Todo[] = [
		{ "id": "87809db0-017a-49ae-9787-ed9bc6cc5b06", "doDate": dayString3, "done": false, "title": "update resume"       },
		{ "id": "bcc4bd70-816e-42a9-a62e-61a6d3a4e974", "doDate": dayString1, "done": true , "title": "clean room"          },
		{ "id": "71fa9826-3c83-4a1d-9b37-9e7f94901c05", "doDate": dayString2, "done": false, "title": "buy workout clothes" },
		{ "id": "d850329b-bde1-44d8-b8c5-ffd7383e2d39", "doDate": dayString2, "done": false, "title": "workout"             },
		{ "id": "4548c9fd-0a63-4f80-85ec-ed6fbda61ee1", "doDate": dayString3, "done": false, "title": "apply for jobs"      },
		{ "id": "8cd3e932-c155-40a5-965e-7abcc78f39f8", "doDate": dayString1, "done": false, "title": "clean kitchen"       }
	]
	
	async getAllTodos(): Promise<Todo[]> {
		
		return new Promise((resolve, _reject) => {
			
			resolve( this.todos );
			
		});
		
	}
	
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ): Promise<Todo> {
		
		return new Promise((resolve, _reject) => {
			
			const index = this.todos.findIndex( todo => id == todo.id );
			const updatedTodo = this.todos[index];
			
			applyTodoUpdateRequest( updatedTodo , todoUpdateRequest );
			
			this.todos[index] = updatedTodo;
			
			resolve( updatedTodo );
			
		});
		
	}
	
	async deleteTodo( _id:string ): Promise<Todo> {
		
		return new Promise((_resolve, reject) => {
			reject("delete not supported in mocked rest client")
		});
		
	}
	
	async addTodo( _todo:Todo ): Promise<Todo> {
		
		return new Promise((_resolve, reject) => {
			reject("add not supported in mocked rest client")
		});
		
	}
	
}
