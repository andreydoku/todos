import TodoList from "../../components/TodoList/TodoList";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import { useTodos } from "../../providers/TodoProvider";

import "./AllPage.scss";

export default function AllPage() {
	
	const title = "All Tasks";
	
	const { todos , addTask } = useTodos();
	
	return (
		<div className="all-page">
			<h1>{title}</h1>
			
			<AddTaskButton onClick={() => addTask("new task")}/>
			
			<TodoList 
				todos={todos} 
			/>
		</div>
	)
}
