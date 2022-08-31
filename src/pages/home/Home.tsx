import { FC, useState } from 'react';

import { Pagination } from '@components/pagination/Pagination';
import { TodoList } from '@components/todoList/TodoList';
import { useFetch } from '@hooks/useFetch';
import { Todo } from '@types';
import { BASE_URL } from '@utils/constants';

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const totalTodos = 200;
  const totalPages = Math.ceil(totalTodos / limit);

  const { loading, error, data } = useFetch<Todo>(`${BASE_URL}?_page=${page}&_limit=${limit}`);

  const paginationHandler = (page: number) => {
    setPage(page);
  };

  return (
    <div className='flex flex-col items-center'>
      {loading ? <h3>Loading</h3> : null}
      {data ? <TodoList items={data} /> : <h3>{error}</h3>}
      <Pagination totalPages={totalPages} onClick={paginationHandler} />
    </div>
  );
};
