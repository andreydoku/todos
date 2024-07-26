
import { useState , useEffect } from "react";
import TodoList from "../../components/TodoList/TodoList";
import "./AllPage.scss";
import { Todo } from "../../models/Todo";

import { TodoUpdateRequest } from "../../models/TodoUpdateRequest";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import { TodosRestClient } from "../../restClient/TodosRestClient";
import { TodosState } from "../../main";



export default function AllPage({ todosState }: {todosState:TodosState}) {
	
	const title = "All Tasks";
	
	const { todos , doneChanged , titleChanged , dateChanged , deleteClicked , addTaskClicked } = todosState;
	
	
	
	
	
	
	
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
