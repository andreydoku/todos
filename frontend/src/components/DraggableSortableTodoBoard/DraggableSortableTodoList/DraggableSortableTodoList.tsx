import { useDroppable } from "@dnd-kit/core";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTodoItem from "../SortableTodoItem/SortableTodoItem";
import { DraggableSortableList } from "../DraggableSortableTodoBoard";
import { Todo } from "../../../models/Todo";

import "./DraggableSortableTodoList.scss";

type DraggableSortableTodoListProps = {
	draggableList: DraggableSortableList
	hovered?: boolean

	addTaskClicked: () => void
}
export default function DraggableSortableTodoList({ draggableList , hovered=false , addTaskClicked }: DraggableSortableTodoListProps){
	
	const { setNodeRef } = useDroppable({
		id: draggableList.id,
		data: { type: "DraggableList" , value: draggableList }
	});
	
	const{ title , todos , className } = draggableList;
	
	let cn = "draggable-sortable-todo-list";
	if( hovered ) cn += " hovered";
	if( className ) cn += " " + className;
	
	return( 
		<div className={cn} >
			<div className="title-bar">
				<h2 className="title">{title}</h2>
				<AddTaskButton2 onClick={addTaskClicked}/>
			</div>
			
			
			<SortableContext
				id={title}
				items={todos}
				strategy={verticalListSortingStrategy}
				>
				<div className="draggable-area" ref={setNodeRef} >
					<div className="list-area" ref={setNodeRef} >
					
						{ todos.map( (todo:Todo) => 
							<SortableTodoItem key={todo.id} todo={todo} />
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
function AddTaskButton2({ onClick }: AddTaskButton2Props){
	return(
		<div className="add-task-button-2">
			<FaPlus onClick={onClick}/>
		</div>
		
	);
}