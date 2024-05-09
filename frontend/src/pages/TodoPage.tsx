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

  if (loading) {
    return <Loader height={16} width={16} color="" />
  }

  return (
    <>
      <TodoList todos={todos} />
    </>
  )
}

export default TodoPage;