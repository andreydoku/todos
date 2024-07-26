import { log } from "console";
import { validateTodoUpdateRequest } from "../src/TodoUpdateRequest";



const requestBody = {
	title: "wash bitches",
	done: 1,
}


const result = validateTodoUpdateRequest( requestBody );
log( result )

//npx ts-node tests/TodoUpdateRequestTest.ts