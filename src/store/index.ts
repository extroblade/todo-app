import { create, StateCreator } from 'zustand';
import { iStore, iTodo } from '@/types';
import { switchTodoState } from '@/utils/todos.ts';
const generateId = () => (Math.random() * 100).toString(36);

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

export const storeCreator: StateCreator<iStore> = (set) => ({
  todos: initialTodos,
  changeTodoState: (id) =>
    set((state) => ({
      todos: switchTodoState(state.todos, id),
    })),
  createNewTodo: (value) =>
    set((state) => ({
      todos: [...state.todos, { id: generateId(), completed: false, value, created: Date.now() }],
    })),
  clearCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.map((todo) => ({ ...todo, completed: false })),
    })),
  deleteOneTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo: iTodo) => todo.id !== id),
    })),
});

export const useStore = create<iStore>()(storeCreator);
