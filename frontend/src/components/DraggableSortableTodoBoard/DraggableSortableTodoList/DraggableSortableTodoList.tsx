import { useDroppable } from "@dnd-kit/core";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTodoItem from "../SortableTodoItem/SortableTodoItem";

import "./DraggableSortableTodoList.scss";
import { DraggableSortableList } from "../DraggableSortableTodoBoard";
import { Todo } from "../../../models/Todo";

type DraggableSortableTodoListProps = {
	draggableList: DraggableSortableList
	hovered?: boolean
	
	doneChanged?: ( id:string , newDone:boolean ) => void
	titleChanged?: ( id:string , newTitle:string ) => void
	dateChanged?: ( id:string , newDate:string|null ) => void
	deleteClicked?: ( id:string ) => void
	addTaskClicked: () => void
}
export default function DraggableSortableTodoList({ draggableList , hovered=false, doneChanged , titleChanged , dateChanged , deleteClicked , addTaskClicked }: DraggableSortableTodoListProps){
	
	const { setNodeRef } = useDroppable({
		id: draggableList.id,
		data: { type: "DraggableList" , value: draggableList }
	});
	
	const{ title , todos , className } = draggableList;
	
	if( !doneChanged) doneChanged = ()=>{}
	if( !titleChanged) titleChanged = ()=>{}
	if( !dateChanged) dateChanged = ()=>{}
	if( !deleteClicked) deleteClicked = ()=>{}
	
	
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
							<SortableTodoItem key={todo.id} 
								todo={todo} 
								doneChanged={doneChanged}
								titleChanged={titleChanged}
								dateChanged={dateChanged}
								deleteClicked={deleteClicked}
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
function AddTaskButton2({ onClick }: AddTaskButton2Props){
	return(
		<div className="add-task-button-2">
			<FaPlus onClick={onClick}/>
		</div>
		
	);
}