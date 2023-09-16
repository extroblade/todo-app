import { TodoList } from '@/components/TodoList.tsx';
import { useStore } from '@/store';

function App() {
  const todos = useStore((state) => state.todos).sort((a, b) => a.created - b.created);

  return (
    <div
      className={
        'max-w-4xl m-10 bg-sky-200 px-6 pb-12 pt-8 rounded-lg flex flex-col items-center justify-center'
      }
    >
      <h1 className="scroll-m-20 mb-5 text-4xl font-extrabold tracking-tight lg:text-5xl">ToDos</h1>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
