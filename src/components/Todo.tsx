import { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox.tsx';
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
import { Trash } from 'lucide-react';
import { useDeleteTodos, useTodo, useToggleTodoState } from '@/hooks';

export const Todo: FC<{ id: string }> = ({ id }) => {
  const deleteTodo = useDeleteTodos();
  const switchTodoState = useToggleTodoState();
  const todo = useTodo(id);
  if (!todo) {
    return <p>wrong id</p>;
  }
  const { completed, value } = todo;
  return (
    <label
      className={`cursor-pointer bg-sky-100 hover:bg-sky-200 flex items-center gap-5 max-w-2xl p-2 mb-3 rounded-lg border-solid border-2 border-sky-500 justify-between ${
        completed && 'text-gray-500 bg-gray-300 hover:bg-gray-400 border-gray-500 line-through'
      }`}
    >
      <div className={'flex gap-2 items-center'}>
        <Checkbox onClick={() => switchTodoState(id)} checked={completed} />
        <p className={'max-w-sm break-all font-medium uppercase'}>{value}</p>
      </div>

      <div className={'flex items-center justify-center'}>
        <AlertDialog>
          <AlertDialogTrigger title={'Delete todo'}>
            <Trash data-testid={id} className={'text-red-400 hover:text-red-600'} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteTodo(id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </label>
  );
};
