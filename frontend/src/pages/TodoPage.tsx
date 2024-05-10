import React from "react";
import TodoList from "../features/todos/TodoList";
import { Todo, Todos } from "../features/todos/TodoList";
import SkeletonLoader from "../components/SkeletonLoader";
import TodoForm from "../features/todos/TodoForm";

const TodoPage: React.FC = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ todos, setTodos ] = React.useState<Todos>([]);
  const [ todoVal, setTodoVal ] = React.useState('');
  const [ error, setError ] = React.useState('');

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

  const validateInput = (input: string) => {
    const regex = /^\s*$/;
    return regex.test(input);
  }

  const addTodo = (e: any) => {
    e.preventDefault();
    if (validateInput(todoVal)) {
      setError('Please enter a todo');
    } else {
      setLoading(true);
      setError('');
      let randomNumber = Math.floor(Math.random() * 101);
      let tempTodo: Todo = {
        id: randomNumber,
        todo: todoVal,
        completed: false,
      }
      let temp: Todos = [...todos, tempTodo];
      setTodos(temp);
      setTodoVal('');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TodoForm 
          addTodo={addTodo}
          todoVal={todoVal}
          handleChange={handleChange}
          error={error}
        />
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