import { Todo } from "../../../models/Todo";
import TodoItem from "../../TodoItem/TodoItem";
import { useDraggable } from "@dnd-kit/core";

import "./DraggableTodoItem.scss";

type DraggableTodoItemProps = {
	todo: Todo
};

export default function DraggableTodoItem({ todo }: DraggableTodoItemProps) {
	const {attributes, isDragging , listeners, setNodeRef} = useDraggable({
		id: todo.id, 
		data:{ 
			type: "Todo", 
			value: todo 
		} 
	});
	
	const style = {
		//transform: CSS.Transform.toString(transform),
	};
	
	let cn = "draggable-todo-item";
	if( isDragging ) cn += " picked-up";
	
	
	return (
		<div ref={setNodeRef} className={cn} style={style} {...attributes} {...listeners}>
			<TodoItem todo={todo} />
		</div>
	);
};