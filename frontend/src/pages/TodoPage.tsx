import React from "react";
import TodoList from "../features/todos/TodoList";
import Loader from "../components/Loader";

const TodoPage: React.FC = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ todos, setTodos ] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/todos`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.todos);
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col px-4">
          <textarea className="p-4 rounded-lg" placeholder="Enter todo here"></textarea>
          <button className="m-2 p-2 bg-blue-500 text-white rounded">Submit</button>
        </div>
        <div className="h-full">
          {loading ? (
            <Loader height={16} width={16} color="" />
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </>
  )
}

export default TodoPage;