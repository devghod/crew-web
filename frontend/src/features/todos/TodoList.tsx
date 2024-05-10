import React from 'react';
import TodoItem from './TodoItem';

export interface Todo {
  id: number;
  completed: boolean;
  todo: string;
}

export interface Todos extends Array<Todo> {}

const TodoList: React.FC<{ todos: Todos }> = ({ todos }) => {
  
  return (
    <div>
      <div className='mx-auto max-w-sm border rounded-lg p-4 bg-white'>
        {todos.length === 0 ? (
          <div className='mx-auto text-center text-gray-500'>No data</div>
        ) : (
          todos.map((curr: any, idx: number) => (
            <TodoItem key={idx} data={curr} />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;