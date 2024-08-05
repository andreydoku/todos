import dayjs, { Dayjs } from "dayjs";

import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";


import "./TodayPage.scss";


export default function TodayPage() {
	
	const todayDate:Dayjs = dayjs();
	const todayDateString = todayDate.format('YYYY-MM-DD');
	
	const title = todayDate.format('MMM D, YYYY');
	
	
	const { dateChanged , addTask } = useTodos();
	
	
	return (
		<div className="today-page">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				<TodoList
					id="today"
					title="Today"
					filter={ todo => todo.doDate == todayDateString }
					droppedOn={ todo => dateChanged( todo.id , todayDateString ) }
					addTaskClicked={ () => addTask( "new task" , todayDateString )}
				/>
				<TodoList
					id="backlog"
					title="Backlog"
					filter={ todo => !todo.doDate && !todo.done }
					droppedOn={ todo => dateChanged( todo.id , null ) }
					addTaskClicked={ () => addTask( "new task" )}
				/>
				
				
				
			</TodoBoard>
			
		</div>
	)
}




