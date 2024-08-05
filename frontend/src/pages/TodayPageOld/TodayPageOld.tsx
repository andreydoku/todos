

import dayjs, { Dayjs } from "dayjs";
import { Todo } from "../../models/Todo";
import { datejsToString } from "../../utils/utils";
import DraggableSortableTodoBoard from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";
import { useTodos } from "../../providers/TodoProvider";

import "./TodayPageOld.scss";

export default function TodayPageOld() {
	
	const todayDate:Dayjs = dayjs();
	const todayDateString = todayDate.format('YYYY-MM-DD');
	
	const title = todayDate.format('MMM D, YYYY');
	
	const { todos , dateChanged , addTask } = useTodos();
	
	
	
	const todaysTodos:Todo[] = todos.filter( todo => todo.doDate == todayDateString )
	const backlogTodos:Todo[] = todos.filter( todo => !todo.doDate && !todo.done );
	
	//console.log({ todos , todaysTodos , backlogTodos });
	
	
	function droppedOnList( todoId:string , listId:string , index:number ){
		
		let newDate = null;
		
		if( listId == "today" ) newDate = todayDate;
		else if( listId == "backlog" ) newDate = null;
		else console.error("unrecognized listId: " + listId)
		
		console.log({ todayDate:datejsToString(todayDate)  , newDate: datejsToString(newDate) , index });
		
		dateChanged(todoId , datejsToString( newDate ) );
		
	}
	
	
	return (
		<div className="today-page-old">
			<h1 className="title">{title}</h1>
			
			<DraggableSortableTodoBoard 
				draggableLists={[
					{
						id: "today",
						title: "Today",
						todos: todaysTodos,
						addTaskClicked: () => addTask( "new task" , todayDateString ),
					},
					{
						id: "backlog",
						title: "Backlog",
						todos: backlogTodos,
						addTaskClicked: () => addTask( "new task" ),
					}
				]}
				droppedOnList={droppedOnList}
			/>
			

		</div>

	);
}





