import React from "react";
import { Todo } from "./TodoList";

export interface TodoForm {
  // handleChange: (e: any) => void;
  onCreate: (e: any) => void;
  selected: Todo;
  isEdit: boolean;
};

const TodoForm: React.FC<TodoForm> = ({ 
  onCreate, 
  selected, 
  isEdit 
}) => {
  const id = Math.floor(Math.random() * 101);
  const [ todo, setTodo ] = React.useState<Todo>(selected);
  const [ error, setError ] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, todo: event.target.value });
  };  

  const validateInput = (input: string) => {
    const regex = /^\s*$/;
    return regex.test(input);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (isEdit) {
      console.log(true)

    } else {
      if (validateInput(todo.todo)) {
        setError('Please enter a todo');
      } else {
        onCreate(todo);
        setError('');
        setTodo({ ...todo, todo: '', id });
      }
    }
  };
  
  return (
    <div className="mx-auto w-2/3 h-fit border rounded-lg p-4 bg-white">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <input 
            className="p-4 rounded-lg border" 
            placeholder="Enter todo here"
            type="text"
            value={todo.todo}
            onChange={handleChange}
          ></input>
          <button 
            className="w-16 mt-4 py-2 bg-blue-500 hover:bg-blue-400 text-sm text-white rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      {error && (
        <div className="text-sm text-red-500 mt-1">{error}</div>
      )}
    </div>
  )
};

export default TodoForm;
