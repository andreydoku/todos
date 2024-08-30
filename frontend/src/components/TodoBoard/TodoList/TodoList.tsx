import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


import { useTodos } from "../../../providers/TodoProvider";
import { Todo } from "../../../models/Todo";
import { useTodoBoardState } from "../TodoBoard";
import SortableTodoItem from "./SortableTodoItem/SortableTodoItem";
import "./TodoList.scss";

export type TodoListProps = {
	id: string
	title: string
	filter: (todo:Todo) => boolean
	droppedOn: (todo:Todo) => void;
	addTaskClicked: () => void
	hideDate?: boolean
	className?: string
}
export default function TodoList({ id , title , filter , addTaskClicked , hideDate=false, className }: TodoListProps) {
	
	if( !id.startsWith("TodoList") ){
		console.error( "TodoList ID: " + id + "   ... must start with 'TodoList'!" );
	}
	
	const { setNodeRef } = useDroppable({
		id: id,
		data: { type: "TodoList" , value: {id,title} }
	});
	
	const { todos } = useTodos();
	const filteredTodos = todos.filter( todo => filter(todo) );
	
	const { draggedOverListId } = useTodoBoardState();
	const draggedOver = draggedOverListId == id;
	//console.log({ myId: id , draggedOverListId , draggedOver })
	
	let cn = "todo-list";
	if( draggedOver ) cn += " dragged-over";
	if( className ) cn += " " + className;
	if( hideDate )  cn += " hide-date";
	
	return (
		<div className={cn} id={id} datatype="TodoList">
			
			<div className="title-bar">
				<h2 className="title">{title}</h2>
				<AddTaskButton onClick={addTaskClicked}/>
			</div>
			
			<SortableContext
				id={id}
				items={filteredTodos}
				strategy={verticalListSortingStrategy}
				>
					
				<div className="draggable-area" ref={setNodeRef} >
					<div className="list-area" ref={setNodeRef} >
					
						{ filteredTodos.map( (todo:Todo) => 
							<SortableTodoItem key={todo.id} 
								todo={todo}
								hideDate={hideDate}
							/>
						) }
					
					</div>
				</div>	
				
			</SortableContext>
		</div>
	);
}

import { FaPlus } from "react-icons/fa";
type AddTaskButton2Props={
	onClick: () => void
}
function AddTaskButton({ onClick }: AddTaskButton2Props){
	return(
		<div className="add-task-button">
			<FaPlus onClick={onClick}/>
		</div>
	);
}