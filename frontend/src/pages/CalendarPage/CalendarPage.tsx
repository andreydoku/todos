import dayjs, { Dayjs } from "dayjs";
import { TodosState } from "../../main";

import { getMondayOf, isToday } from "../../utils/utils";
import DraggableSortableTodoBoard from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";


import "./CalendarPage.scss";
import { DraggableList } from "../../components/DraggableTodoBoard/DraggableTodoBoard";


export default function CalendarPage({ todosState }: {todosState:TodosState}) {
	
	const { todos , dateChanged } = todosState;
	
	const title = "Calendar";
	
	const today:Dayjs = dayjs();
	const thisMonday:Dayjs = getMondayOf( today );
	
	//const tomorrow = thisMonday.add( 1 ,"day");
	//for( let i = 0; )
	
	const days = Array.from({ length: 7*3 }, (_, i) => thisMonday.add(i, "days"));
	const draggableLists:DraggableList[] = days.map( (day:Dayjs) => 
		{
			const dayString = day.format('YYYY-MM-DD');
			const draggableList:DraggableList = {
				id: dayString,
				title: getDayLabel(day),
				todos: todos.filter( todo => todo.doDate == dayString ),
				className: isToday(day) ? "today" : "",
			}
			return draggableList;
			
		}
	);
	
	function getDayLabel( date:Dayjs ){
		
		if( date.date() == 1 ){
			return date.format("MMM D");
		}
		
		if( date.date() == thisMonday.date() ){
			return date.format("MMM D");
		}
		
		return date.format("D")
		
	}
	
	
	
	function droppedOnList( todoId:string , listId:string , index:number ){
		
		console.log("droppedOnList: " + listId + ", " + index + ", " + "todoId");
		dateChanged(todoId , listId );
		
	}
	
	
	return (
		<div className="calendar-page">
			<h1 className="title">{title}</h1>
			
			<WeekdayHeaders />
			
			<DraggableSortableTodoBoard 
				draggableLists={draggableLists}
				droppedOnList={droppedOnList}
				todosState={todosState}
			/>
			
		</div>
	)
}

function WeekdayHeaders(){
	
	//const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	const weekdays = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
	
	return(
		<div className="weekday-headers">
			{ weekdays.map( weekday =>
				<h2 className="weekday-header">
					{weekday}
				</h2>
			)}
		</div>
	);
}

