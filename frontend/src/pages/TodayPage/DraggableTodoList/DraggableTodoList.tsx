import { useDroppable } from "@dnd-kit/core";
import { Todo } from "../../../models/Todo";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTodoItem from "../SortableTodoItem/SortableTodoItem";

import "./DraggableTodoList.scss";
import { DraggableList } from "../DraggableTodoBoard/DraggableTodoBoard";

type DraggableTodoListProps = {
	draggableList: DraggableList
	
	doneChanged?: ( id:string , newDone:boolean ) => void
	titleChanged?: ( id:string , newTitle:string ) => void
	dateChanged?: ( id:string , newDate:string|null ) => void
	deleteClicked?: ( id:string ) => void
}
export default function DraggableTodoList({ draggableList , doneChanged , titleChanged , dateChanged , deleteClicked }: DraggableTodoListProps){
	
	const { isOver, setNodeRef } = useDroppable({
		id: draggableList.id,
		data: { type: "DraggableList" , value: draggableList }
	});
	
	const{ title , todos } = draggableList;
	
	if( !doneChanged) doneChanged = ()=>{}
	if( !titleChanged) titleChanged = ()=>{}
	if( !dateChanged) dateChanged = ()=>{}
	if( !deleteClicked) deleteClicked = ()=>{}
	
	
	let cn = "draggable-todo-list";
	if( isOver ) cn += " is-over";
	
	return( 
		<div className={cn} >
			<h2 className="title">{title}</h2>
			
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