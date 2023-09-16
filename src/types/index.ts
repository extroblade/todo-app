export interface iTodo {
  id: string;
  value: string;
  completed: boolean;
  created: number;
}

export interface iStore {
  todos: iTodo[];
  changeTodoState: (id: string) => void;
  clearCompletedTodos: () => void;
  createNewTodo: (value: string) => void;
  deleteOneTodo: (id: string) => void;
}
