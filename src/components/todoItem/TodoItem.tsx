import { FC } from 'react';

import { ReactComponent as DoneIcon } from '@assets/img/done.svg';
import { ReactComponent as UnDoneIcon } from '@assets/img/undone.svg';
import { Button } from '@components/button/Button';
import { Todo } from '@types';

type TodoProps = {
  item: Todo;
};

export const TodoItem: FC<TodoProps> = ({ item }) => (
  <div className='flex justify-between rounded border-2 border-amber-300 p-2'>
    {item.completed ? (
      <h3 className='capitalize line-through'>{item.title}</h3>
    ) : (
      <h3 className='capitalize'>{item.title}</h3>
    )}
    {item.completed ? (
      <Button>
        <DoneIcon />
      </Button>
    ) : (
      <Button>
        <UnDoneIcon />
      </Button>
    )}
  </div>
);
