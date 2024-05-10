import React from "react";
import TodoList from "../features/todos/TodoList";
import { Todo, Todos } from "../features/todos/TodoList";
import SkeletonLoader from "../components/SkeletonLoader";

const TodoPage: React.FC = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ todos, setTodos ] = React.useState<Todos>([]);
  const [ todoVal, setTodoVal ] = React.useState('');

  React.useEffect(() => {
    // setLoading(true);
    // fetch(`https://dummyjson.com/todos`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTodos(data.todos);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.error('Error:', error));
  }, []);

  const handleChange = (e: any) => {
    setTodoVal(e.target.value);
  };

  const addTodo = () => {
    let randomNumber = Math.floor(Math.random() * 101);
    let tempTodo: Todo = {
      id: randomNumber,
      todo: todoVal,
      completed: false,
    }
    let temp: Todos = [...todos, tempTodo];
    setTodos(temp);
    setTodoVal('');
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col px-4">
          <textarea 
            className="p-4 rounded-lg" 
            placeholder="Enter todo here"
            value={todoVal}
            onChange={handleChange}
          ></textarea>
          <button 
            className="w-16 my-4 py-2 bg-blue-500 hover:bg-blue-400 text-sm text-white rounded"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <div className="h-full">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </>
  )
}

export default TodoPage;