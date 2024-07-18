import { Todo } from "../models/Todo";

const hostUrl = "https://p6pfqhi6ok.execute-api.us-east-1.amazonaws.com";



export class TodosRestClient {
	
	async getAllTodos(): Promise<Todo[]> {
		
		const url = hostUrl + "/todos";
		
		try {
			const response = await fetch( url , {
				method: "GET"
			});
			
			if (!response.ok) {
			  throw new Error(`Response status: ${response.status}`);
			}
		
			const json = await response.json();
			console.log(json);
			
			return json as Todo[];
			
		  } 
		  catch (error) {
			console.error(error.message);
			throw error;
		  }
	}
	
}
