import './SampleTodoItem.scss';

import dayjs, { Dayjs } from 'dayjs';
import { Todo } from '../../../models/Todo';

type TodoItemProps = {
	todo: Todo
}
function SampleTodoItem({ todo }: TodoItemProps){
	
	let className = "sample-todo-item";
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
			
			<p className="title-field">
				{todo.title} 
			</p>
			
			<DateLabel date={todo.doDate}/>
			
		</div>
		
	);
	
}
export default SampleTodoItem;



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



