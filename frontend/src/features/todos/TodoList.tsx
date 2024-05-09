import React from 'react';
import TodoItem from './TodoItem';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Todos extends Array<Todo> {}

const TodoList: React.FC<{ todos: Todos }> = ({ todos }) => {
  
  return (
    <div>
      <div className='mx-auto max-w-96 border rounded-lg p-4 bg-white'>
        {todos.length === 0? (
          <div className='mx-auto text-center'>No data</div>
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