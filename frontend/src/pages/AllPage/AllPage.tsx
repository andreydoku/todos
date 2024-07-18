
import { useState , useEffect } from "react";
import TodoList from "../../components/TodoList/TodoList";
import "./AllPage.scss";
import { Todo } from "../../models/Todo";
import { TodosRestClient } from "../../restClient/todosRestClient";



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
	
	
	const checkboxClicked = async ( id:string , checked:boolean ) => {
		
		//const updatedTodo = await todoClient.updateTodo( id , {isDone: checked} );
		const updatedTodo = todos.find( todo => todo.id == id );
		if( updatedTodo == undefined){
			return;
		}
		updatedTodo.done = checked;
		
		const index = todos.findIndex( todo => todo.id === id );
		
		const newTodos = [...todos];
		newTodos[index] = updatedTodo;
  		setTodos(newTodos);
		
	}
	
	async function titleChanged( id, newTitle ){
		
		console.log( "title changed: " 
			+ "\n\t" + "new title: " + newTitle 
			+ "\n\t" + "id: " + id 
		);
		
		// var updatedTodo = await todoApi.updateTodo( id , {title: newTitle} );
		
		// const index = todos.findIndex( todo => todo._id === id );
		
		// const newTodos = [...todos];
		// newTodos[index] = updatedTodo;
		
		// console.log( newTodos );
  		// setTodos(newTodos);
		
	}
	
	async function deleteClicked( id ){
		
		console.log( "delete clicked: " 
			+ "\n\t" + "id: " + id
		);
		
		// const deletedTodo = await todoApi.deleteTodo( id );
		
		// const newTodos = todos.filter( todo => todo._id !== deletedTodo._id );
  		// setTodos(newTodos);
		
	}
	
	return (
		<div className="all-page">
			<h1>{title}</h1>
			
			<TodoList 
				todos={todos} 
				checkboxClicked={ (id,checked)=>checkboxClicked(id,checked) }
				titleChanged={ (id,newTitle) => titleChanged(id,newTitle) }
				deleteClicked={ (id) => deleteClicked(id) }
			/>
			
		</div>
	)
}
