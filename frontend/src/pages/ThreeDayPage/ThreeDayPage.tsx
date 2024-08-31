import { Dayjs } from "dayjs";

import "./ThreeDayPage.scss";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";
import { Todo } from "../../models/Todo";
import { useState } from "react";
import { getToday } from "../../utils/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DayIcon from "../../NavBar/DayIcon";





export default function ThreeDayPage() {
	
	//const { todos , dateChanged , addTask } = useTodos();
	
	const title = "3-Day View";
	
	const today = getToday();
	
	
	const [day1, setDay1] = useState<Dayjs>( today );
	const days:Dayjs[] = Array.from({ length: 3 }, (_, i) => day1.add(i, "days"));
	
	
	const { dateChanged , addTask } = useTodos();
	function droppedTodoOnList( todo:Todo , dateString:string ){
		
		console.log(`dropped '${todo.title}' onto '${dateString}'.`)
		
		const newDoDate = dateString;
		dateChanged( todo.id , newDoDate );
	}
	
	function leftClicked(){
		setDay1( day1.add(-1,"day") );
	}
	function todayClicked(){
		setDay1( today );
	}
	function rightClicked(){
		setDay1( day1.add(1,"day") );
	}
	
	
	
	return (
		<div className="three-day-page">
			
			<div className="title-bar">
				<h1 className="title">{title}</h1>
				<div className="arrows">
					<div className="arrow-button" onClick={leftClicked}><FaChevronLeft /></div>
					<DayIcon onClick={todayClicked}/>
					<div className="arrow-button" onClick={rightClicked}><FaChevronRight /></div>
				</div>
			</div>
			
			
			<TodoBoard>
				
				{ days.map( (day:Dayjs) => {
						
					const dayString = day.format('YYYY-MM-DD');
					
					return( 
						<TodoList key={dayString}
							id={ "TodoList-" + dayString }
							title={ getDayLabel(day) }
							filter={ todo => todo.doDate == dayString }
							droppedOn={ todo => droppedTodoOnList(todo,dayString) }
							addTaskClicked={ () => addTask( "new task" , dayString )}
							hideDate
						/>
					);
						
				}) }
				
			</TodoBoard>
			
		</div>
	)
	
	function getDayLabel( date:Dayjs ){
		
		const today = getToday();
		
		const daysDiff = date.diff(today, 'day', true);
		//const daysDiff = Math.round( date.diff(today, 'day', true) );
		
		if( daysDiff == -1 )  return "Yesterday";
		if( daysDiff ==  0 )  return "Today";
		if( daysDiff ==  1 )  return "Tomorrow";
		
		const isSameWeek = date.isSame( today , "week");
		if( isSameWeek ){
			return date.format("dddd");
		}
		
		const currentYear = date.isSame( today , "year" );
		if( currentYear ){
			return date.format("MMM D");
		}
		
		return date.format("MMM D YYYY");
		
	}
}




