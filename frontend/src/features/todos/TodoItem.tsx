import React from "react";
import { Todo } from "./TodoList";

export interface TodoItem {
  key: number;
  data: Todo;
  onDelete: (id: any) => void; 
  onEdit: (id: any) => void;
};

const TodoItem: React.FC<TodoItem> = ({ data, onDelete, onEdit }) => {
  
  return (
    <div className="grid grid-cols-5 gap-4 mb-2">
      <div className="col-span-4 text-wrap text-gray-900">{data.todo}</div>
      <div className="grid grid-cols-1 gap-2">
        <button 
          className="text-green-700 hover:text-green-500 font-semibold text-xs"
          onClick={onEdit}
        >Edit</button>
        <button 
          className="text-red-700 hover:text-red-500 font-semibold text-xs"
          onClick={onDelete}
        >Delete</button>
      </div>
    </div>
  )
};

export default TodoItem;
