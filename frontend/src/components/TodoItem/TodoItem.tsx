import { FaTrash , FaRegSquare , FaCheckSquare } from 'react-icons/fa';
import { useState , useEffect, useRef } from 'react';
import { Todo } from '../../models/Todo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ButtonDatePicker from '../ButtonDatePicker/ButtonDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { datejsToString, stringToDatejs } from '../../utils/utils';

import './TodoItem.scss';

type TodoItemProps = {
	todo: Todo
	pickedUp?: boolean
	
	doneChanged?: ( id:string , newDone:boolean ) => void
	titleChanged?: ( id:string , newTitle:string ) => void
	dateChanged?: ( id:string , newDate:string|null ) => void
	deleteClicked?: ( id:string ) => void
}
function TodoItem({ todo , pickedUp=false, doneChanged , titleChanged , dateChanged , deleteClicked }: TodoItemProps){
	
	let cn = "todo-item";
	if( todo.done ) cn += " done";
	if( pickedUp ) cn += " picked-up";
	
	
	if( !doneChanged) doneChanged = ()=>{}
	if( !titleChanged) titleChanged = ()=>{}
	if( !dateChanged) dateChanged = ()=>{}
	if( !deleteClicked) deleteClicked = ()=>{}
	
	
	return(
		
		<div className={cn}>
			
			<DoneCheckbox
				checked = {todo.done}
				checkboxClicked = { (checked) => doneChanged( todo.id , checked ) }
			/>
			
			<TitleField 
				title={todo.title} 
				onTitleChange={ (newTitle) => titleChanged( todo.id , newTitle ) }
			/>
			
			
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ButtonDatePicker
					label={ todo.doDate }
					value={ stringToDatejs(todo.doDate) }
					onChange={(dayjs) => dateChanged( todo.id , datejsToString(dayjs) )}
				/>
    		</LocalizationProvider>
			
			<DeleteButton deleteClicked={() => deleteClicked(todo.id)} />
				
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
			<div className='done-checkbox checked'>
				<FaCheckSquare 
					onClick={ () => checkboxClicked( false )}
				/> 
			</div>
				
		);
		
	}
	else{
		return(
			<div className='done-checkbox unchecked'>
				<FaRegSquare   
					onClick={ () => checkboxClicked( true ) }
				/>
			</div>
			
		);
	}
	
	
}


type TitleFieldProps = {
	title: string
	onTitleChange: ( newTitle:string ) => void
}
function TitleField({ title , onTitleChange }: TitleFieldProps){
	
	const inputRef = useRef(null);
	
	const [ text , setText ] = useState( title );
	useEffect( () => {
		
		setText( title );
		
	} , [title] );
	
	
	if( onTitleChange === undefined ) onTitleChange = () => {}
	
	function handleSubmit(e: any){
		e.preventDefault();
		
		e.target.children[0].blur();
		
	}
	
	function handleTextChange(e: any){
		
		setText( e.target.value );
		
	}
	function handleFocusGained(e: any){
		e.target.select()
	}
	function handleFocusLost(e: any){
		
		console.log({ handleFocusLost: e });
		
		if( text !== title ){
			setText( title );
			onTitleChange( text );
		}
		
	}
	
	return(
		
		<form onSubmit={ (e) => handleSubmit(e) }>
			
			<input ref={inputRef}
				type="text" 
				value={text} 
				onChange={ (e) => handleTextChange(e) }
				onFocus={ (e) => handleFocusGained(e) }
				onBlur={ (e) => handleFocusLost(e) }
				className="title-field"
			/>
			
		</form>
		
	);
	
	
}

type DeleteButtonProps = {
	deleteClicked: () => void
}
function DeleteButton({ deleteClicked }: DeleteButtonProps){
	return(
		<div className='delete-button'>
			<FaTrash 
				className='delete-icon'
				onClick={ () => deleteClicked() }
			/>
		</div>
	);
}



