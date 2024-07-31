import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Todo } from '../models/Todo';
import { RestClient } from '../restClient/RestClient';
import { TodoUpdateRequest } from '../models/TodoUpdateRequest';


type TodoProviderProps = {
	children: React.ReactNode;
}

export type TodosState = {
	todos: Todo[]
	doneChanged: ( id:string , newDone:boolean ) => Promise<void>;
	titleChanged: ( id:string , newTitle:string ) => Promise<void>;
	dateChanged: ( id:string , newDate:string|null ) => Promise<void>;
	deleteClicked: ( id:string ) => Promise<void>;
	addTask: (title:string, doDate?:string) => Promise<void>;
}





const TodoContext = createContext<TodosState>({

	todos: [],
	doneChanged: async (id: string, newDone: boolean) => {},
	titleChanged: async ( id:string , newTitle:string ) => {},
	dateChanged: async ( id:string , newDate:string|null ) => {},
	deleteClicked: async ( id:string ) => {},
	addTask: async (title:string, doDate?:string) => {},

});

export default function TodoProvider({ children }: TodoProviderProps) {
	
	const [todos, setTodos] = useState<Todo[]>([]);
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	
	useEffect( () => {
		fetchAllTodos();
	} , [] );
	
	const todosRestClient:RestClient = new RestClient();
	
	const fetchAllTodos = async () => {
		
		const fetchedTodos:Todo[] = await todosRestClient.getAllTodos();
		setTodos( fetchedTodos );
	};
	
	
	const updateTodo = async ( id:string , todoUpdateRequest:TodoUpdateRequest ) => {
		
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