

import { Todo } from "../../models/Todo";
import { TodosRestClient } from "../../restClient/TodosRestClient";
import "./TodayPage.scss";
import { useEffect, useState } from "react";



export default function TodayPage() {

	const title = "Today";
	const todosRestClient:TodosRestClient = new TodosRestClient();
	
	const [ todos , setTodos ] = useState<Todo[]>( [] );

	useEffect( () => {
		fetchTodaysTodos();
	} , [] );
	const fetchTodaysTodos = async () => {
		
		//const today = new Date();
		const today = new Date("2024-07-23");
		
		const fetchedTodos:Todo[] = await todosRestClient.getTodosForDate(today);
		setTodos( fetchedTodos );
	};

	return (
		<div className="today-page">
			<h1>{title}</h1>

			


		</div>

	);
}



