import { validateRequestForCreateTodo } from "../src/Controller";
import { Todo } from "../src/Todo";
import { validateDate } from "../src/Validator";



function test1(){
	
	const todo:Todo = {id:"1", title:"blah", done: false, doDate:"2019-05-03"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
	
	
}
function test2(){
	const todo:Todo = {id:"1", title:"blah", done: false, doDate:"wtf is this"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}
function test3(){
	const todo:Todo = {id:"1", title:"blah", done: false, doDate:"2019/05/03"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}
function test4(){
	const todo:Todo = {id:"1", title:"blah", done: false, doDate:"05-03-2024"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}



function blah(){
	
	let doDate = "05/26/1989";
	validateDate(doDate);
}
blah();

//test2();
// test3();
// test4();



//npx ts-node tests/ValidationTest.ts
