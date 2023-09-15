import { FC } from 'react';
import { iTodo } from '../types';

const generateId = () => (Math.random() * 100).toString(36);
export const Todo: FC<{ todo: iTodo }> = ({ todo }) => {
  const { completed, value } = todo;
  return (
    <div className={''}>
      <input type="checkbox" defaultChecked={completed} />
      <div>{value}</div>
      {generateId()}
    </div>
  );
};

export const TodoList: FC<{ todos: iTodo[] }> = ({ todos }) => {
  return (
    <div>
      <input type="text" placeholder={'What needs to be done?'} />
      {todos.map((todo: iTodo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <div className={'flex'}>
        <p>{todos.length} items left</p>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
        <button>Clear completed</button>
      </div>
    </div>
  );
};
