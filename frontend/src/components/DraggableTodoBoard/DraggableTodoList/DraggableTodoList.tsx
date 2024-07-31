import { useDroppable } from "@dnd-kit/core";


import { DraggableList } from "../DraggableTodoBoard";
import { Todo } from "../../../models/Todo";

import "./DraggableTodoList.scss";
import DraggableTodoItem from "../DraggableTodoItem/DraggableTodoItem";

type DraggableTodoListProps = {
	draggableList: DraggableList
	className?: string
	hovered?: boolean
}
export default function DraggableTodoList({ draggableList , hovered=false }: DraggableTodoListProps){
	
	const { setNodeRef } = useDroppable({
		id: draggableList.id,
		data: { type: "DraggableList" , value: draggableList }
	});
	
	const{ title , todos , className } = draggableList;
	
	let cn = "draggable-todo-list";
	if( hovered ) cn += " hovered";
	if( className ) cn += " " + className;
	
	return( 
		<div className={cn} >
			<h2 className="title">{title}</h2>
			
			
			<div className="draggable-area" ref={setNodeRef} >
				<div className="list-area" ref={setNodeRef} >
				
					{ todos.map( (todo:Todo) => 
						<DraggableTodoItem key={todo.id} todo={todo} />
					) }
				
				</div>
			</div>
				
				

		</div>
	);
	
}