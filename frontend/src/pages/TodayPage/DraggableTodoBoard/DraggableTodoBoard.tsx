import { useEffect, useState } from "react";
import "./DraggableTodoBoard.scss";
import { Todo } from "../../../models/Todo";
import DraggableTodoList from "../DraggableTodoList/DraggableTodoList";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import TodoItem from "../../../components/TodoItem/TodoItem";
import { TodosState } from "../../../main";


type DraggableTodoBoardProps = {
	draggableLists: DraggableList[],
	droppedOnList: (todoId:string , listId:string , index:number) => void;
	todosState: TodosState
}
export type DraggableList = {
	id: string
	title: string
	todos: Todo[]
}
export default function DraggableTodoBoard(props: DraggableTodoBoardProps) {
	
	
	const [draggableLists, setDraggableLists] = useState( [...props.draggableLists] );
	//console.log({draggableLists})
	
	//TODO - rename to draggedTodo
	const [activeTodo, setActiveTodo] = useState<Todo|null>( null );
	//console.log({activeTodo: activeTodo});
	
	const { doneChanged , titleChanged , dateChanged , deleteClicked } = props.todosState;
	if( !doneChanged ){
		console.error("DraggableTodoBoard: doneChanged not set!");
	}
	
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
		setActiveTodo( draggedTodo );
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
			const draggedOverList:DraggableList = draggedOverThing.value as DraggableList;
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
		
		const draggedOverIndex = getIndexOfTodo( draggedOverList.todos , draggedOverTodo );
		
		handleDraggedOverAnotherList( draggedFromList , draggedOverList , draggedTodo , draggedOverIndex )
	}
	function handleDraggedOverList( draggedTodo:Todo , draggedOverList:DraggableList ){
		
		console.log( "handleDraggedOverList: " + draggedOverList.title );
		//use index 0? or last index?
		const draggedFromList = getDraggableListOfTodo( draggedTodo );
		const draggedOverIndex = draggedOverList.todos.length;
		
		if( !draggedFromList || !draggedOverList ){
			console.log("handleDraggedOverList - no draggedFromList/draggedOverList");
			return;
		}
		
		handleDraggedOverAnotherList( draggedFromList , draggedOverList , draggedTodo , draggedOverIndex )
	}
	
	function handleDragEnd({ active, over }: DragEndEvent){
		console.log( { DragEndEvent: { active, over } } );
		
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
	
	function getListById( listId:string ): DraggableList|undefined{
		return draggableLists.find( draggableList => draggableList.id == listId )
			
	}
	function getListByTitle( listTitle:string ): DraggableList|undefined{
		return draggableLists.find( draggableList => draggableList.title == listTitle )
			
	}
	
	function getDraggableListOfTodo( todoSearched: Todo ): DraggableList|null{
		
		
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
	
	function handleDraggedOverAnotherList( draggedFromList:DraggableList , draggedOverList:DraggableList , draggedTodo:Todo , draggedOverIndex:number ){
		
		console.log( "handleDraggedOverAnotherList: " + "from: " + draggedFromList.title + " to: " + draggedOverList.title );
		
		
		const updatedDraggedFromList = removeFromList( draggedFromList , draggedTodo );
		const updatedDraggedOverList = addToList( draggedOverList , draggedTodo , draggedOverIndex );
		
		setDraggedList( updatedDraggedFromList );
		setDraggedList( updatedDraggedOverList );
		
	}
	function setDraggedList( updatedDraggableList:DraggableList ){
		const index = draggableLists.findIndex( draggableList => draggableList.id == updatedDraggableList.id );
		
		const newState = [...draggableLists];
		newState[index] = updatedDraggableList;
		setDraggableLists( newState );
	}
	
	function getIndexOfTodo( list:Todo[] , todoSearched:Todo ){
		return list.findIndex( todo => todo.id === todoSearched.id );
	}
	
	function removeFromList( draggableList:DraggableList , todoToRemove:Todo ): DraggableList {
		draggableList.todos = draggableList.todos.filter( todo => todo.id != todoToRemove.id );
		return draggableList;
	}
	function addToList( draggableList:DraggableList , todoToAdd:Todo , index:number ): DraggableList {
		draggableList.todos = [ 
			...draggableList.todos.slice( 0 , index ), 
			todoToAdd, 
			...draggableList.todos.slice(index,draggableList.todos.length)
		]
		return draggableList;
	}
	
	
	return (
		<div className="draggable-todo-board">
			
			<DndContext
				sensors={sensors}
				//collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				>
					
				{ draggableLists.map( draggableList => 
					<DraggableTodoList key={draggableList.id}
						draggableList={draggableList}
						doneChanged={doneChanged}
						titleChanged={titleChanged}
						dateChanged={dateChanged}
						deleteClicked={deleteClicked}
					/>
				) }
				
				{ activeTodo &&
					<DragOverlay /*dropAnimation={dropAnimation}*/  >
						<TodoItem todo={activeTodo} pickedUp />
					</DragOverlay>
				}
				
				
			</DndContext>
			
		</div>
	)
	
}
