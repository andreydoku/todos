import { Children, cloneElement, ReactNode, useState } from "react";
import "./TodoBoard.scss";

import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges} from '@dnd-kit/modifiers';
import { Todo } from "../../models/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { TodoListProps } from "./TodoList/TodoList";


type TodoBoardProps = {
	children: ReactNode
}
export default function TodoBoard({ children }: TodoBoardProps) {
	
	const [draggedTodo, setDraggedTodo] = useState<Todo|null>( null );
	const [draggedOverListId, setDraggedOverListId] = useState<string|null>( null );
	
	
	
	const todoListPropsArray:TodoListProps[] = getTodoListPropsArray();
	
	
	function getTodoListPropsArray() :TodoListProps[] {
		
		const output:TodoListProps[] = [];
		
		Children.forEach( children , child =>{
		
			//@ts-ignore
			const type = child?.type.name;
			
			if( type == "TodoList" ){
				
				//@ts-ignore
				const props:TodoListProps = child.props;
				output.push(props);
				
			}
			
		} )
		
		return output;
		
	}
	
	
	function handleDragStart({ active }: DragStartEvent){
		console.log( { DragStartEvent: { active } } );
		
		const draggedTodo = active.data.current?.value as Todo;
		setDraggedTodo( draggedTodo );
		
	}
	function handleDragOver({ active , over }: DragOverEvent){
		console.log( { DragOverEvent: { active, over } } );
		
		if( !draggedTodo ){
			console.log("handleDragOver - no draggedTodo (state)");
			return;
		}
		
		const draggedOverThing = over?.data.current;
		if( !draggedOverThing ){
			console.log("handleDragOver - no dragged over data");
			return;
		}
		//console.log("handleDragOver - dragged over type: " + draggedOverThing.type + " (" + draggedOverThing.value.title + ")" );
		
		if( draggedOverThing.type == "Todo" ){
			//console.log( {"draggedOverThing.value": draggedOverThing.value } )
			
			const draggedFromListTitle = active.data.current?.sortable.containerId;
			const draggedToListTitle = over.data.current?.sortable.containerId;
			
			const draggedFromListId = getTodoListIdFromTitle( draggedFromListTitle );
			const draggedToListId = getTodoListIdFromTitle( draggedToListTitle );
			
			setDraggedOverListId( draggedToListId ? draggedToListId : null );
			
			//const draggedOverTodo = draggedOverThing.value as Todo;
			//handleDraggedOverTodo( draggedTodo , draggedOverTodo );
		}
		
		if( draggedOverThing.type == "TodoList" ){
			const draggedOverListId:string = draggedOverThing.value.id;
			
			setDraggedOverListId( draggedOverListId );
		}
		
		
	}
	function handleDragEnd({ active, over }: DragEndEvent){
		console.log( { DragEndEvent: { active, over } } );
		
		if( !draggedOverListId ){
			console.error("handleDragEnd - draggedOverListId is null")
			return;
		}
		
		const draggedOverList = getTodoListById( draggedOverListId );
		if( draggedOverList && draggedTodo ){
			
			//draggedOverList.props.blah();
			draggedOverList.droppedOn( draggedTodo );
		}
		else{
			console.error( "handleDragEnd - draggedOverList not found" )
		}
		
		
		setDraggedOverListId( null );
		
		
		
	}
	
	
	
	
	
	function getTodoListIdFromTitle( title:string ){
		
		return todoListPropsArray.find( todoListProp => todoListProp.title == title )?.id;
		
		
		// let id = null;
		
		// Children.forEach( children, child  =>{
		// 	//console.log(child);
			
		// 	//@ts-ignore
		// 	const type = child?.type.name;
			
		// 	if( type == "TodoList" ){
				
		// 		//@ts-ignore
		// 		const todoListTitle = child.props.title;
				
		// 		//@ts-ignore
		// 		const listtodoListId = child.props.id;
				
		// 		if( todoListTitle == title ){
		// 			id = listtodoListId;
		// 		}
		// 	}
			
		// })
		
		// return id;
	}
	
	function getTodoListById( id:string ){
		
		return todoListPropsArray.find( todoListProp => todoListProp.id == id );
		
		// let output = null;
		
		// Children.forEach( children, child  =>{
		// 	//console.log(child);
			
		// 	//@ts-ignore
		// 	const type = child?.type.name;
			
		// 	if( type == "TodoList" ){
				
				
				
		// 		//@ts-ignore
		// 		const listtodoListId = child.props.id;
				
		// 		if( listtodoListId == id ){
		// 			output = child;
		// 		}
		// 	}
			
		// })
		
		// return output;
	}
	
	
	
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);
	const dropAnimation: DropAnimation = {
		...defaultDropAnimation,
	};
	
	
	const childrenWithProps = Children.map(children, child => {

		//@ts-ignore
		const type = child.type.name;

		if (type == "TodoList") {

			//@ts-ignore
			const id = child.props.id;
			const draggedOver: boolean = id == draggedOverListId;

			//@ts-ignore
			return cloneElement(child, { draggedOver: draggedOver });
		}
		return child;
	});
	
	return (
		<div className="todo-board">
			<DndContext
				sensors={sensors}
				//collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				>
				
				{/* {children} */}
				{childrenWithProps}
				
				<DragOverlay 
					dropAnimation={dropAnimation}
					modifiers={[restrictToWindowEdges]}
					>
					{ draggedTodo &&
						<TodoItem todo={draggedTodo} pickedUp />
					}
				</DragOverlay>
				
			</DndContext>
			
		</div>
	)
}
