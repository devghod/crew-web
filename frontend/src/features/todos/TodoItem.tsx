import React from "react";

export interface TodoItem {
  key: number;
  data: any;
};

const TodoItem: React.FC<TodoItem> = ({ data }: any) => {
  
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="">{data.id}</div>
      <div className="col-span-3">{data.todo}</div>
      <div className="grid grid-cols-2 gap-x-2 my-2">
        <button className="text-green-700 hover:text-green-500">Edit</button>
        <button className="text-red-700 hover:text-red-500">Delete</button>
      </div>
    </div>
  )
};

export default TodoItem;
