import dayjs, { Dayjs } from "dayjs";



import "./ThreeDayPage.scss";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import TodoList from "../../components/TodoBoard/TodoList/TodoList";
import { useTodos } from "../../providers/TodoProvider";
import { getDayOfWeek } from "../../utils/utils";
import { Todo } from "../../models/Todo";




export default function ThreeDayPage() {
	
	//const { todos , dateChanged , addTask } = useTodos();
	
	const title = "3-Day View";
	
	
	const day1:Dayjs = dayjs();
	const day2:Dayjs = day1.add( 1 , 'day' );
	const day3:Dayjs = day1.add( 2 , 'day' );
	
	const dayString1:string = day1.format('YYYY-MM-DD');
	const dayString2:string = day2.format('YYYY-MM-DD');
	const dayString3:string = day3.format('YYYY-MM-DD');
	
	const { dateChanged , addTask } = useTodos();
	function droppedTodoOnList( todo:Todo , listId:string ){
		
		console.log(`dropped '${todo.title}' onto '${listId}'.`)
		
		const newDoDate = listId;
		dateChanged( todo.id , newDoDate );
	}
	
	return (
		<div className="three-day-page">
			<h1 className="title">{title}</h1>
			
			<TodoBoard>
				
				<TodoList
					id={ "TodoList-" + dayString1 }
					title="Today"
					filter={ todo => todo.doDate == dayString1 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString1) }
					addTaskClicked={ () => addTask( "new task" , dayString1 )}
				/>
				<TodoList
					id={ "TodoList-" + dayString2 }
					title="Tomorrow"
					filter={ todo => todo.doDate == dayString2 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString2) }
					addTaskClicked={ () => addTask( "new task" , dayString2 )}
				/>
				<TodoList
					id={ "TodoList-" + dayString3 }
					title={getDayOfWeek(day3)}
					filter={ todo => todo.doDate == dayString3 }
					droppedOn={ todo => droppedTodoOnList(todo,dayString3) }
					addTaskClicked={ () => addTask( "new task" , dayString3 )}
				/>
				
				
			</TodoBoard>
			
		</div>
	)
}




