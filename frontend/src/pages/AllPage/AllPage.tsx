

import TodoList from "../../components/TodoList/TodoList";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import { TodosState } from "../../main";

import "./AllPage.scss";

export default function AllPage({ todosState }: {todosState:TodosState}) {
	
	const title = "All Tasks";
	
	const { todos , doneChanged , titleChanged , dateChanged , deleteClicked , addTask } = todosState;
	
	return (
		<div className="all-page">
			<h1>{title}</h1>
			
			<AddTaskButton onClick={() => addTask("new task")}/>
			
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
