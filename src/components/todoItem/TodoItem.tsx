import { FC } from 'react';

import { ReactComponent as DoneIcon } from '@assets/img/done.svg';
import { ReactComponent as UnDoneIcon } from '@assets/img/undone.svg';
import { ReactComponent as DeleteIcon } from '@assets/img/delete.svg';
import { Button } from '@components/button/Button';
import { Todo } from '@types';

export type TodoProps = {
  item: Todo;
  onStatusChange: (todo: Todo) => void;
  onDelete: (todo: Todo['id']) => void;
};

export const TodoItem: FC<TodoProps> = ({ item, onStatusChange, onDelete }) => (
  <div className='flex gap-5 rounded border-2 border-amber-300 p-2'>
    <Button onClick={() => onStatusChange(item)}>
      {item.completed ? <DoneIcon /> : <UnDoneIcon />}
    </Button>

    <h3 className={`capitalize ${item.completed ? 'line-through' : ''}`}>{item.title}</h3>

    <div className='ml-auto flex'>
      <Button onClick={() => onDelete(item.id)}>
        <DeleteIcon />
      </Button>
    </div>
  </div>
);
