import { TodoList } from '@/components/TodoList.tsx';

function App() {
  return (
    <div
      className={
        'w-full md:max-w-4xl m-0 md:m-10 bg-sky-200 px-6 pb-12 pt-8 md:rounded-lg flex flex-col items-center justify-center'
      }
    >
      <h1 className="scroll-m-20 mb-5 text-4xl font-extrabold tracking-wide lg:text-5xl">ToDos</h1>
      <TodoList />
    </div>
  );
}

export default App;
