import { DndContext } from "@dnd-kit/core";
import "./DragAndDropDemoPage.scss";
import NameList from "./NameList/NameList";
import { useState } from "react";


export default function DragAndDropDemoPage() {
	
	const title = "Drag and Drop Demo";
	
	const [names1, setNames1] = useState<string[]>(["Andrey" , "Eric" , "David" , "Chris"]);
	const [names2, setNames2] = useState<string[]>([]);
	
	
	function handleDragEnd(event) {
		if (event.over) {
			const itemId = event.active.id
			const listId = event.over.id;
			console.log({event})
			console.log( itemId + " was dropped on " + listId );
			
			if( listId == "List 1" ){
				if( !names1.includes(itemId) && names2.includes(itemId) ){
					names1.push( itemId );
					const newNames2 = names2.filter( name => name != itemId );
					setNames1( names1 );
					setNames2( newNames2 );
				}
			}
			if( listId == "List 2" ){
				if( names1.includes(itemId) && !names2.includes(itemId) ){
					const newNames1 = names1.filter( name => name != itemId );
					names2.push( itemId );
					setNames1( newNames1 );
					setNames2( names2 );
				}
			}
			
		}
	}

	return (
		<div className='drag-and-drop-demo-page'>
			<h1>{title}</h1>
			
			<div className="two-lists">
				<DndContext onDragEnd={handleDragEnd}>
					<NameList title="List 1" names={names1} />
					<NameList title="List 2" names={names2} />
				</DndContext>
			</div>
			
			
			
		</div>
	)
}
