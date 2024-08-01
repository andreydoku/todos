import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Todo } from '../models/Todo';
import { RestClient } from '../restClient/RestClient';
import { TodoUpdateRequest } from '../models/TodoUpdateRequest';
import { RestClientMocked } from '../restClient/RestClientMocked';


type TodoProviderProps = {
	children: React.ReactNode;
}

export type TodosState = {
	todos: Todo[],
	sortOrder: string[]
	doneChanged: ( id:string , newDone:boolean ) => Promise<void>,
	titleChanged: ( id:string , newTitle:string ) => Promise<void>,
	dateChanged: ( id:string , newDate:string|null ) => Promise<void>,
	deleteClicked: ( id:string ) => Promise<void>,
	addTask: (title:string, doDate?:string) => Promise<void>,
}





const TodoContext = createContext<TodosState>({

	todos: [],
	sortOrder: [],
	doneChanged: async (_id: string, _: boolean) => {},
	titleChanged: async ( _id:string , _newTitle:string ) => {},
	dateChanged: async ( _id:string , _newDate:string|null ) => {},
	deleteClicked: async ( _id:string ) => {},
	addTask: async ( _title:string , _doDate?:string ) => {},

});

export default function TodoProvider({ children }: TodoProviderProps) {
	
	const [todos, setTodos] = useState<Todo[]>([]);
	const [_, forceUpdate] = useReducer(x => x + 1, 0);
	
	const [sortOrder, setSortOrder] = useState([
		"bcc4bd70-816e-42a9-a62e-61a6d3a4e974", //clean room
		"8cd3e932-c155-40a5-965e-7abcc78f39f8", //clean kitchen
		"87809db0-017a-49ae-9787-ed9bc6cc5b06", //update resume
		"4548c9fd-0a63-4f80-85ec-ed6fbda61ee1", //apply for jobs
		"71fa9826-3c83-4a1d-9b37-9e7f94901c05", //buy workout clothes
		"d850329b-bde1-44d8-b8c5-ffd7383e2d39", //workout
	]);
	
	
	
	useEffect( () => {
		fetchAllTodos();
	} , [] );
	
	//const todosRestClient:RestClient = new RestClient();
	const todosRestClient:RestClient = new RestClientMocked();
	
	
	const fetchAllTodos = async () => {
		
		const fetchedTodos:Todo[] = await todosRestClient.getAllTodos();
		const sortedTodos = applySortOrder( fetchedTodos , sortOrder );
		
		setTodos( sortedTodos );
		
	};
	function applySortOrder( todos:Todo[] , sortOrder:string[] ): Todo[]{
		
		if( todos.length != sortOrder.length ){
			console.error( "todos count and sortOrder count mismatch!" );
			return todos;
		}
		
		const sortedTodos:Todo[] = [];
		for( let i=0; i<sortOrder.length; i++ ){
			
			const id = sortOrder[i];
			const todo:Todo|undefined = todos.find( todo => todo.id == id );
			if( todo == undefined ){
				console.error( "id not found: " + id );
				return todos;
			}
			
			sortedTodos.push( todo );
			
		}
		
		return sortedTodos;
	}
	
	
	const updateTodo = async ( id:string , todoUpdateRequest:TodoUpdateRequest ) => {
		
		
		const index = todos.findIndex( todo => id == todo.id );
		const updatedTodo = todos[index];
		
		const{ title , doDate , done } = todoUpdateRequest;
		
		if( title  != null && title  != undefined )	updatedTodo.title = title;
		if( doDate != null && doDate != undefined )	updatedTodo.doDate = doDate;
		if( done   != null && done   != undefined )	updatedTodo.done = done;
		
		todos[index] = updatedTodo;
		setTodos( todos );
		
		
		
		
		
		try{
			const updatedTodo = await todosRestClient.updateTodo( id , todoUpdateRequest );
			
			const index = todos.findIndex( todo => todo.id === id );
			const newTodos = [...todos];
			newTodos[index] = updatedTodo;
			setTodos(newTodos);
		}
		catch( error ){
			forceUpdate();
			throw error;
		}
		
		
	}
	
	const doneChanged = async ( id:string , newDone:boolean ) => {
		
		console.log("doneChanged: " + newDone + ", " + id );
		
		updateTodo( id , { done: newDone } );
		
	}
	
	async function titleChanged( id:string , newTitle:string ){
		
		console.log( "title changed: " 
			+ "\n\t" + "new title: " + newTitle 
			+ "\n\t" + "id: " + id 
		);
		
		//handle 400 errors? like if title is empty?
		updateTodo( id , { title: newTitle } );
		
	}
	
	async function dateChanged( id:string , newDate:string|null ){
		
		console.log( "doDate changed: " 
			+ "\n\t" + "new doDate: " + newDate 
			+ "\n\t" + "id: " + id 
		);
		
		//handle 400 errors? like if title is empty?
		updateTodo( id , { doDate: newDate } );
		
	}
	
	async function deleteClicked( id:string ){
		
		console.log( "delete clicked: " 
			+ "\n\t" + "id: " + id
		);
		
		const deletedTodo = await todosRestClient.deleteTodo( id );
		
		const newTodos = todos.filter( todo => todo.id !== deletedTodo.id );
  		setTodos(newTodos);
		
	}
	
	async function addTask( title:string , doDate?:string){
		
		console.log( "add task clicked" );
		
		const newTodo = {
			title: title,
			done: false,
			doDate: doDate
		} as Todo;
		
		const addedTodo = await todosRestClient.addTodo( newTodo );
		console.log( addedTodo );
		
		const newTodos = [...todos];
		newTodos.push( addedTodo );
		
		setTodos( newTodos );
		
	}


	// Example use case:
	// const { todos, doneChanged , titleChanged, dateChanged, deleteClicked, addTask } = useTodos();


	
	return (
		<TodoContext.Provider value={{
			todos,
			sortOrder,
			doneChanged,
			titleChanged,
			dateChanged,
			deleteClicked,
			addTask
		}}>
			{children}
		</TodoContext.Provider>
	)
}

export const useTodos = () => useContext(TodoContext)