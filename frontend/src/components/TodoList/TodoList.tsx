import './TodoList.scss';
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from '../../models/Todo';

type TodoListProps = {
	todos: Todo[]
	doneChanged: ( id:string , newDone:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	dateChanged: ( id:string , newDate:string|null ) => void
	deleteClicked: ( id:string ) => void
}
function TodoList({ todos , doneChanged , titleChanged , dateChanged , deleteClicked }: TodoListProps){
	
	if( todos === undefined ){
		todos = [];
	}
	
	if( doneChanged === undefined ){
		doneChanged = (id, newDone) => {
			console.log( "checkbox clicked: "
				+ "\n\t" + "id: " + id
				+ "\n\t" + "checked: " + newDone );
		}
	}
	
	
	return(
		
		<div className="todo-list">
			
			{todos.map( todo => 
				<TodoItem 
					todo={todo} 
					key={todo.id} 
					doneChanged={ (id,newDone) => doneChanged(id,newDone) }
					titleChanged={ (id,newTitle) => titleChanged(id,newTitle) }
					dateChanged={ (id,newDate) => dateChanged(id,newDate) }
					deleteClicked={ (id) => deleteClicked(id) }
				/>
			)}
			
		</div>
		
	);
	
}
export default TodoList;