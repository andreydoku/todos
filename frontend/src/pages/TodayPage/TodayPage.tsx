
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "./TodayPage.scss";
import { useState } from "react";



export default function TodayPage() {

	const title = "Today";
	
	
	const [isDropped, setIsDropped] = useState(false);

	function handleDragEnd(event) {
		if (event.over && event.over.id === 'my-droppable-area') {
			setIsDropped(true);
		}
	}

	return (
		<div className="today-page">
			<h1>{title}</h1>

			<DndContext onDragEnd={handleDragEnd}>
				
				{ !isDropped && 
					<MyDraggableThingy>
						<div style={{ width: 200, height: 100, backgroundColor: "gray" }} >drag me</div>
					</MyDraggableThingy>
				}
				
				
				<MyDropArea>
					
					<div style={{ width: 300, height: 700, backgroundColor: "aqua" }} >
						{ isDropped 
							? 
							<MyDraggableThingy>
								<div style={{ width: 200, height: 100, backgroundColor: "gray" }} >dropped</div>
							</MyDraggableThingy> 
							:
							<p>empty</p>
						}
					</div>
				</MyDropArea>

			</DndContext>


		</div>

	);
}


function MyDropArea({ children }) {

	const { isOver, setNodeRef } = useDroppable({
		id: 'my-droppable-area',
	});
	const style = {
		color: isOver ? 'green' : undefined,
	};

	return (
		<div ref={setNodeRef} style={style}>
			{children}
		</div>
	);

}

function MyDraggableThingy({ children }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: 'my-draggable-thingy',
	});
	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;


	return (
		<button ref={setNodeRef} style={style} {...listeners} {...attributes}>
			{children}
		</button>
	);
}

