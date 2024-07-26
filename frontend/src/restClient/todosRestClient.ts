import { Todo } from "../models/Todo";
import { TodoUpdateRequest } from "../models/TodoUpdateRequest";

const hostUrl = "https://keiy978fn5.execute-api.us-east-2.amazonaws.com";



export class TodosRestClient {

	async getAllTodos(): Promise<Todo[]> {

		const url = hostUrl + "/todos";

		try {
			const response = await fetch(url, {
				method: "GET",
				mode: "cors",
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			//console.log(json);

			return json as Todo[];

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
	}
	async getTodosForDate( date:Date ): Promise<Todo[]> {
	
		const dateString = date.toISOString().split('T')[0];//ISO format yyyy-mm-dd
		
		const params = new URLSearchParams({
			'date': dateString,
		});
		
		const url = `${hostUrl}/todos?${params}`;
		
		
		try {
			const response = await fetch(url, {
				method: "GET",
				mode: "cors",
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			console.log(json);

			return json as Todo[];

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
	}
	
	
	
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ): Promise<Todo> {
		
		const url = hostUrl + `/todos/${id}`;
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				body: JSON.stringify( todoUpdateRequest )
			});

			if (!response.ok) {
				const json = await response.json();
				throw new Error( `${response.status}: ${JSON.stringify(json)}` );
			}

			const json = await response.json();
			console.log(json);

			return json as Todo;

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
		
	}
	
	async deleteTodo( id:string ): Promise<Todo> {
		
		const url = hostUrl + `/todos/${id}`;
		try {
			const response = await fetch(url, {
				method: "DELETE",
				mode: "cors",
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			console.log(json);

			return json as Todo;

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
		
	}
	
	async addTodo( todo:Todo ): Promise<Todo> {
		
		const url = hostUrl + `/todos`;
		
		
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				body: JSON.stringify(todo)
			});

			if (!response.ok) {
				console.error( response )
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();
			console.log(json);

			return json as Todo;

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
		
	}
	

}
