import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { Todo } from '../models/Todo';
import { RestClient } from '../restClient/RestClient';
import { TodoUpdateRequest } from '../models/TodoUpdateRequest';
import { applyTodoUpdateRequest } from '../utils/utils';
// import { RestClientMocked } from '../restClient/RestClientMocked';


type TodoProviderProps = {
	children: React.ReactNode;
}

export type TodosState = {
	todos: Todo[],
	doneChanged: ( id:string , newDone:boolean ) => Promise<void>,
	titleChanged: ( id:string , newTitle:string ) => Promise<void>,
	dateChanged: ( id:string , newDate:string|null ) => Promise<void>,
	deleteClicked: ( id:string ) => Promise<void>,
	addTask: (title:string, doDate?:string) => Promise<void>,
	
	sortOrder: string[],
	moveTodoSortOrder: ( todoMovedId:string , todoMovedOntoId:string ) => Promise<void>,
}


const TodoContext = createContext<TodosState>({

	todos: [],
	doneChanged: async (_id: string, _: boolean) => {},
	titleChanged: async ( _id:string , _newTitle:string ) => {},
	dateChanged: async ( _id:string , _newDate:string|null ) => {},
	deleteClicked: async ( _id:string ) => {},
	addTask: async ( _title:string , _doDate?:string ) => {},
	
	sortOrder: [],
	moveTodoSortOrder: async (_todoMovedId: string, _todoMovedOntoId: string) => {},

});

export default function TodoProvider({ children }: TodoProviderProps) {
	
	const [todos, setTodos] = useState<Todo[]>( [] );
	const [_, forceUpdate] = useReducer(x => x + 1, 0);
	
	const [sortOrder, setSortOrder] = useState<string[]>( [] );
	//console.log({ todos , sortOrder });
	
	
	useEffect( () => {
		
		const fetchData = async () => {
			const fetchedTodos = await fetchAllTodos();
			const fetchedSortOrder = await fetchSortOrder();
			
			const sortedTodos = applySortOrder( fetchedTodos , fetchedSortOrder );
			
			setTodos( sortedTodos );
			setSortOrder( fetchedSortOrder );
			
		}
		fetchData();
		
	} , [] );
	
	const todosRestClient:RestClient = new RestClient();
	// const todosRestClient:RestClient = new RestClientMocked();
	
	async function fetchAllTodos():Promise<Todo[]> {
		const fetchedTodos:Todo[] = await todosRestClient.getAllTodos();
		return fetchedTodos;
	}

	async function fetchSortOrder(): Promise<string[]> {
		
		const fetchedSortOrder:string[] = await todosRestClient.getSortOrder();
		return fetchedSortOrder;
		
	};
	
	function applySortOrder( todos:Todo[] , sortOrder:string[] ): Todo[] {
		
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
	
	
	async function moveTodoSortOrder( todoMovedId:string , todoMovedOntoId:string ){
		
		if( todoMovedId == todoMovedOntoId ){
			//item wasnt moved
			return;
		}
		
		const todoMoved = todos.find( todo => todo.id == todoMovedId );
		if( !todoMoved ){
			console.error( "moveTodoSortOrder - failed to find todo with ID: " + todoMovedId );
			return;
		}
		const todoMovedOnto = todos.find( todo => todo.id == todoMovedOntoId );
		if( !todoMovedOnto ){
			console.error( "moveTodoSortOrder - failed to find todo with ID: " + todoMovedOntoId );
			return;
		}
		
		console.log( "sorting moved: " + todoMoved.title + " => " + todoMovedOnto.title );
		
		
		const fromIndex = sortOrder.indexOf( todoMovedId );
		const toIndex = sortOrder.indexOf( todoMovedOntoId );
		
		sortOrder.splice( fromIndex , 1 );
    	sortOrder.splice( toIndex , 0 , todoMovedId );
		
		todos.splice( fromIndex , 1 );
    	todos.splice( toIndex , 0 , todoMoved );
		
		setSortOrder( sortOrder );
		setTodos( todos );
		
		
		
		try{
			const updatedSortOrder:string[] = await todosRestClient.updateSortOrder({ sortOrder });
			setSortOrder( updatedSortOrder );
		}
		catch( error ){
			forceUpdate();
			throw error;
		}
		
	}
	
	
	const updateTodo = async ( id:string , todoUpdateRequest:TodoUpdateRequest ) => {
		
		const index = todos.findIndex( todo => id == todo.id );
		const updatedTodo = todos[index];
		
		applyTodoUpdateRequest( updatedTodo , todoUpdateRequest );
		console.log({ todoUpdateRequest , updatedTodo })
		
		todos[index] = updatedTodo;
		setTodos( todos );
		
		
		//this part needs to be done async
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
		
		const sortOrder = await fetchSortOrder();
		setSortOrder( sortOrder );
		
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
		
		
		const sortOrder = await fetchSortOrder();
		setSortOrder( sortOrder );
		
		
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
			addTask,
			
			sortOrder,
			moveTodoSortOrder,
		}}>
			{children}
		</TodoContext.Provider>
	)
}

export const useTodos = () => useContext(TodoContext)