import { Todo } from "./Todo";
import { TodoUpdateRequest } from "./TodoUpdateRequest";
export declare class Service {
    getTodo(id: string): Promise<Todo>;
    createTodo(todo: Todo): Promise<Todo>;
    updateTodo(id: string, todoUpdateRequest: TodoUpdateRequest): Promise<Todo>;
    getUpdateExpression(object: Object): string;
    getExpressionAttributeValues(object: Object): object;
    deleteTodo(id: string): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
}
