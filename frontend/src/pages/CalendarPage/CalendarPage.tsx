import dayjs, { Dayjs } from "dayjs";

import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";
import { getMondayOf, isToday } from "../../utils/utils";
import { Todo } from "../../models/Todo";

import "./CalendarPage.scss";
import useWindowDimensions from "../../utils/useWindowDimensions";


export default function CalendarPage() {
	
	
	const title = "Calendar";
	
	const { height, width } = useWindowDimensions();
	if( width < 800 ){
		return(
			<div className="calendar-page">
				<h1 className="title">{title}</h1>
				<p>No clue how to make this look good on mobile lol</p>
			</div>
		)
	}
	
	
	
	const today:Dayjs = dayjs();
	const thisMonday:Dayjs = getMondayOf( today );
	const days = Array.from({ length: 7*3 }, (_, i) => thisMonday.add(i, "days"));
	
	
	const { dateChanged , addTask } = useTodos();
	function droppedTodoOnList( todo:Todo , listId:string ){
		
		console.log(`dropped '${todo.title}' onto '${listId}'.`)
		
		const newDoDate = listId;
		dateChanged( todo.id , newDoDate );
	}
	
	
	const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
	
	return (
		<div className="calendar-page">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				<div className="backlog-column">
					<Header text="Backlog"/>
					<TodoList
						id="TodoList-backlog"
						title=""
						filter={ todo => !todo.doDate && !todo.done }
						droppedOn={ todo => dateChanged( todo.id , null ) }
						addTaskClicked={ () => addTask( "new task" )}
					/>
				</div>
				
				
				<div className="seven-day-grid">
					
					{ weekdays.map( weekday =>
						<Header text={weekday} key={weekday}/>
					)}
						
					{ days.map( (day:Dayjs) => {
						
						const dayString = day.format('YYYY-MM-DD');
						
						return( 
							<TodoList key={dayString}
								id={ "TodoList-" + dayString }
								title={ getDayLabel(day) }
								filter={ todo => todo.doDate == dayString }
								droppedOn={ todo => droppedTodoOnList(todo,dayString) }
								addTaskClicked={ () => addTask( "new task" , dayString )}
								className={ isToday(day) ? "today" : ""}
							/>
						);
							
						}
					) }
					
				</div>

			</TodoBoard>
			
		</div>
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
	
}


function Header({text}:{text:string}){
	return(
		<h2 className="header">
			{text}
		</h2>
	);
}







