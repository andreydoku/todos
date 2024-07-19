import './TodoItem.scss';

import { FaTrash } from 'react-icons/fa';
import { FaRegSquare , FaCheckSquare } from 'react-icons/fa';
import { useState , useEffect } from 'react';
import { Todo } from '../../models/Todo';

type TodoItemProps = {
	todo: Todo
	checkboxClicked: ( id:string , newChecked:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	deleteClicked: ( id:string ) => void
}
function TodoItem({ todo , checkboxClicked , titleChanged , deleteClicked }: TodoItemProps){
	
	if( checkboxClicked === undefined )  checkboxClicked = () => {};
	if( titleChanged === undefined ) titleChanged = () => {}
	if( deleteClicked === undefined ) deleteClicked = () => {}
	
	var className = "todo-item shadow-2";
	if( todo.done ) className += " done";
	
	
	return(
		
		<div className={className}>
			
			<div className='left'>
				
				{todo.done ? 
					// <FaRegCheckSquare className='check-box'/> 
					<FaCheckSquare 
						className='check-box' 
						onClick={ () => checkboxClicked( todo.id ,false )}
					/> 
					: 
					<FaRegSquare   
						className='check-box' 
						onClick={ () => checkboxClicked( todo.id , true ) }
					/> 
				}
				
				<TitleField 
					title={todo.title} 
					onTitleChange={ (newTitle) => titleChanged( todo.id , newTitle ) }
				/>
				
				
			</div>
			
			<FaTrash 
				className='delete-icon'
				onClick={ () => deleteClicked( todo.id ) }
			/>
			
		</div>
		
	);
	
}
export default TodoItem;


type TitleFieldProps = {
	title: string
	onTitleChange: ( newTitle:string ) => void
}
function TitleField({ title , onTitleChange }: TitleFieldProps){
	
	const [ text , setText ] = useState( title );
	useEffect( () => {
		
		setText( title );
		
	} , [title] );
	
	
	if( onTitleChange === undefined ) onTitleChange = () => {}
	
	function handleSubmit(e: any){
		console.log( "handleSubmit: " + typeof e );
		
		e.preventDefault();
		
		e.target.children[0].blur();
		
	}
	
	function handleTextChange(e: any){
		
		console.log( "handleTextChange: " + typeof e );
		setText( e.target.value );
		
	}
	function handleFocusLost(e: any){
		
		console.log( "handleFocusLost: " + typeof e );
		
		if( text !== title ){
			setText( title );
			onTitleChange( text );
		}
		
	}
	
	return(
		
		<form onSubmit={ (e) => handleSubmit(e) }>
			
			<input 
				type="text" 
				value={text} 
				onChange={ (e) => handleTextChange(e) }
				onBlur={ (e) => handleFocusLost(e) }
				className="title-field"
			/>
			
		</form>
		
	);
	
	
}




