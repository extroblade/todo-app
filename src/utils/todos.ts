import { iTodo } from '@/types';

export const completed = (todos: iTodo[]) => todos.filter((todo) => todo.completed);

export const active = (todos: iTodo[]) => todos.filter((todo) => !todo.completed);

export const switchTodoState = (todos: iTodo[], id: string) => {
  const found = todos.find((todo) => todo.id === id);
  console.log(todos, id);
  if (!found) {
    return;
  }
  return [...todos.filter((todo) => todo.id !== id), { ...found, completed: !found.completed }];
};

export const getTodo = (todos: iTodo[], id: string) => {
  return todos.find((todo) => todo.id === id);
};
