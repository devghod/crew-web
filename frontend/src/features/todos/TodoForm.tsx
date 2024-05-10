import React from "react";

export interface TodoForm {
  handleChange: (e: any) => void;
  addTodo: (e: any) => void;
  todoVal: string;
  error: string;
};

const TodoForm: React.FC<TodoForm> = ({ addTodo, todoVal, handleChange, error }) => {
  
  return (
    <div className="mx-auto w-2/3 h-fit border rounded-lg p-4 bg-white">
      <form onSubmit={addTodo}>
        <div className="flex flex-col">
          <input 
            className="p-4 rounded-lg border" 
            placeholder="Enter todo here"
            type="text"
            value={todoVal}
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
