import { FC } from "react";
import { iTodo } from "@/types";
import { Todo } from "./Todo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

const renderTodos = (list: iTodo[]) => {
  return (
    <>
      {list.map((todo: iTodo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </>
  )
}
export const TodoList: FC<{ todos: iTodo[] }> = ({ todos }) => {
  return (
    <div className={'p-5 rounded-lg bg-sky-100 w-full flex flex-col items-center justify-center'}>
      <Input className={'mb-5'} type="text" placeholder={'What needs to be done?'} />

      <Separator />

      <div className={'flex w-full p-2 gap-5 mt-5'}>
        <Tabs defaultValue="all" className="w-full">

          <TabsContent value="all">{renderTodos(todos)}</TabsContent>
          <TabsContent value="active">{renderTodos(todos)}</TabsContent>
          <TabsContent value="completed">{renderTodos(todos)}</TabsContent>

          <div className={'flex justify-between items-center mt-5'}>
            <p className="leading-7">
              {todos.length} items left
            </p>

            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <Button>Clear completed</Button>

          </div>
        </Tabs>
      </div>
    </div>
  );
};
