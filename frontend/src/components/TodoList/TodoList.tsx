import './TodoList.scss';
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from '../../models/Todo';

type TodoListProps = {
	todos: Todo[]
	checkboxClicked: ( id:string , newChecked:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	deleteClicked: ( id:string ) => void
}
function TodoList({ todos , checkboxClicked , titleChanged , deleteClicked }: TodoListProps){
	
	if( todos === undefined ){
		todos = [];
	}
	
	if( checkboxClicked === undefined ){
		checkboxClicked = (id, checked) => {
			console.log( "checkbox clicked: "
				+ "\n\t" + "id: " + id
				+ "\n\t" + "checked: " + checked );
		}
	}
	
	
	return(
		
		<div className="todo-list">
			
			{todos.map( todo => 
				<TodoItem 
					todo={todo} 
					key={todo.id} 
					checkboxClicked={ (id,checked) => checkboxClicked(id,checked) }
					titleChanged={ (id,newTitle) => titleChanged(id,newTitle) }
					deleteClicked={ (id) => deleteClicked(id) }
				/>
			)}
			
		</div>
		
	);
	
}
export default TodoList;