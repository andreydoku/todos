

import { validateTodoUpdateRequest } from "../src/Validator";



const requestBody = {
	title: "wash bitches",
	done: 1,
}


const result = validateTodoUpdateRequest( requestBody );
console.log( result )

//npx ts-node tests/TodoUpdateRequestTest.ts