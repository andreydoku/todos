import { describe, expect, test } from '@jest/globals';
import { validateCreateRequest } from '../src/Validator';

//npm test -- ValidateCreateRequest.test.ts

test( "good request - without doDate" , () => {
	
	const request = {
		title: "do homework",
		done: false,
	}
	
	const expected = null;
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "good request - with doDate" , () => {
	
	const request = {
		title: "do homework",
		done: false,
		doDate: "2024-07-23"
	}
	
	const expected = null;
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})

test( "title - missing" , () => {
	
	const request = {
		done: false,
	}
	
	const expected = "field 'title' is missing";
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "title - wrong format" , () => {
	
	const request = {
		title: 15,
		done: false
	}
	
	const expected = "field 'title' is wrong type!  input: number,  required: string";
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "done - missing" , () => {
	
	const request = {
		title: "do homework",
	}
	
	const expected = "field 'done' is missing";
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "done - wrong format" , () => {
	
	const request = {
		title: "do homework",
		done: "true"
	}
	
	const expected = "field 'done' is wrong type!  input: string,  required: boolean";
	const result = validateCreateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})

/*
	npm test -- ValidateCreateRequest.test.ts
*/