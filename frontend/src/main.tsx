import React, { useEffect, useReducer, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import AllPage from './pages/AllPage/AllPage';
import TodayPage from './pages/TodayPage/TodayPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ThreeDayPage from './pages/ThreeDayPage/ThreeDayPage';

import { Todo } from './models/Todo';
import { RestClient } from './restClient/RestClient';
import { TodoUpdateRequest } from './models/TodoUpdateRequest';

import './index.scss';
import CalendarPage from './pages/CalendarPage/CalendarPage';


export default function App() {
	
	// const initialTodos:Todo[] = [
	// 	{ id: "1" , title: "blah 1" , done: false },
	// 	{ id: "2" , title: "blah 2" , done: false },
	// 	{ id: "3" , title: "blah 3" , done: false },
	// ]
	
	const todosRestClient:RestClient = new RestClient();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	
	useEffect( () => {
		fetchAllTodos();
	} , [] );
	
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
	
	
	const todosState:TodosState = { todos, doneChanged , titleChanged , dateChanged , deleteClicked , addTaskClicked };
	
	
	return (
		<Router>
			<NavBar />
			
			<main>
				<Routes>
					<Route path="/" element={<Navigate replace to='/all' />} />
					
					<Route path="/all" element={<AllPage todosState={todosState}/>} />
					<Route path="/today" element={<TodayPage todosState={todosState}/>} />
					<Route path="/three-day" element={<ThreeDayPage todosState={todosState} />} />
					<Route path="/calendar" element={<CalendarPage todosState={todosState} />} />
					
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
				
		</Router>
	)
}

export type TodosState = {
	todos: Todo[]
	doneChanged: ( id:string , newDone:boolean ) => Promise<void>;
	titleChanged: ( id:string , newTitle:string ) => Promise<void>;
	dateChanged: ( id:string , newDate:string|null ) => Promise<void>;
	deleteClicked: ( id:string ) => Promise<void>;
	addTaskClicked: () => Promise<void>;
}


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
