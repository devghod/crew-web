import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }: any) => {

  if (todos.length === 0) {
    return (
      <div className='border rounded-lg p-4 bg-white'>
        No data
      </div>
    );
  }
  
  return (
    <div>
      <div className='mx-auto max-w-96 border rounded-lg p-4 bg-white'>
        {
          todos.map((curr: any, idx: number) => (
            <TodoItem key={idx} data={curr} />
          ))
        }
      </div>
    </div>
  );
};

export default TodoList;