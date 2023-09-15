import { FC } from 'react';
import { iTodo } from '@/types';
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";

export const Todo: FC<{ todo: iTodo }> = ({ todo }) => {
  const { completed, value } = todo;
  return (
    <div className={'flex p-3 mb-3 rounded-lg border-solid border-2 border-sky-500 justify-between'}>
      <div className={'flex gap-5 items-center'}>
        <Checkbox defaultChecked={completed} />
        <div>{value}</div>
      </div>
      <div>
        <Button>Delete</Button>
      </div>
    </div>
  );
};


