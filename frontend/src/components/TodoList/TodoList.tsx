import './TodoList.scss';
import TodoItem from "../TodoItem/TodoItem";
import { Todo } from '../../models/Todo';

type TodoListProps = {
	todos: Todo[]
}

function TodoList({ todos }: TodoListProps){
	
	if( todos === undefined ){
		todos = [];
	}
	
	return(
		
		<div className="todo-list">
			
			{todos.map( todo => 
				<TodoItem todo={todo} key={todo.id} />
			)}
			
		</div>
		
	);
	
}
export default TodoList;