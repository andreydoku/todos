import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

import { Todo } from "../../../models/Todo";


import TodoItem from "../../../components/TodoItem/TodoItem";

import "./SortableTodoItem.scss";

type SortableTodoItemProps = {
	todo: Todo
	doneChanged: ( id:string , newDone:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	dateChanged: ( id:string , newDate:string|null ) => void
	deleteClicked: ( id:string ) => void
};

export default function SortableTodoItem({ todo , doneChanged , titleChanged , dateChanged , deleteClicked }: SortableTodoItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: todo.id, data:{ type: "Todo" , value: todo } });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	
	let cn = "sortable-todo-item";
	if( isDragging ) cn += " picked-up";
	
	
	return (
		<div ref={setNodeRef} className={cn} style={style} {...attributes} {...listeners}>
			<TodoItem todo={todo} 
				doneChanged={doneChanged}
				titleChanged={titleChanged}
				dateChanged={dateChanged}
				deleteClicked={deleteClicked}
			/>
			
			{/* <SampleTodoItem todo={todo} /> */}
			
		</div>
	);
};