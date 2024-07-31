
import { expect, test } from '@jest/globals';
import { validateTodoUpdateRequest } from '../src/Validator';

//npm test -- Validator.test.ts


test( "good object, without doDate" , () => {
	
	const request = {
		title: "do the dishes",
		done: true,
	}
	
	const expected = null;
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "good object, with doDate" , () => {
	
	const request = {
		title: "do the dishes",
		done: true,
		doDate: "2024-05-23"
	}
	
	const expected = null;
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "empty object" , () => {
	
	const request = {
		
	}
	
	const expected = "object cannot be empty";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "null object" , () => {
	
	const request = null;
	
	const expected = "object cannot be null";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "bad object - extra fields" , () => {
	
	const request = {
		title: "do the dishes",
		done: true,
		doDate: "2024-05-23",
		someBullshit: "wtf",
		someOtherBullshit: "wtf is this"
	}
	
	const expected = "field 'someBullshit' is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})



test( "title - wrong type" , () => {
	
	const request = {
		title: 1,
	}
	
	const expected = "field 'title' is wrong type!  input: number,  required: string";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "title - null" , () => {
	
	const request ={
		title: null,
	}
	
	const expected = "field 'title' is null, which is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "title - empty string" , () => {
	
	const request ={
		title: "",
	}
	
	const expected = "field 'title' is empty string, which is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "title - spaces" , () => {
	
	const request = {
		title: "   ",
	}
	
	const expected = "field 'title' is empty string, which is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})


test( "done - positive test case" , () => {
	
	const request = {
		done: false
	}
	
	const expected = null;
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "done - used isDone instead" , () => {
	
	const request = {
		isDone: false
	}
	
	const expected = "field 'isDone' is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "done - wrong type" , () => {
	
	const request = {
		done: 1,
	}
	
	const expected = "field 'done' is wrong type!  input: number,  required: boolean";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})



test( "doDate - used date instead" , () => {
	
	const request = {
		date: "2024-05-26"
	}
	
	const expected = "field 'date' is not allowed";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "doDate - YYYY-MM-DD" , () => {
	
	const request = {
		doDate: "2024-05-26"
	}
	
	const expected = null;
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "doDate - YYYY/MM/DD" , () => {
	
	const request ={
		doDate: "2024/05/26"
	}
	
	const expected = "field 'doDate' is invalid date format";
	const result = validateTodoUpdateRequest( request );
	console.log( result );
	
	expect( result ).toBe( expected );
	
})
test( "doDate - MM/DD/YYYY" , () => {
	
	const request = {
		doDate: "05/26/1989"
	}
	
	const expected = "field 'doDate' is invalid date format";
	const result = validateTodoUpdateRequest( request );
	console.log({ request , expected , result });
	
	expect( result ).toBe( expected );
	
})
test( "doDate - invalid string" , () => {
	
	const request = {
		doDate: "what the fuck"
	}
	
	const expected = "field 'doDate' is invalid date format";
	const result = validateTodoUpdateRequest( request );
	console.log({ request , expected , result });
	
	expect( result ).toBe( expected );
	
})
test( "doDate - 2024-99-99" , () => {
	
	const request = {
		doDate: "2024-99-99"
	}
	
	const expected = "field 'doDate' is invalid date format";
	const result = validateTodoUpdateRequest( request );
	console.log({ request , expected , result });
	
	expect( result ).toBe( expected );
	
})
test( "doDate - null" , () => {
	
	const request = {
		doDate: null
	}
	
	const expected = null;
	const result = validateTodoUpdateRequest( request );
	console.log({ request , expected , result });
	
	expect( result ).toBe( expected );
	
})


