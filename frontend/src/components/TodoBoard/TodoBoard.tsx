import { Children, cloneElement, createContext, ReactNode, useContext, useState } from "react";
import "./TodoBoard.scss";

import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges} from '@dnd-kit/modifiers';
import { Todo } from "../../models/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { TodoListProps } from "./TodoList/TodoList";
import { getChildrenByTypeDeep } from "../../utils/utils";


export type TodoBoardState = {
	draggedTodo: Todo|null;
	draggedOverListId: string|null;
}
const TodoBoardContext = createContext<TodoBoardState>({
	draggedTodo: null,
	draggedOverListId: null,
})
export const useTodoBoardState = () => useContext(TodoBoardContext);


type TodoBoardProps = {
	children: ReactNode
}
export default function TodoBoard({ children }: TodoBoardProps) {
	
	const [draggedTodo, setDraggedTodo] = useState<Todo|null>( null );
	const [draggedOverListId, setDraggedOverListId] = useState<string|null>( null );
	
	
	//TODO - look into useCallback and useMemo
	const todoListPropsArray:TodoListProps[] = getChildrenByTypeDeep( children , "TodoList" )
													.map( child => child.props as TodoListProps );

	
	
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
		
		const draggedOverList:TodoListProps|undefined = getTodoListById( draggedOverListId );
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
	
	function getTodoListById( id:string ): TodoListProps|undefined{
		
		//return todoListPropsArray.find( todoListProp => todoListProp.id == id );
		
		const output = todoListPropsArray.find( todoListProp => todoListProp.id == id );
		
		if( output == undefined ){
			console.log("failed to find todolist by id: " + id);
			console.log({ todoListPropsArray })
			
		}
			
			
		return output;
		
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
	
	
	return (
		<TodoBoardContext.Provider value={{ draggedTodo , draggedOverListId }}>
		
			<div className="todo-board">
				<DndContext
					sensors={sensors}
					//collisionDetection={closestCorners}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
					>
					
					{children}
					
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
		
		</TodoBoardContext.Provider>
	);
}
