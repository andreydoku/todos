import dayjs, { Dayjs } from "dayjs";
import { TodosState } from "../../main";
import { Todo } from "../../models/Todo";
import { datejsToString } from "../../utils/utils";
import DraggableSortableTodoBoard from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";

import "./ThreeDayPage.scss";


export default function ThreeDayPage({ todosState }: {todosState:TodosState}) {
	
	const { todos , dateChanged } = todosState;
	
	const title = "3-Day View";
	
	const day1:Dayjs = dayjs();
	const day2:Dayjs = day1.add( 1 , 'day' );
	const day3:Dayjs = day1.add( 2 , 'day' );
	
	const todos1:Todo[] = todos.filter( todo => todo.doDate == day1.format('YYYY-MM-DD') );
	const todos2:Todo[] = todos.filter( todo => todo.doDate == day2.format('YYYY-MM-DD') )
	const todos3:Todo[] = todos.filter( todo => todo.doDate == day3.format('YYYY-MM-DD') )
	
	function droppedOnList( todoId:string , listId:string , index:number ){
		
		console.log("droppedOnList: " + listId + ", " + index + ", " + "todoId");
		
		let newDoDate = null;
		switch( listId ){
			case "day1": newDoDate = day1; break;
			case "day2": newDoDate = day2; break;
			case "day3": newDoDate = day3; break;
			default: {
				console.error("unrecognized listId: " + listId)
				return;
			}
		}
		
		dateChanged(todoId , datejsToString( newDoDate ) );
		
	}

	
	return (
		<div className="three-day-page">
			<h1 className="title">{title}</h1>
			
			<DraggableSortableTodoBoard 
				draggableLists={[
					{
						id: "day1",
						title: "Today",
						todos: todos1
					},
					{
						id: "day2",
						title: "Tomorrow",
						todos: todos2
					},
					{
						id: "day3",
						title: getDayOfWeek(day3),
						todos: todos3
					}
				]}
				droppedOnList={droppedOnList}
				todosState={todosState}
			/>
			
		</div>
	)
}


function getDayOfWeek(date:Dayjs){
	const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const dayOfWeek:number = date.day();
	
	return weekdays[dayOfWeek];
}
