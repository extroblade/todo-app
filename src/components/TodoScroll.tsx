import { iTodo } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Todo } from '@/components/Todo.tsx';
import { FC } from 'react';

export const TodoScroll: FC<{ todos: iTodo[] }> = ({ todos }) => {
  return (
    <ScrollArea className="bg-white h-[50vh] w-full rounded-md border p-4">
      {todos?.length ? (
        todos.map((todo: iTodo) => <Todo id={todo.id} key={todo.id} />)
      ) : (
        <p className={'flex items-center justify-center font-medium uppercase'}>nothing found</p>
      )}
    </ScrollArea>
  );
};
