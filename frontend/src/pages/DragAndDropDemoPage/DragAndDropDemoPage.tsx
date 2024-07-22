import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation } from "@dnd-kit/core";
import "./DragAndDropDemoPage.scss";
import UserList from "./UserList/UserList";
import { useState } from "react";
import { User } from "./User";
import UserItem from "./UserItem/UserItem";
import { log } from "console";


export default function DragAndDropDemoPage() {
	
	const title = "Drag and Drop Demo";
	
	const [activeUser, setActiveUser] = useState<User|null>(null);
	
	
	const INITIAL_USERS_1: User[] = [
		{ id: "1", name: "Andrey" },
		{ id: "2", name: "Eric" },
		{ id: "3", name: "David" },
		
	]
	const INITIAL_USERS_2: User[] = [
		
		{ id: "4", name: "Chris" }
	]
	
	
	
	const [users1, setUsers1] = useState<User[]>( INITIAL_USERS_1 );
	const [users2, setUsers2] = useState<User[]>( INITIAL_USERS_2 );
	
	function handleDragStart({ active }: DragStartEvent){
		console.log( { DragStartEvent: { active } } );
		
		const activeUser = active.data.current as User;
		
		//console.log( activeUser )
		setActiveUser( activeUser );
	}
	function handleDragOver({ active , over }: DragOverEvent){
		console.log( { DragOverEvent: { active, over } } );
	}
	function handleDragEnd({ active, over }: DragEndEvent) {
		if (over) {
			//const itemId = event.active.id
			const draggedUser = active.data.current as User;
			
			const listId = over.id;
			console.log( { DragEndEvent: { active, over } } );
			console.log( draggedUser.name + " was dropped on " + listId );
			
			const droppedOnList1 = listId == "List 1";
			const droppedOnList2 = listId == "List 2";
			
			const draggedFromList1 = users1.findIndex( user => user.id == draggedUser.id) != -1;
			const draggedFromList2 = users2.findIndex( user => user.id == draggedUser.id) != -1;
			
			if( droppedOnList1 ){
				console.log(" first list wtf")
				
				if( draggedFromList2 ){
					users1.push( draggedUser );
					const newUsers2 = users2.filter( user => user.id != draggedUser.id );
					setUsers1( users1 );
					setUsers2( newUsers2 );
					
					console.log({ users1: users1 , users2: newUsers2 })
				}
			}
			if( droppedOnList2 ){
				console.log(" second list wtf")
				
				if( draggedFromList1 ){
					const newUsers1 = users1.filter( user => user.id != draggedUser.id );
					users2.push( draggedUser );
					setUsers1( newUsers1 );
					setUsers2( users2 );
					
					console.log({ users1: newUsers1 , users2: users2 })
				}
			}
			
		}
		
		setActiveUser( null );
	}
	
	const dropAnimation: DropAnimation = {
		...defaultDropAnimation,
	  };
	
	return (
		<div className='drag-and-drop-demo-page'>
			<h1>{title}</h1>
			
			<div className="two-lists">
				<DndContext 
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					<UserList title="List 1" users={users1} />
					<UserList title="List 2" users={users2} />
					<DragOverlay dropAnimation={dropAnimation}>
						{activeUser ? <UserItem user={activeUser} /> : null}
					</DragOverlay>
				</DndContext>
			</div>
			
			
			
		</div>
	)
}
