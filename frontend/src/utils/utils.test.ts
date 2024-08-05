import dayjs from 'dayjs';
import { expect, test } from 'vitest';
import { datejsToString, getMondayOf } from './utils';


test( "getMondayOf - 7/26/2024" , () => {
	
	const input = dayjs("7/26/2024");
	
	const expected = dayjs("7/22/2024");
	const result = getMondayOf( input );
	console.log({ 
		input: datejsToString(input) , 
		expected: datejsToString(expected) ,
		result: datejsToString(result) 
	});
	
	expect( result.toISOString() ).toBe( expected.toISOString() );
	
})

test( "getMondayOf - 7/28/2024" , () => {
	
	const input = dayjs("7/28/2024");
	
	const expected = dayjs("7/22/2024");
	const result = getMondayOf( input );
	console.log({ 
		input: datejsToString(input) , 
		expected: datejsToString(expected) ,
		result: datejsToString(result) 
	});
	
	expect( result.toISOString() ).toBe( expected.toISOString() );
	
})

test( "getMondayOf - 7/22/2024" , () => {
	
	const input = dayjs("7/22/2024");
	
	const expected = dayjs("7/22/2024");
	const result = getMondayOf( input );
	console.log({ 
		input: datejsToString(input) , 
		expected: datejsToString(expected) ,
		result: datejsToString(result) 
	});
	
	expect( result.toISOString() ).toBe( expected.toISOString() );
	
})