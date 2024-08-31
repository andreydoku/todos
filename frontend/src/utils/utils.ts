import dayjs, { Dayjs } from 'dayjs';
import { Todo } from '../models/Todo';
import { TodoUpdateRequest } from '../models/TodoUpdateRequest';


export function datejsToString( dayjs: Dayjs|null ){
		
	if( dayjs == null )  return null;
	return dayjs.format('YYYY-MM-DD');
	
}
export function stringToDatejs( str: string|null|undefined ){
	
	if( !str )  return null;
	return dayjs( str );
}

export function getToday(): Dayjs{
	return dayjs().startOf("day");
}

export function getMondayOf( date:Dayjs ){
		
	const dayOfWeek:number = date.day();//Sun=0, Mon=1, etc
	//const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	
	let toSubtract = 0;
	if( dayOfWeek == 0 ) toSubtract = 6;//Sunday
	else toSubtract = dayOfWeek-1;
	
	return date.subtract( toSubtract , "day" );
	
}

export function getDayOfWeek(date:Dayjs){
	const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const dayOfWeek:number = date.day();
	
	return weekdays[dayOfWeek];
}


export function isSameDate( date1:Dayjs , date2:Dayjs ): boolean {
	return date1.format('YYYYMMDD') === date2.format('YYYYMMDD');
}
export function isToday( date1:Dayjs ){
	const today = getToday();
	return isSameDate( date1 , today );
}
export function isSameDayOrAfter( date1:Dayjs , date2:Dayjs ): boolean {
	
	return date1.isSame( date2 , "day" ) || 
		   date1.isAfter( date2 , "day" );
	
}
export function isSameDayOrBefore( date1:Dayjs , date2:Dayjs ): boolean {
	
	return date1.isSame( date2 , "day" ) || 
		   date1.isBefore( date2 , "day" );
	
}
export function isDayWithinRange( date:Dayjs , dateFrom:Dayjs , dateTo:Dayjs ): boolean {
	
	return isSameDayOrAfter( date , dateFrom ) &&
		   isSameDayOrBefore( date , dateTo )
	
}


//@ts-ignore
export function getChildrenByIdDeep( children , idStartsWith:string ){
	
	//@ts-ignore
	let output = [];
	
	if( !children.forEach ){
		children = [children];
	}
	
	
	
	//@ts-ignore
	children.forEach( child => {
		
		if( Array.isArray(child) ){
			const nestedChildren = getChildrenByIdDeep( child , idStartsWith );
			//@ts-ignore
			output = [ ...output , ...nestedChildren ];
		}
		else{
			
			const id = child.props.id;
			if( id && id.startsWith(idStartsWith) ){
				output.push( child );
			}
			
			const children = child.props?.children;
			if( children ){
				const nestedChildren = getChildrenByIdDeep( children , idStartsWith );
				//@ts-ignore
				output = [ ...output , ...nestedChildren ];
			}
		}
		
	});
	
	//@ts-ignore
	return output;
	
}

export function isEmptyString( value: any ){
	
	if( value == null || value == undefined ){
		return false;
	}
	
	return (typeof value ) == "string"   &&   value.trim() === "";
	
}


export function applyTodoUpdateRequest( todo:Todo , todoUpdateRequest:TodoUpdateRequest ){
	if( todoUpdateRequest.title  !== undefined )	todo.title = todoUpdateRequest.title;
	if( todoUpdateRequest.doDate !== undefined )	todo.doDate = todoUpdateRequest.doDate;
	if( todoUpdateRequest.done   !== undefined )	todo.done = todoUpdateRequest.done;
}