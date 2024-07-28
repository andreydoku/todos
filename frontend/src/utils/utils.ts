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

export function isSameDate( date1:Dayjs , date2:Dayjs ){
	return date1.format('YYYYMMDD') === date2.format('YYYYMMDD');
}
export function isToday( date1:Dayjs ){
	const today = dayjs();
	return isSameDate( date1 , today );
}
