import './TodoItem.scss';

import { FaTrash } from 'react-icons/fa';
import { FaRegSquare , FaCheckSquare } from 'react-icons/fa';
import { useState , useEffect } from 'react';
import { Todo } from '../../models/Todo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ButtonDatePicker from '../ButtonDatePicker/ButtonDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

type TodoItemProps = {
	todo: Todo
	doneChanged: ( id:string , newDone:boolean ) => void
	titleChanged: ( id:string , newTitle:string ) => void
	dateChanged: ( id:string , newDate:string|null ) => void
	deleteClicked: ( id:string ) => void
}
function TodoItem({ todo , doneChanged , titleChanged , dateChanged , deleteClicked }: TodoItemProps){
	
	let className = "todo-item";
	if( todo.done ) className += " done";
	
	
	
	function datejsToString( dayjs: Dayjs|null ){
		
		if( dayjs == null )  return null;
		return dayjs.format('YYYY-MM-DD');
		
	}
	function stringToDatejs( str: string|null|undefined ){
		
		if( !str )  return null;
		return dayjs( str );
	}
	
	
	return(
		
		<div className={className}>
			
			<DoneCheckbox
				checked = {todo.done}
				checkboxClicked = { (checked) => doneChanged( todo.id , checked ) }
			/>
			
			<TitleField 
				title={todo.title} 
				onTitleChange={ (newTitle) => titleChanged( todo.id , newTitle ) }
			/>
			
			{/* <DateLabel date={todo.doDate}/> */}
			
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ButtonDatePicker
					label={todo.doDate}
					value={ stringToDatejs(todo.doDate) }
					onChange={(dayjs) => dateChanged( todo.id , datejsToString(dayjs) )}
				/>
    		</LocalizationProvider>
			
			<FaTrash 
				className='delete-icon'
				onClick={ () => deleteClicked( todo.id ) }
			/>
				
		</div>
		
	);
	
}
export default TodoItem;

type DoneCheckboxProps = { 
	checked: boolean,
	checkboxClicked: ( checked:boolean ) => void }
function DoneCheckbox({ checked , checkboxClicked }: DoneCheckboxProps ){
	
	if( checked ){
		
		return(
			<FaCheckSquare 
				className='check-box' 
				onClick={ () => checkboxClicked( false )}
			/> 
		);
		
	}
	else{
		return(
			<FaRegSquare   
				className='check-box' 
				onClick={ () => checkboxClicked( true ) }
			/>
		);
	}
	
	
}


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

type DateLabelProps = {
	date: string|undefined
}
function DateLabel({ date }: DateLabelProps){
	return(
		<div className='date-label'>
			{date}
		</div>
	);
}



