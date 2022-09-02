import React, { FC, useCallback, useEffect, useState } from 'react';

import { Pagination } from '@components/pagination/Pagination';
import { TodoList } from '@components/todoList/TodoList';
import { Todo } from '@types';
import { BASE_URL } from '@utils/constants';
import { TodoItem, TodoProps } from '@components/todoItem/TodoItem';
import { useAppSelector, useActions, useAppDispatch } from '@hooks/redux';

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const totalTodos = 200;
  const totalPages = Math.ceil(totalTodos / limit);
  const { fetchTodo } = useActions();
  const data = useAppSelector((state) => state.todo.items);
  const url = `${BASE_URL}?_page=${page}&_limit=${limit}`;

  useEffect(() => {
    fetchTodo(url);
  }, [page]);

  const callbacks = {
    paginationHandler: useCallback((page: number) => {
      setPage(page);
    }, []),
    itemDone: useCallback((id: number) => {
      console.log(id);
    }, []),
    itemUnDone: useCallback(() => {
      console.log();
    }, []),
    itemDelete: useCallback(() => {
      console.log();
    }, []),
    itemEdit: useCallback(() => {
      console.log();
    }, [])
  };

  const renderItem = (item: Todo): React.ReactElement<TodoProps> => (
    <TodoItem
      item={item}
      onDone={callbacks.itemDone}
      onUnDone={callbacks.itemUnDone}
      onDelete={callbacks.itemDelete}
      onEdit={callbacks.itemEdit}
    />
  );

  return (
    <div className='flex flex-col items-center'>
      {data ? <TodoList items={data} renderItem={renderItem} /> : <h3>error</h3>}
      <Pagination totalPages={totalPages} onClick={callbacks.paginationHandler} />
    </div>
  );
};
