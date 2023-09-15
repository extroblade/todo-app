import './App.css';
import { TodoList } from './components/Todo.tsx';
import { iTodo } from './types';
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
    <>
      <h2>ToDos</h2>
      <h1 className="text-3xl font-bold underline text-red-400">Hello world!</h1>
      <TodoList todos={todos} />
    </>
  );
}

export default App;
