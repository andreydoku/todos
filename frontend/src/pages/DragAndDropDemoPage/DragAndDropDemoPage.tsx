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
	
	
	const ALL_USERS: User[] = [
		{ id: 1, name: "Andrey" },
		{ id: 2, name: "Eric" },
		{ id: 3, name: "David" },
		{ id: 4, name: "Chris" },
	]
	
	const [users1, setUsers1] = useState<User[]>( ALL_USERS );
	const [users2, setUsers2] = useState<User[]>([]);
	
	function handleDragStart({ active }: DragStartEvent){
		const activeUser = active.data.current as User;
		
		console.log( activeUser )
		setActiveUser( activeUser );
	}
	function handleDragOver({ active , over }: DragOverEvent){
		console.log( { active, over } );
	}
	function handleDragEnd({ active, over }: DragEndEvent) {
		if (over) {
			//const itemId = event.active.id
			const user = active.data.current as User;
			
			const listId = over.id;
			console.log( { active, over } );
			console.log( user.name + " was dropped on " + listId );
			
			if( listId == "List 1" ){
				if( !users1.includes(user) && users2.includes(user) ){
					users1.push( user );
					const newUsers2 = users2.filter( name => name != user );
					setUsers1( users1 );
					setUsers2( newUsers2 );
				}
			}
			if( listId == "List 2" ){
				if( users1.includes(user) && !users2.includes(user) ){
					const newUsers1 = users1.filter( name => name != user );
					users2.push( user );
					setUsers1( newUsers1 );
					setUsers2( users2 );
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
