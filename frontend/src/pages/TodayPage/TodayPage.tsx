

import dayjs, { Dayjs } from "dayjs";
import { TodosState } from "../../main";
import { Todo } from "../../models/Todo";
import { datejsToString } from "../../utils/utils";
import DraggableSortableTodoBoard from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";

import "./TodayPage.scss";


export default function TodayPage({ todosState }: {todosState:TodosState}) {
	
	const todayDate:Dayjs = dayjs();
	const todayDateString = todayDate.format('YYYY-MM-DD');
	
	const title = todayDate.format('MMM D, YYYY');
	
	//const { todos , doneChanged , titleChanged , dateChanged , deleteClicked , addTask } = todosState;
	const { todos , dateChanged , addTask } = todosState;
	
	
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
		<div className="today-page">
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
				todosState={todosState}
			/>
			

		</div>

	);
}





