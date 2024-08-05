import { createContext, useContext } from "react";
import { Todo } from "../../models/Todo";

// export type TodoBoardState{
// 	draggedTodo: Todo|null;
// 	draggedOverListId: string|null;
// }

// const TodoBoardContext = createContext<TodoBoardState>({
// 	draggedTodo: null,
// 	draggedOverListId: null,
// })

// export const useTodoBoardState = () => useContext(TodoBoardContext);