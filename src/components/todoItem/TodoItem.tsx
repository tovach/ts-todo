import {FC} from 'react';
import {Todo} from "@types";
import {Button} from "@components/button/Button";

import {ReactComponent as DoneIcon} from '@assets/img/done.svg'
import {ReactComponent as UnDoneIcon} from '@assets/img/undone.svg'


type TodoProps = {
    item: Todo;
}

export const TodoItem: FC<TodoProps> = ({item}) => (
    <div className='p-2 border-amber-300 border-2 rounded flex justify-between'>
        {item.completed ? <h3 className='capitalize line-through'>{item.title}</h3> : <h3 className='capitalize'>{item.title}</h3>}
        {item.completed ? <Button><DoneIcon/></Button> : <Button><UnDoneIcon/></Button>}
    </div>
);
