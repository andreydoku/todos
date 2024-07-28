//import { CSS } from '@dnd-kit/utilities';

import { Todo } from "../../../models/Todo";
import TodoItem from "../../TodoItem/TodoItem";

import "./DraggableTodoItem.scss";
import { useDraggable } from "@dnd-kit/core";


type DraggableTodoItemProps = {
	todo: Todo
	
	doneChanged: ( id:string , newDone:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	dateChanged: ( id:string , newDate:string|null ) => void
	deleteClicked: ( id:string ) => void
};

export default function DraggableTodoItem({ todo , doneChanged , titleChanged , dateChanged , deleteClicked }: DraggableTodoItemProps) {
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
			<TodoItem todo={todo} 
				doneChanged={doneChanged}
				titleChanged={titleChanged}
				dateChanged={dateChanged}
				deleteClicked={deleteClicked}
			/>
		</div>
	);
};