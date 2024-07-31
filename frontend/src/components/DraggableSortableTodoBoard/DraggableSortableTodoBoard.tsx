import { useEffect, useState } from "react";

import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges} from '@dnd-kit/modifiers';


import { Todo } from "../../models/Todo";
import TodoItem from "../TodoItem/TodoItem";
import DraggableSortableTodoList from "./DraggableSortableTodoList/DraggableSortableTodoList";

import "./DraggableSortableTodoBoard.scss";

  
type DraggableSortableTodoBoardProps = {
	draggableLists: DraggableSortableList[],
	droppedOnList: (todoId:string , listId:string , index:number) => void;
}
export type DraggableSortableList = {
	id: string
	title: string
	todos: Todo[]
	addTaskClicked: () => void
	className?: string
}
export default function DraggableSortableTodoBoard(props: DraggableSortableTodoBoardProps) {
	
	const [draggableLists, setDraggableLists] = useState( [...props.draggableLists] );
	const [draggedTodo, setDraggedTodo] = useState<Todo|null>( null );
	
	const [draggedOverList, setDraggedOverList] = useState<DraggableSortableList|null>( null );
	
	
	useEffect(() => {
		setDraggableLists( [...props.draggableLists] );
	}, [props.draggableLists])
	
	
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	)
	
	
	function handleDragStart({ active }: DragStartEvent){
		console.log( { DragStartEvent: { active } } );
		
		const draggedTodo = active.data.current?.value as Todo;
		setDraggedTodo( draggedTodo );
	}
	function handleDragOver({ active , over }: DragOverEvent){
		console.log( { DragOverEvent: { active, over } } );
		
		
		if( !over ){
			console.log("handleDragOver - draged over nothing");
			return;
		}
		
		const draggedTodo = active.data.current?.value as Todo;
		
		const draggedOverThing = over?.data.current;
		if( !draggedOverThing ){
			console.log("handleDragOver - no dragged over data");
			return;
		}
		
		console.log("handleDragOver - dragged over type: " + draggedOverThing.type + " (" + draggedOverThing.value.title + ")" );
		
		if( draggedOverThing.type == "Todo" ){
			console.log( {"draggedOverThing.value": draggedOverThing.value } )
			const draggedOverTodo = draggedOverThing.value as Todo;
			handleDraggedOverTodo( draggedTodo , draggedOverTodo );
		}
		
		if( draggedOverThing.type == "DraggableList" ){
			const draggedOverList:DraggableSortableList = draggedOverThing.value as DraggableSortableList;
			handleDraggedOverList( draggedTodo , draggedOverList );
		}
		
		
		// const draggedOverTodo = over?.data.current as Todo;
		// if( draggedOverTodo ){
		// 	handleDraggedOverTodo( draggedTodo , draggedOverTodo );
		// }
		// else{
		// 	console.log("dragged over someting other than a todo");
			
		// }
		
		
		
		
	}
	function handleDraggedOverTodo( draggedTodo:Todo , draggedOverTodo:Todo ){
		
		console.log( "handleDraggedOverTodo: " + draggedTodo.title );
		const draggedFromList = getDraggableListOfTodo( draggedTodo );
		const draggedOverList = getDraggableListOfTodo( draggedOverTodo );
		
		if( !draggedFromList || !draggedOverList ){
			console.log("handleDraggedOverTodo - no draggedFromList/draggedOverList");
			return;
		}
		
		//dont do anything if didnt drag to a different list
		if( draggedFromList.id == draggedOverList.id ){
			console.log("handleDraggedOverTodo - dragged over same list");
			return;
		}
		
		if( !draggedOverList ) return;
		
		setDraggedOverList( draggedOverList );
		
		const draggedOverIndex = getIndexOfTodo( draggedOverList.todos , draggedOverTodo );
		
		handleDraggedOverAnotherList( draggedFromList , draggedOverList , draggedTodo , draggedOverIndex )
	}
	function handleDraggedOverList( draggedTodo:Todo , draggedOverList:DraggableSortableList ){
		
		console.log( "handleDraggedOverList: " + draggedOverList.title );
		//use index 0? or last index?
		const draggedFromList = getDraggableListOfTodo( draggedTodo );
		const draggedOverIndex = draggedOverList.todos.length;
		
		if( !draggedFromList || !draggedOverList ){
			console.log("handleDraggedOverList - no draggedFromList/draggedOverList");
			return;
		}
		
		setDraggedOverList( draggedOverList );
		
		handleDraggedOverAnotherList( draggedFromList , draggedOverList , draggedTodo , draggedOverIndex )
	}
	
	function handleDragEnd({ active, over }: DragEndEvent){
		console.log( { DragEndEvent: { active, over } } );
		
		setDraggedOverList( null );
		
		if( !over ){
			console.log("handleDragEnd - no over");
			return;
		}
		
		const droppedTodo = active.data.current?.value as Todo;
		
		//dropped on a list containing todos, so it registers as a drop over a Todo
		if( over?.data?.current?.sortable ){
			const droppedOnListTitle = over.data.current.sortable.containerId;
			const droppedOnListId = getListByTitle(droppedOnListTitle)?.id;
			if( !droppedOnListId ){
				console.log("handleDragEnd - could find list with title: " + droppedOnListTitle );
				return;
			}
			
			const index = over.data.current.sortable.index;
			console.log( "dropped on list: " + droppedOnListId + ", index: " + index );
			props.droppedOnList( droppedTodo.id , droppedOnListId , index )
		}
		
		//dropped on the list itself (when it's empty, or on the title)
		if( over?.data?.current?.type == "DraggableList" ){
			const droppedOnListId = over.data.current.value.id;
			console.log( "dropped on list: " + droppedOnListId );
			
			const droppedOnList = getListById(droppedOnListId);
			if( !droppedOnList ){
				console.log("handleDragEnd - could find list with ID: " + droppedOnListId );
				return;
			}
			const index = droppedOnList?.todos.length;
			console.log( "dropped on list: " + droppedOnListId + ", index: " + index );
			
			props.droppedOnList( droppedTodo.id , droppedOnListId , index )
		}
		
	}
	
	function getListById( listId:string ): DraggableSortableList|undefined{
		return draggableLists.find( draggableList => draggableList.id == listId )
			
	}
	function getListByTitle( listTitle:string ): DraggableSortableList|undefined{
		return draggableLists.find( draggableList => draggableList.title == listTitle )
			
	}
	
	function getDraggableListOfTodo( todoSearched: Todo ): DraggableSortableList|null{
		
		
		for (let i = 0; i < draggableLists.length; i++) {
			const draggableList = draggableLists[i];
			
			const index = draggableList.todos.findIndex( todo => todo.id === todoSearched.id );
			const found = (index != -1);
			if( found ){
				return draggableList;
			}
		}
		
		console.error({ 
			message: "getDraggableListOfTodo - failed to find DraggableList",
			todoSearched,
			draggableLists
		});
		return null;
		
	}
	
	function handleDraggedOverAnotherList( draggedFromList:DraggableSortableList , draggedOverList:DraggableSortableList , draggedTodo:Todo , draggedOverIndex:number ){
		
		console.log( "handleDraggedOverAnotherList: " + "from: " + draggedFromList.title + " to: " + draggedOverList.title );
		
		
		const updatedDraggedFromList = removeFromList( draggedFromList , draggedTodo );
		const updatedDraggedOverList = addToList( draggedOverList , draggedTodo , draggedOverIndex );
		
		setDraggedList( updatedDraggedFromList );
		setDraggedList( updatedDraggedOverList );
		
	}
	function setDraggedList( updatedDraggableList:DraggableSortableList ){
		const index = draggableLists.findIndex( draggableList => draggableList.id == updatedDraggableList.id );
		
		const newState = [...draggableLists];
		newState[index] = updatedDraggableList;
		setDraggableLists( newState );
	}
	
	function getIndexOfTodo( list:Todo[] , todoSearched:Todo ){
		return list.findIndex( todo => todo.id === todoSearched.id );
	}
	
	function removeFromList( draggableList:DraggableSortableList , todoToRemove:Todo ): DraggableSortableList {
		draggableList.todos = draggableList.todos.filter( todo => todo.id != todoToRemove.id );
		return draggableList;
	}
	function addToList( draggableList:DraggableSortableList , todoToAdd:Todo , index:number ): DraggableSortableList {
		draggableList.todos = [ 
			...draggableList.todos.slice( 0 , index ), 
			todoToAdd, 
			...draggableList.todos.slice(index,draggableList.todos.length)
		]
		return draggableList;
	}
	
	const dropAnimation: DropAnimation = {
		...defaultDropAnimation,
	};
	
	return (
		<div className="draggable-sortable-todo-board">
			
			<DndContext
				sensors={sensors}
				//collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				>
					
				{ draggableLists.map( draggableList => 
					<DraggableSortableTodoList key={draggableList.id}
						draggableList={draggableList}
						hovered={ draggedOverList?.id == draggableList.id }
						addTaskClicked={ () => draggableList.addTaskClicked() }
					/>
				) }
				
				
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
