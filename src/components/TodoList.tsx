import { FC } from "react";
import { iTodo } from "@/types";
import { Todo } from "./Todo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const TodoList: FC<{ todos: iTodo[] }> = ({ todos }) => {
  return (
    <div className={'p-5 rounded-lg bg-sky-100'}>
      <Input className={'mb-5'} type="text" placeholder={'What needs to be done?'} />
      {todos.map((todo: iTodo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <Separator />

      <div className={'flex gap-5 mt-5 justify-between'}>
        <p>{todos.length} items left</p>
        <div className={'flex gap-3'}>
          <Button>All</Button>
          <Button>Active</Button>
          <Button>Completed</Button>
        </div>
        <Button>Clear completed</Button>
      </div>
    </div>
  );
};
