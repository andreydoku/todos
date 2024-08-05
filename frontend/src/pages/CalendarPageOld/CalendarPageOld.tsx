import dayjs, { Dayjs } from "dayjs";

import { getMondayOf, isToday } from "../../utils/utils";
import DraggableSortableTodoBoard from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";
import { DraggableSortableList } from "../../components/DraggableSortableTodoBoard/DraggableSortableTodoBoard";
import { useTodos } from "../../providers/TodoProvider";


import "./CalendarPageOld.scss";


export default function CalendarPageOld() {
	
	const { todos , dateChanged , addTask } = useTodos();
	
	const title = "Calendar (Old)";
	
	const today:Dayjs = dayjs();
	const thisMonday:Dayjs = getMondayOf( today );
	
	//const tomorrow = thisMonday.add( 1 ,"day");
	//for( let i = 0; )
	
	const days = Array.from({ length: 7*3 }, (_, i) => thisMonday.add(i, "days"));
	const draggableLists:DraggableSortableList[] = days.map( (day:Dayjs) => 
		{
			const dayString = day.format('YYYY-MM-DD');
			const draggableList:DraggableSortableList = {
				id: dayString,
				title: getDayLabel(day),
				todos: todos.filter( todo => todo.doDate == dayString ),
				addTaskClicked: () => addTask("new task" , dayString ),
				className: isToday(day) ? "today" : "",
			}
			return draggableList;
			
		}
	);
	draggableLists.push( {
		id: "backlog",
		title: "",
		todos: todos.filter( todo => !todo.doDate && !todo.done ),
		addTaskClicked: () => addTask( "new task" ),
		className: "backlog",
	} )
	
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
		
		if( listId == "backlog" ){
			dateChanged(todoId , null );
		}
		
		dateChanged(todoId , listId );
		
	}
	
	
	return (
		<div className="calendar-page-old">
			<h1 className="title">{title}</h1>
			
			<WeekdayHeaders />
			
			<DraggableSortableTodoBoard 
				draggableLists={draggableLists}
				droppedOnList={droppedOnList}
			/>
			
		</div>
	)
}

function WeekdayHeaders(){
	
	//const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
	//const headers = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun', 'Backlog'];
	const headers = ['Backlog' , 'Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
	
	return(
		<div className="weekday-headers">
			{ headers.map( header =>
				<h2 className={"weekday-header" + (header=="Backlog"?" backlog": "")} key={header} >
					{header}
				</h2>
			)}
		</div>
	);
}

