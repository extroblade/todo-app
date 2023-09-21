import { create, StateCreator } from 'zustand';
import { iStore, iTodo } from '@/types';
import { switchTodoState } from '@/utils/todos.ts';
const generateId = () => (Math.random() * 100).toString(36);
if (!localStorage.getItem('todos')) {
  localStorage.setItem('todos', '[]');
}
const initialTodos: iTodo[] = JSON.parse(localStorage.getItem('todos') || '') || [];

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
  deleteAllTodos: () =>
    set(() => ({
      todos: [],
    })),
  deleteCompletedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo: iTodo) => !todo.completed),
    })),
});

export const useStore = create<iStore>()(storeCreator);
