export type Todo = {
	
	id: string|null|undefined;
	title: string
	done: boolean
	
}


export function newTodo( object: any ){
	
	const todo:Todo = {
		id: object.id,
		title: object.title,
		done: object.done
	}
	
	return todo;
	
}