import React from "react";
import TodoList from "../features/todos/TodoList";
import { Todo, Todos } from "../features/todos/TodoList";
import SkeletonLoader from "../components/SkeletonLoader";
import TodoForm from "../features/todos/TodoForm";

const TodoPage: React.FC = () => {
  const [ loading, setLoading ] = React.useState(false);
  const [ todos, setTodos ] = React.useState<Todos>([]);
  const [ isEdit, setIsEdit ] = React.useState(false);
  const [ selected, setSelected ] = React.useState<Todo>({
    id: 0,
    todo: '',
    completed: false,
  });

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

  const onCreate = (data: Todo) => {
    setLoading(true);
    let temp: Todos = [...todos, data];
    setTodos(temp);
    setLoading(false);
  };

  // const onCreate = (e: any) => {
  //   e.preventDefault();
  //   if (validateInput(todoVal)) {
  //     setError('Please enter a todo');
  //   } else {
  //     setLoading(true);
  //     setError('');
  //     let randomNumber = Math.floor(Math.random() * 101);
  //     let tempTodo: Todo = {
  //       id: randomNumber,
  //       todo: todoVal,
  //       completed: false,
  //     }
  //     let temp: Todos = [...todos, tempTodo];
  //     setTodos(temp);
  //     setTodoVal('');
  //     setLoading(false);
  //   }
  // };

  const onDelete = (id: number) => {
    const temp = todos.filter((obj) => obj.id != id);
    setTodos(temp);
  };

  const onUpdate = () => {
    console.log('update');
  };

  const onEdit = (id: any) => {
    let temp = todos.filter((obj) => obj.id === id);
    console.log('edit', temp[0]);
    setSelected(temp[0]);
    setIsEdit(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TodoForm 
          onCreate={onCreate}
          selected={selected}
          isEdit={isEdit}
        />
        <div className="h-full">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <TodoList 
              todos={todos} 
              onDelete={onDelete}
              onEdit={onEdit}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TodoPage;