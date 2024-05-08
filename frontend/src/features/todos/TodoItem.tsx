import React from "react";

export interface TodoItem {
  key: number;
  data: any;
};

const TodoItem: React.FC<TodoItem> = ({ data }: any) => {
  
  return (
    <div className="grid grid-cols-5 gap-4 mb-2">
      <div className="col-span-4 text-wrap text-gray-900">{data.todo}</div>
      <div className="grid grid-cols-1 gap-2">
        <button className="text-green-700 hover:text-green-500 font-semibold text-sm">Edit</button>
        <button className="text-red-700 hover:text-red-500 text-sm">Delete</button>
      </div>
    </div>
  )
};

export default TodoItem;
