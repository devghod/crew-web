import React from 'react';

const TodoList = ({ todos }: any) => {
  
  return (
    <>
      <div className='border rounded-lg p-4 bg-white'>
        {
          todos.map((curr, idx) => (
            <div key={idx}>
              <h1>{curr.id}</h1>
              <p>{curr.todo}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default TodoList;