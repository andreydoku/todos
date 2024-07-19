import { log } from "console";
import { isTodoUpdateRequest } from "../src/TodoUpdateRequest";



const requestBody = {
	title: "wash bitches",
	done: 1,
}


const result = isTodoUpdateRequest( requestBody );
log( result )

//npx ts-node tests/TodoUpdateRequestTest.ts