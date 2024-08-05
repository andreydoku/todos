
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";


import "./AllPage.scss";


export default function AllPage() {
	
	
	const title = "All";
	
	const { addTask } = useTodos();
	
	
	return (
		<div className="all-page">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				<TodoList
					id="all"
					title="All"
					filter={ (_todo) => true }
					droppedOn={ (_todo) => {} }
					addTaskClicked={ () => addTask( "new task" )}
				/>
				
			</TodoBoard>
			
		</div>
	)
}




