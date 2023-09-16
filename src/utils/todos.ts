import { iTodo } from '@/types';

export const completed = (todos: iTodo[]): iTodo[] => todos.filter((todo) => todo.completed);

export const active = (todos: iTodo[]): iTodo[] => todos.filter((todo) => !todo.completed);

export const switchTodoState = (todos: iTodo[], id: string): iTodo[] | undefined => {
  const found = todos.find((todo) => todo.id === id);
  if (!found) {
    return;
  }
  return [...todos.filter((todo) => todo.id !== id), { ...found, completed: !found.completed }];
};
