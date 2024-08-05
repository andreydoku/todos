import dayjs, { Dayjs } from 'dayjs';


export function datejsToString( dayjs: Dayjs|null ){
		
	if( dayjs == null )  return null;
	return dayjs.format('YYYY-MM-DD');
	
}
export function stringToDatejs( str: string|null|undefined ){
	
	if( !str )  return null;
	return dayjs( str );
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


export function isSameDate( date1:Dayjs , date2:Dayjs ){
	return date1.format('YYYYMMDD') === date2.format('YYYYMMDD');
}
export function isToday( date1:Dayjs ){
	const today = dayjs();
	return isSameDate( date1 , today );
}


//@ts-ignore
export function getChildrenByTypeDeep( children , typeSearched:string ){
	
	//@ts-ignore
	let output = [];
	
	if( !children.forEach ){
		children = [children];
	}
	
	//@ts-ignore
	children.forEach( child => {
		
		if( Array.isArray(child) ){
			const nestedChildren = getChildrenByTypeDeep( child , typeSearched );
			//@ts-ignore
			output = [ ...output , ...nestedChildren ];
		}
		else{
			let type = child.type;
			if( child.type.name ){
				type = child.type.name;
			}
			
			if( type == typeSearched ){
				output.push( child );
			}
			
			const children = child.props?.children;
			if( children ){
				const nestedChildren = getChildrenByTypeDeep( children , typeSearched );
				//@ts-ignore
				output = [ ...output , ...nestedChildren ];
			}
		}
		
	});
	
	//@ts-ignore
	return output;
	
}