import { FC } from 'react';

import { ReactComponent as DoneIcon } from '@assets/img/done.svg';
import { ReactComponent as UnDoneIcon } from '@assets/img/undone.svg';
import { ReactComponent as EditIcon } from '@assets/img/edit.svg';
import { ReactComponent as DeleteIcon } from '@assets/img/delete.svg';
import { Button } from '@components/button/Button';
import { Todo } from '@types';

export type TodoProps = {
  item: Todo;
  onDone: (id: number) => void;
  onUnDone?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TodoItem: FC<TodoProps> = ({ item, onDone, onUnDone, onEdit, onDelete }) => (
  <div className='flex gap-5 rounded border-2 border-amber-300 p-2'>
    {item.completed ? (
      <Button onClick={() => onDone(item.id)}>
        <DoneIcon />
      </Button>
    ) : (
      <Button onClick={onUnDone}>
        <UnDoneIcon />
      </Button>
    )}

    <h3 className={`capitalize ${item.completed ? 'line-through' : ''}`}>{item.title}</h3>

    <div className='ml-auto flex gap-2'>
      <Button onClick={onEdit}>
        <EditIcon />
      </Button>
      <Button onClick={onDelete}>
        <DeleteIcon />
      </Button>
    </div>
  </div>
);
