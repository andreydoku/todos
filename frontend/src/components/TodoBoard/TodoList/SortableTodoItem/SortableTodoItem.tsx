import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

import "./SortableTodoItem.scss";
import TodoItem from "../../../TodoItem/TodoItem";
import { Todo } from "../../../../models/Todo";


type SortableTodoItemProps = {
	todo: Todo
};

export default function SortableTodoItem({ todo }: SortableTodoItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: todo.id, 
		data:{ 
			type: "Todo", 
			value: todo 
		} 
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	
	let cn = "sortable-todo-item";
	if( isDragging ) cn += " picked-up";
	
	
	return (
		<div ref={setNodeRef} className={cn} style={style} {...attributes} {...listeners}>
			<TodoItem todo={todo} />
		</div>
	);
};
