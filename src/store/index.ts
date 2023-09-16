import { create } from 'zustand';
import { iTodo } from '@/types';
import { switchTodoState } from '@/utils/todos.ts';
import { generateId } from '@/utils/generate.ts';

const initialTodos: iTodo[] = [
  {
    id: '1',
    value: 'todo1',
    completed: false,
    created: 0,
  },
  {
    id: '2',
    value: 'todo2',
    completed: true,
    created: 1,
  },
  {
    id: '3',
    value: 'todo3',
    completed: false,
    created: 2,
  },
  {
    id: '4',
    value: 'Todo!',
    completed: false,
    created: 3,
  },
];

interface iStore {
  todos: iTodo[];
  changeTodoState: (id: string) => void;
  clearCompletedTodos: () => void;
  createNewTodo: (value: string) => void;
  deleteOneTodo: (id: string) => void;
}

export const useStore = create<iStore>((set) => ({
  todos: initialTodos,
  changeTodoState: (id) =>
    set((state) => ({
      todos: switchTodoState(state.todos, id),
    })),
  createNewTodo: (value) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: generateId(), completed: false, value: value, created: Date.now() },
      ],
    })),
  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.map((todo) => ({ ...todo, completed: false })),
    })),
  deleteOneTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  deleteAllTodos: () =>
    set(() => ({
      todos: [],
    })),
}));
