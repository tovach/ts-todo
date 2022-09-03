import React, { FC } from 'react';

import { Todo } from '@types';
import { TodoProps } from '@components/todoItem/TodoItem';

type TodoListProps = {
  items: Todo[];
  renderItem: (item: Todo) => React.ReactElement<TodoProps>;
};

export const TodoList: FC<TodoListProps> = ({ items, renderItem }) => (
  <ul className='flex w-full flex-col gap-2 py-5'>
    {items.map((el) => (
      <li key={el.id}>{renderItem(el)}</li>
    ))}
  </ul>
);
