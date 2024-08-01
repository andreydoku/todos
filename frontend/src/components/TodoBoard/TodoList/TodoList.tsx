import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import SortableTodoItem from "../../DraggableSortableTodoBoard/SortableTodoItem/SortableTodoItem";
import { useTodos } from "../../../providers/TodoProvider";
import { Todo } from "../../../models/Todo";
import "./TodoList.scss";

export type TodoListProps = {
	id: string
	title: string
	filter: (todo:Todo) => boolean
	draggedOver?: boolean
	droppedOn: (todo:Todo) => void;
}
export default function TodoList({ id , title , filter , draggedOver=false , droppedOn }: TodoListProps) {
	
	const { setNodeRef } = useDroppable({
		id: id,
		data: { type: "TodoList" , value: {id,title} }
	});
	
	const { todos , dateChanged , addTask } = useTodos();
	const filteredTodos = todos.filter( todo => filter(todo) );
	
	let cn = "todo-list";
	if( draggedOver ){
		cn += " dragged-over";
	}
	
	return (
		<div className={cn}>
			<div className="title-bar">
				<h2 className="title">{title}</h2>
				{/* <AddTaskButton2 onClick={addTaskClicked}/> */}
			</div>
			
			
			<SortableContext
				id={title}
				items={filteredTodos}
				strategy={verticalListSortingStrategy}
				>
				<div className="draggable-area" ref={setNodeRef} >
					<div className="list-area" ref={setNodeRef} >
					
						{ filteredTodos.map( (todo:Todo) => 
							<SortableTodoItem key={todo.id} 
								todo={todo}
							/>
						) }
					
					</div>
				</div>	
			</SortableContext>
		</div>
	)
}

import { FaPlus } from "react-icons/fa";
type AddTaskButton2Props={
	onClick: () => void
}
function AddTaskButton2({ onClick }: AddTaskButton2Props){
	return(
		<div className="add-task-button-2">
			<FaPlus onClick={onClick}/>
		</div>
		
	);
}