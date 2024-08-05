import TodoList from "../../components/TodoList/TodoList";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton";
import { useTodos } from "../../providers/TodoProvider";

import "./AllPageOld.scss";

export default function AllPageOld() {
	
	const title = "All Tasks";
	
	const { todos , addTask } = useTodos();
	
	return (
		<div className="all-page-old">
			<h1>{title}</h1>
			
			<AddTaskButton onClick={() => addTask("new task")}/>
			
			<TodoList 
				todos={todos} 
			/>
		</div>
	)
}
