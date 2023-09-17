import { FC, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { active, completed } from '@/utils/todos.ts';
import { Send, X } from 'lucide-react';
import { useStore } from '@/store';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { TodoScroll } from '@/components/TodoScroll.tsx';

export const TodoList: FC= () => {
  const [value, setValue] = useState<string>('');
  const todos = useStore(state => state.todos).sort((a,b) => a.created - b.created);
  const clearInput = () => {
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
          className={
            'ease-in duration-300 absolute w-8 p-0 h-8 left-3.5 top-3 enabled:text-green-400'
          }
        >
          <Send size={18} strokeWidth={2} />
        </Button>
        <Input
          className={'px-12 font-medium text-lg'}
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
          <TabsContent value="all">
            <TodoScroll todos={todos} />
          </TabsContent>
          <TabsContent value="active">
            <TodoScroll todos={active(todos)} />
          </TabsContent>
          <TabsContent value="completed">
            <TodoScroll todos={completed(todos)} />
          </TabsContent>

          <Separator className={'mt-4'} />

          <div className={'flex justify-between items-center mt-5 gap-5'}>
            <p className="leading-7 w-28">{active(todos).length} active left</p>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <AlertDialog>
              <AlertDialogTrigger title={'Delete todo'} asChild>
                <Button disabled={!todos.find((todo) => todo.completed)}>Clear completed</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearCompletedTodos}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
