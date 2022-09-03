import React, { FC, useEffect, useState } from 'react';

import { Form } from '@components/form/Form';
import { Pagination } from '@components/pagination/Pagination';
import { TodoItem, TodoProps } from '@components/todoItem/TodoItem';
import { TodoList } from '@components/todoList/TodoList';
import { useAppSelector, useThunks } from '@hooks/redux';
import { Todo } from '@types';
import { BASE_URL } from '@utils/constants';

import '@app/styles/index.css';

export const App: FC = () => {
  const { items, error, loading, totalEntities } = useAppSelector((state) => state.todoSlice);
  const { fetchTodos, toggleTodoStatus, deleteTodo, addTodo } = useThunks();
  const [page, setPage] = useState(1);
  const entitiesLimit = 10;
  const totalPages = Math.ceil(Number(totalEntities) / entitiesLimit);
  const url = `${BASE_URL}?_page=${page}&_limit=${entitiesLimit}`;

  const paginationHandler = (index: number) => setPage(index);
  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { todoTitle } = Object.fromEntries(data.entries());

    if (typeof todoTitle === 'string') {
      const todo: Todo = {
        title: todoTitle,
        completed: false,
        userId: 1,
        id: Date.now()
      };

      addTodo(todo);
    }
    e.currentTarget.reset();
  };

  const renderItem = (item: Todo): React.ReactElement<TodoProps> => (
    <TodoItem item={item} onStatusChange={toggleTodoStatus} onDelete={deleteTodo} />
  );

  useEffect(() => {
    fetchTodos(url);
  }, [page]);

  return (
    <>
      {loading && <h3 className='absolute top-0 left-1/2 text-2xl'>Loading...</h3>}
      <div
        className={`${
          loading === true ? 'opacity-30' : 'opacity-100'
        } m-auto mt-20 flex w-[640px] flex-col items-center gap-2 duration-100`}
      >
        {items.length !== 0 ? (
          <>
            <Form onSubmit={formHandler} />
            <TodoList items={items} renderItem={renderItem} />
            <Pagination totalPages={totalPages} onClick={paginationHandler} />
          </>
        ) : (
          <h3 className='absolute top-5 text-2xl'>{error}</h3>
        )}
      </div>
    </>
  );
};
