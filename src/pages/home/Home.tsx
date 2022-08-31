import { FC } from 'react';
import { useFetch } from '@hooks/useFetch';
import { BASE_URL } from '@utils/constants';
import { Todo } from '@types';
import { TodoList } from '@components/todoList/TodoList';

type HomeProps = {};

export const Home: FC<HomeProps> = () => {
  const { loading, error, data } = useFetch<Todo>(BASE_URL);
  return (
    <div>
      {loading ? <h3>Loading</h3> : null}
      {data ? <TodoList items={data} /> : <h3>{error}</h3>}
    </div>
  );
};
