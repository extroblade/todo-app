import { FC, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { active, completed } from '@/utils/todos.ts';
import { Send, X } from 'lucide-react';
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
import {
  useClearCompletedTodos,
  useCreateTodo,
  useDeleteAllTodos,
  useDeleteCompletedTodos,
  useTodos,
} from '@/hooks';

export const TodoList: FC = () => {
  const [value, setValue] = useState<string>('');
  const todos = useTodos();
  const clearInput = () => {
    setValue(() => '');
  };
  const createNewTodo = useCreateTodo();
  const clearCompletedTodos = useClearCompletedTodos();
  const deleteAllTodos = useDeleteAllTodos();
  const deleteCompletedTodos = useDeleteCompletedTodos();
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
          className={'px-12 font-medium text-sm md:text-lg'}
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
          className={'absolute w-8 p-0 h-8 right-3.5 top-3'}
        >
          <X />
        </Button>
      </form>
      <Separator className={'mt-4'} />

      <div className={'flex flex-col w-full p-2 gap-5'}>
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

          <div className={'flex flex-col justify-between items-center mt-5 gap-5 md:flex-row'}>
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
        <div
          className={
            'flex flex-col md:flex-row justify-center md:justify-between gap-5 items-center'
          }
        >
          <Button className={'bg-red-500'} onClick={deleteAllTodos} disabled={!todos.length}>
            Delete all
          </Button>
          <Button
            className={'bg-red-500'}
            onClick={deleteCompletedTodos}
            disabled={!todos.find((todo) => todo.completed)}
          >
            Delete completed
          </Button>
        </div>
      </div>
    </div>
  );
};
