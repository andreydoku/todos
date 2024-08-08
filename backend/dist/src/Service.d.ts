import { Todo } from "./Todo";
import { TodoUpdateRequest } from "./TodoUpdateRequest";
import { SortOrder } from "./SortOrder";
export declare class Service {
    getTodo(id: string): Promise<Todo>;
    createTodo(todo: Todo): Promise<Todo>;
    updateTodo(id: string, todoUpdateRequest: TodoUpdateRequest): Promise<Todo>;
    deleteTodo(id: string): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
    getSortOrder(): Promise<SortOrder>;
    updateSortOrder(sortOrder: SortOrder): Promise<SortOrder>;
}
