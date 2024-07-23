import { closestCorners, defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import "./DragAndDropDemoPage.scss";
import UserList from "./UserList/UserList";
import { useState } from "react";
import { User } from "./User";
import UserItem from "./UserItem/UserItem";
import { log } from "console";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";


export default function DragAndDropDemoPage() {
	
	const title = "Drag and Drop Demo";
	
	const [activeUser, setActiveUser] = useState<User|null>(null);
	
	
	const INITIAL_USERS_1: User[] = [
		{ id: "user-1", name: "Andrey" },
		{ id: "user-2", name: "Eric" },
		{ id: "user-3", name: "David" },
		
	]
	const INITIAL_USERS_2: User[] = [
		
		{ id: "user-4", name: "Chris" }
	]
	
	
	
	const [users1, setUsers1] = useState<User[]>( INITIAL_USERS_1 );
	const [users2, setUsers2] = useState<User[]>( INITIAL_USERS_2 );
	
	function getListIdOfUser( user: User ): string|null{
		
		//if( user )
		
		if( users1.findIndex( u => u.id == user.id) != -1 ){
			return "List 1";
		}
		if( users2.findIndex( u => u.id == user.id) != -1 ){
			return "List 2";
		}
		
		return null;
		
	}
	
	
	function handleDragStart({ active }: DragStartEvent){
		console.log( { DragStartEvent: { active } } );
		
		const draggedUser = active.data.current as User;
		
		//console.log( draggedUser )
		setActiveUser( draggedUser );
	}
	function handleDragOver({ active , over }: DragOverEvent){
		console.log( { DragOverEvent: { active, over } } );
		
		if( !over ){
			return;
		}
		
		const draggedUser = active.data.current as User;
		const draggedOverUser = over?.data.current as User;
		
		if( !draggedOverUser ){
			return;
		}
		
		const draggedFromListId = getListIdOfUser( draggedUser );
		const draggedOverListId = getListIdOfUser( draggedOverUser );
		
		if( !draggedFromListId || !draggedOverListId ){
			return;
		}
		
		//dont do anything if didnt drag to a different list
		if( draggedFromListId == draggedOverListId ){
			return;
		}
		
		
		//remove draggedUser from the "draggedFrom" list
		if( draggedFromListId == "List 1" ){
			setUsers1( prevUsers1 => prevUsers1.filter( user => user.id != draggedUser.id ))
		}
		if( draggedFromListId == "List 2" ){
			setUsers2( prevUsers2 => prevUsers2.filter( user => user.id != draggedUser.id ))
		}
		
		//add draggedUser to the draggedOver list, specifically to the spot where the draggedOver user was
		const draggedOverList = draggedOverListId == "List 1" ? users1 : users2;
		const draggedOverIndex = draggedOverList.findIndex( u => u.id == draggedOverUser.id );
		
		if( draggedOverListId == "List 1" ){
			setUsers1( prevUsers1 => [ 
				...prevUsers1.slice(0,draggedOverIndex) , 
				draggedUser , 
				...prevUsers1.slice(draggedOverIndex,prevUsers1.length)
			] );
		}
		if( draggedOverListId == "List 2" ){
			setUsers2( prevUsers2 => [ 
				...prevUsers2.slice(0,draggedOverIndex) , 
				draggedUser , 
				...prevUsers2.slice(draggedOverIndex,prevUsers2.length)
			] );
		}
		
	}
	function handleDragEnd({ active, over }: DragEndEvent) {
		if( !over ){
			return;
		}
		
		if( over.id.startsWith("List") ){
			//TODO - handle dragging over an empty list - the over ID is the list ID
			return;
		}
		
		const draggedUser = active.data.current as User;
		const draggedOverUser = over?.data.current as User;
		
		const draggedFromListId = getListIdOfUser( draggedUser );
		const draggedOverListId = getListIdOfUser( draggedOverUser );
		
		if( !draggedFromListId || !draggedOverListId ){
			return;
		}
		
		//dont do anything if didnt drag to a different list
		if( draggedFromListId !== draggedOverListId ){
			return;
		}
		
		const draggedOverList = draggedOverListId == "List 1" ? users1 : users2;
		const draggedIndex = draggedOverList.findIndex( u => u.id == draggedUser.id );
		const draggedOverIndex = draggedOverList.findIndex( u => u.id == draggedOverUser.id );
		
		if( draggedOverListId == "List 1" ){
			setUsers1( arrayMove(users1,draggedIndex,draggedOverIndex) );
		}
		if( draggedOverListId == "List 2" ){
			setUsers2( arrayMove(users2,draggedIndex,draggedOverIndex) );
		}
		
		setActiveUser( null );
	}
	
	const dropAnimation: DropAnimation = {
		...defaultDropAnimation,
	  };
	
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	  
	return (
		<div className='drag-and-drop-demo-page'>
			<h1>{title}</h1>
			
			<div className="two-lists">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
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




