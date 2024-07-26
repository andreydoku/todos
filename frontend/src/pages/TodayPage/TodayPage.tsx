

import dayjs, { Dayjs } from "dayjs";
import { TodosState } from "../../main";
import "./TodayPage.scss";

import DraggableTodoBoard from "./DraggableTodoBoard/DraggableTodoBoard";
import { Todo } from "../../models/Todo";



export default function TodayPage({ todosState }: {todosState:TodosState}) {
	
	const todayDate:Dayjs = dayjs();
	
	const title = todayDate.format('MMM D, YYYY');
	
	const { todos , doneChanged , titleChanged , dateChanged , deleteClicked , addTaskClicked } = todosState;
	
	
	
	const todaysTodos:Todo[] = todos.filter( todo => todo.doDate == todayDate.format('YYYY-MM-DD') )
	const backlogTodos:Todo[] = todos.filter( todo => !todo.doDate && !todo.done );
	
	//console.log({ todos , todaysTodos , backlogTodos });
	
	
	function droppedOnList( todoId:string , listId:string , index:number ){
		
		
		let newDate = null;
		
		if( listId == "today" ) newDate = todayDate;
		else if( listId == "backlog" ) newDate = null;
		else console.error("unrecognized listId: " + listId)
		
		console.log({ todayDate:datejsToString(todayDate)  , newDate: datejsToString(newDate) });
		
		dateChanged(todoId , datejsToString( newDate ) );
		
	}
	function datejsToString( dayjs: Dayjs|null ){
		
		if( dayjs == null )  return null;
		return dayjs.format('YYYY-MM-DD');
		
	}
	
	
	return (
		<div className="today-page">
			<h1 className="title">{title}</h1>
			
			<DraggableTodoBoard 
				draggableLists={[
					{
						id: "today",
						title: "Today",
						todos: todaysTodos
					},
					{
						id: "backlog",
						title: "Backlog",
						todos: backlogTodos
					}
				]}
				droppedOnList={droppedOnList}
				todosState={todosState}
			/>
			
			
			

		</div>

	);
}





