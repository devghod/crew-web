import React from 'react';
import TodoItem from '../../components/Todo/TodoItem';

export interface Todo {
  id: number;
  completed: boolean;
  todo: string;
};

export interface Todos extends Array<Todo> {};

export interface TodoList {
  todos: Todos;
  onDelete: Function;
  onEdit: Function;
};

const TodoList: React.FC<TodoList> = ({ todos, onDelete, onEdit } ) => {
  
  return (
    <>
      <div className='mx-auto max-w-sm border rounded-lg p-4 bg-white'>
        {todos.length === 0 ? (
          <div className='mx-auto text-center text-gray-500'>No data</div>
        ) : (
          todos.map((curr: Todo, idx: number) => (
            <TodoItem 
              key={idx} 
              data={curr} 
              onDelete={() => onDelete(curr.id)}
              onEdit={() => onEdit(curr.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TodoList;