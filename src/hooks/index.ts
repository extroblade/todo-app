import { useStore } from '@/store';
import { iTodo } from '@/types';

export const useDeleteOneTodo = (): ((id: string) => void) => {
  return useStore((state) => state.deleteOneTodo);
};

export const useToggleTodoState = (): ((id: string) => void) => {
  return useStore((state) => state.changeTodoState);
};

export const useTodos = (): iTodo[] => {
  return useStore((state) => state.todos).sort((a, b) => a.created - b.created);
};

export const useTodo = (id: string): iTodo | undefined => {
  return useStore((state) => state.todos).find((todo) => todo.id === id);
};

export const useCreateTodo = () => {
  return useStore((state) => state.createNewTodo);
};

export const useClearCompletedTodos = () => {
  return useStore((state) => state.clearCompletedTodos);
};

export const useDeleteAllTodos = () => {
  return useStore((state) => state.deleteAllTodos);
};

export const useDeleteCompletedTodos = () => {
  return useStore((state) => state.deleteCompletedTodos);
};
