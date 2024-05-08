import React from "react";

export interface TodoItem {
  key: number;
  data: any;
};

const TodoItem: React.FC<TodoItem> = ({ data }: any) => {
  
  return (
    // <div className="flex">
    //   <div>{data.id}</div>
    //   <div>{data.todo}</div>
    // </div>
    <div className="grid grid-cols-5 gap-1">
      <div className="">{data.id}</div>
      <div className="col-span-3">{data.todo}</div>
      <div className="">Action here</div>
    </div>
  )
};

export default TodoItem;
