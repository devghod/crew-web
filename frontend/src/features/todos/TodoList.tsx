import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }: any) => {
  
  return (
    <>
      <div className='border rounded-lg p-4 bg-white'>
        {
          todos.map((curr: any, idx: number) => (
            <TodoItem key={idx} data={curr} />
          ))
        }
      </div>
    </>
  );
};

export default TodoList;