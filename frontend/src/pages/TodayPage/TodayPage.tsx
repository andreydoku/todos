import dayjs, { Dayjs } from "dayjs";

import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";


import "./TodayPage.scss";
import { getToday } from "../../utils/utils";


export default function TodayPage() {
	
	const todayDate:Dayjs = getToday();
	const todayDateString = todayDate.format('YYYY-MM-DD');
	
	const title = todayDate.format('MMM D, YYYY');
	
	
	const { dateChanged , addTask } = useTodos();
	
	
	return (
		<div className="today-page">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				<TodoList
					id="TodoList-today"
					title="Today"
					filter={ todo => todo.doDate == todayDateString }
					droppedOn={ todo => dateChanged( todo.id , todayDateString ) }
					addTaskClicked={ () => addTask( "new task" , todayDateString )}
					hideDate
				/>
				<TodoList
					id="TodoList-backlog"
					title="Backlog"
					filter={ todo => !todo.doDate && !todo.done }
					droppedOn={ todo => dateChanged( todo.id , null ) }
					addTaskClicked={ () => addTask( "new task" )}
					hideDate
				/>
				
				
				
			</TodoBoard>
			
		</div>
	)
}




