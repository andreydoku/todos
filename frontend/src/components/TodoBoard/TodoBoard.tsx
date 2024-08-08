import { createContext, ReactNode, useContext, useState } from "react";
import "./TodoBoard.scss";

import { defaultDropAnimation, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, DropAnimation, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges} from '@dnd-kit/modifiers';
import { Todo } from "../../models/Todo";
import TodoItem from "../TodoItem/TodoItem";
import { TodoListProps } from "./TodoList/TodoList";
import { getChildrenByTypeDeep } from "../../utils/utils";
import { useTodos } from "../../providers/TodoProvider";


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
	const [draggedFromListId, setDraggedFromListId] = useState<string|null>( null );
	
	const [draggedOverTodoId, setDraggedOverTodoId] = useState<string|null>( null );
	const [draggedOverListId, setDraggedOverListId] = useState<string|null>( null );
	
	
	//TODO - look into useCallback and useMemo
	const todoListPropsArray:TodoListProps[] = getChildrenByTypeDeep( children , "TodoList" )
		.map( child => child.props as TodoListProps );
	
		
	const { moveTodoSortOrder } = useTodos();
	
	
	
	function handleDragStart({ active }: DragStartEvent){
		console.log( { DragStartEvent: { active } } );
		
		const draggedTodo = active.data.current?.value as Todo;
		setDraggedTodo( draggedTodo );
		
		const draggedFromThing = active.data.current;
		if( draggedFromThing == undefined ){
			console.log( "handleDragStart - active.data.current is undefined" );
			return;
		}
		
		const draggedFromListId = draggedFromThing.sortable.containerId;
		
		console.log( "dragged from: " + draggedFromListId );
		setDraggedFromListId( draggedFromListId ?? null );
		
		
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
			
			const draggedToListId = draggedOverThing.sortable.containerId;
			const draggedToIndex = draggedOverThing.sortable.index;
			const draggedOverTodoId = draggedOverThing.sortable.items[draggedToIndex];
			
			setDraggedOverTodoId( draggedOverTodoId );
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
		
		if( !draggedTodo ){
			console.error( "handleDragEnd - draggedTodo is null" )
			return;
		}
		
		if( !draggedFromListId ){
			console.error( "handleDragEnd - draggedFromListId is null" )
			return;
		}
		
		const draggedOverList:TodoListProps|undefined = getTodoListById( draggedOverListId );
		if( !draggedOverList ){
			console.error( "handleDragEnd - draggedOverList not found" )
			return;
		}
		
		
		
		
		//draggedOverList.droppedOn( draggedTodo );
		
		//moved to another list
		if( draggedOverList.id != draggedFromListId ){
			draggedOverList.droppedOn( draggedTodo );
		}
		
		//sorted within same list
		if( draggedOverList.id == draggedFromListId ){
			
			if( draggedOverTodoId == null ){
				console.error( "draggedOverTodoId is null" );
			}
			else{
				moveTodoSortOrder( draggedTodo.id , draggedOverTodoId );
			}
			
			
			
		}
		
		setDraggedOverTodoId( null );
		setDraggedOverListId( null );
		
	}
	
	
	
	function getTodoListById( id:string ): TodoListProps|undefined{
		
		return todoListPropsArray.find( todoListProp => todoListProp.id == id );
		
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
