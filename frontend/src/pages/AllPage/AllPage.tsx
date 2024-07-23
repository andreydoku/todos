
import { useState , useEffect } from "react";
import TodoList from "../../components/TodoList/TodoList";
import "./AllPage.scss";
import { Todo } from "../../models/Todo";

import { TodoUpdateRequest } from "../../models/TodoUpdateRequest";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import { TodosRestClient } from "../../restClient/TodosRestClient";



export default function AllPage() {
	
	const title = "All Tasks";
	const todosRestClient:TodosRestClient = new TodosRestClient();
	
	// const initialTodos:Todo[] = [
	// 	{ id: "1" , title: "blah 1" , done: false },
	// 	{ id: "2" , title: "blah 2" , done: false },
	// 	{ id: "3" , title: "blah 3" , done: false },
	// ]
	const [ todos , setTodos ] = useState<Todo[]>( [] );
	
	
	useEffect( () => {
		fetchAllTodos();
	} , [] );
	
	const fetchAllTodos = async () => {
		
		const fetchedTodos:Todo[] = await todosRestClient.getAllTodos();
		setTodos( fetchedTodos );
	};
	
	const updateTodo = async ( id:string , todoUpdateRequest:TodoUpdateRequest ) => {
		
		const updatedTodo = await todosRestClient.updateTodo( id , todoUpdateRequest );
		
		const index = todos.findIndex( todo => todo.id === id );
		const newTodos = [...todos];
		newTodos[index] = updatedTodo;
  		setTodos(newTodos);
		
	}
	
	const doneChanged = async ( id:string , newDone:boolean ) => {
		
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
	
	async function addTaskClicked(){
		
		console.log( "add task clicked" );
		
		const newTodo = {
			title: "new task",
			done: false
		} as Todo;
		
		const addedTodo = await todosRestClient.addTodo( newTodo );
		console.log( addedTodo );
		
		const newTodos = [...todos];
		newTodos.push( addedTodo );
		
		setTodos( newTodos );
		
	}
	
	return (
		<div className="all-page">
			<h1>{title}</h1>
			
			<AddTaskButton onClick={() => addTaskClicked()}/>
			
			<TodoList 
				todos={todos} 
				doneChanged={ (id,newDone)=>doneChanged(id,newDone) }
				titleChanged={ (id,newTitle) => titleChanged(id,newTitle) }
				dateChanged={ (id,newDate) => dateChanged(id,newDate) }
				deleteClicked={ (id) => deleteClicked(id) }
			/>
			
		</div>
	)
}
