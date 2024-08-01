import dayjs, { Dayjs } from "dayjs";



import "./ThreeDayPageV2.scss";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";
import { getDayOfWeek } from "../../utils/utils";
import { Todo } from "../../models/Todo";




export default function ThreeDayPage() {
	
	//const { todos , dateChanged , addTask } = useTodos();
	
	const title = "3-Day View (V2)";
	
	
	const day1:Dayjs = dayjs();
	const day2:Dayjs = day1.add( 1 , 'day' );
	const day3:Dayjs = day1.add( 2 , 'day' );
	
	const dayString1:string = day1.format('YYYY-MM-DD');
	const dayString2:string = day2.format('YYYY-MM-DD');
	const dayString3:string = day3.format('YYYY-MM-DD');
	
	const { dateChanged } = useTodos();
	function droppedTodoOnList( todo:Todo , listId:string ){
		
		console.log(`dropped '${todo.title}' onto '${listId}'.`)
		
		const newDoDate = listId;
		dateChanged( todo.id , newDoDate );
	}
	
	return (
		<div className="three-day-page-v2">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				
				<TodoList
					id={dayString1}
					title="Today"
					filter={ todo => todo.doDate == dayString1 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString1) }
				/>
				<TodoList
					id={dayString2}
					title="Tomorrow"
					filter={ todo => todo.doDate == dayString2 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString2) }
				/>
				<TodoList
					id={dayString3}
					title={getDayOfWeek(day3)}
					filter={ todo => todo.doDate == dayString3 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString3) }
				/>
				
				
			</TodoBoard>
			
		</div>
	)
}


