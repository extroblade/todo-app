import { TodoList } from '@/components/TodoList.tsx';
import { iTodo } from '@/types';
const todos: iTodo[] = [
  {
    id: 1,
    value: 'todo1',
    completed: false,
  },
  {
    id: 2,
    value: 'todo2',
    completed: true,
  },
  {
    id: 3,
    value: 'todo3',
    completed: false,
  },
];

function App() {
  return (
    <div className={'max-w-3xl m-10 bg-sky-200 px-6 py-12 rounded-lg flex flex-col items-center justify-center'}>
      <h2>ToDos</h2>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
