import { FC, FormEvent, useState } from 'react';
import { iTodo } from '@/types';
import { Todo } from './Todo.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { active, completed } from '@/utils/todos.ts';
import { Send, X } from 'lucide-react';
import { useStore } from '@/store';

const renderTodos = (list: iTodo[]) => (
  <>
    {list.map((todo: iTodo) => (
      <Todo todo={todo} key={todo.id} />
    ))}
  </>
);
export const TodoList: FC<{ todos: iTodo[] }> = ({ todos }) => {
  const [value, setValue] = useState<string>('');
  const clearInput = () => {
    if (!value) {
      return;
    }

    setValue(() => '');
  };
  const createNewTodo = useStore((state) => state.createNewTodo);
  const clearCompletedTodos = useStore((state) => state.clearCompletedTodos);
  const submitTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createNewTodo(value);
    clearInput();
  };

  return (
    <div className={'p-5 rounded-lg bg-sky-100 w-full flex flex-col items-center justify-center'}>
      <form onSubmit={submitTodo} className="grid w-full items-center gap-1.5 relative p-2">
        <Button
          type={'submit'}
          disabled={!value.trim()}
          title={'Add todo'}
          variant={'ghost'}
          className={'absolute w-8 p-0 h-8 left-3.5 top-3'}
        >
          <Send size={18} strokeWidth={1} />
        </Button>
        <Input
          className={'px-12'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="What needs to be done?"
        />
        <Button
          onClick={clearInput}
          disabled={!value}
          title={'Clear input'}
          variant={'ghost'}
          className={'absolute w-8 p-0 h-8 right-3.5 top-3 '}
        >
          <X />
        </Button>
      </form>
      <Separator className={'mt-4'} />

      <div className={'flex w-full p-2 gap-5'}>
        <Tabs defaultValue="all" className="w-full select-none">
          <TabsContent value="all">{renderTodos(todos)}</TabsContent>
          <TabsContent value="active">{renderTodos(active(todos))}</TabsContent>
          <TabsContent value="completed">{renderTodos(completed(todos))}</TabsContent>

          <Separator className={'mt-4'} />

          <div className={'flex justify-between items-center mt-5 gap-5'}>
            <p className="leading-7 w-28">
              {active(todos).length} item{active(todos).length > 1 && 's'} left
            </p>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <Button onClick={clearCompletedTodos} disabled={!todos.find((todo) => todo.completed)}>
              Clear completed
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
