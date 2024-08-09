import { SortOrder } from "../models/SortOrder";
import { Todo } from "../models/Todo";
import { TodoUpdateRequest } from "../models/TodoUpdateRequest";

const HOST_URL_DEV = "https://keiy978fn5.execute-api.us-east-2.amazonaws.com";
const HOST_URL_PROD = "https://8dlyt37xud.execute-api.us-east-2.amazonaws.com";

const env = import.meta.env.VITE_ENV;
let hostUrl = HOST_URL_DEV;
switch( env ){
	case "local": hostUrl = HOST_URL_DEV; break;
	case "dev"  : hostUrl = HOST_URL_DEV; break;
	case "prod" : hostUrl = HOST_URL_PROD; break;
}


export class RestClient {

	async getAllTodos(): Promise<Todo[]> {

		const url = hostUrl + "/todos";
		const method = "GET";

		try {
			const response = await fetch(url, {
				method: method,
				mode: "cors",
			});

			if (!response.ok) {
				const json = await response.json();
				throw new Error( `${response.status}: ${JSON.stringify(json)}` );
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
	
	async updateTodo( id:string , todoUpdateRequest:TodoUpdateRequest ): Promise<Todo> {
		
		const url = hostUrl + `/todos/${id}`;
		const method = "POST";
		
		try {
			const response = await fetch(url, {
				method: method,
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
		const method = "DELETE";
		
		try {
			const response = await fetch(url, {
				method: method,
				mode: "cors",
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
	
	async addTodo( todo:Todo ): Promise<Todo> {
		
		const url = hostUrl + `/todos`;
		const method = "POST";
		
		try {
			const response = await fetch(url, {
				method: method,
				mode: "cors",
				body: JSON.stringify(todo)
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
	
	
	
	async getSortOrder(): Promise<string[]> {
		
		
		const url = hostUrl + `/sortOrder`;
		const method = "GET";

		try {
			const response = await fetch(url, {
				method: method,
				mode: "cors",
			});

			if (!response.ok) {
				const json = await response.json();
				throw new Error( `${response.status}: ${JSON.stringify(json)}` );
			}

			const json = await response.json();
			return json.sortOrder;

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
	}
	
	async updateSortOrder( sortOrder:SortOrder ): Promise<string[]> {
		
		const url = hostUrl + `/sortOrder`;
		const method = "POST";
		
		try {
			const response = await fetch(url, {
				method: method,
				mode: "cors",
				body: JSON.stringify( sortOrder )
			});

			if (!response.ok) {
				const json = await response.json();
				throw new Error( `${response.status}: ${JSON.stringify(json)}` );
			}

			const json = await response.json();
			return json.sortOrder;

		}
		catch (error: any) {
			console.error(error.message);
			throw error;
		}
		
	}

}
