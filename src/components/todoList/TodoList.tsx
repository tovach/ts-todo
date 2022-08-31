import { FC } from 'react';

import { TodoItem } from '@components/todoItem/TodoItem';
import { Todo } from '@types';

type TodoListProps = {
  items: Todo[];
};

export const TodoList: FC<TodoListProps> = ({ items }) => (
  <ul className='flex w-[640px] flex-col gap-2 py-5'>
    {items.map((el) => (
      <li key={el.id}>
        <TodoItem item={el} />
      </li>
    ))}
  </ul>
);
