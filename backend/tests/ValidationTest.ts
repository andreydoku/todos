import { validateRequestForCreateTodo } from "../src/Controller";
import { Todo } from "../src/Todo";



function test1(){
	
	const todo:Todo = {id:"1", title:"blah", done: false, date:"2019-05-03"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
	
	
}
function test2(){
	const todo:Todo = {id:"1", title:"blah", done: false, date:"wtf is this"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}
function test3(){
	const todo:Todo = {id:"1", title:"blah", done: false, date:"2019/05/03"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}
function test4(){
	const todo:Todo = {id:"1", title:"blah", done: false, date:"05-03-2024"};
	const error = validateRequestForCreateTodo(todo);
	
	console.log( error );
}


//npx ts-node tests/ValidationTest.ts


//test2();
test3();
test4();
