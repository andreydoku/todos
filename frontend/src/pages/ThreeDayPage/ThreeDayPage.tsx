import dayjs, { Dayjs } from "dayjs";



import "./ThreeDayPage.scss";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";
import { getDayOfWeek } from "../../utils/utils";
import { Todo } from "../../models/Todo";
import { TransitionGroup } from "react-transition-group";




export default function ThreeDayPage() {
	
	//const { todos , dateChanged , addTask } = useTodos();
	
	const title = "3-Day View";
	
	const day1:Dayjs = dayjs();
	const days:Dayjs[] = Array.from({ length: 9 }, (_, i) => day1.add(i, "days"));
	
	
	const { dateChanged , addTask } = useTodos();
	function droppedTodoOnList( todo:Todo , dateString:string ){
		
		console.log(`dropped '${todo.title}' onto '${dateString}'.`)
		
		const newDoDate = dateString;
		dateChanged( todo.id , newDoDate );
	}
	
	return (
		<div className="three-day-page">
			<h1 className="title">{title}</h1>
			
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
		
		const today = dayjs();
		
		
		const daysDiff = date.diff(today, 'day');
		
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




