import {FC} from 'react';
import {Todo} from "@types";
import {TodoItem} from "@components/todoItem/TodoItem";

type TodoListProps = {
    items: Todo[];
}

export const TodoList: FC<TodoListProps> = ({items}) => (
    <ul className='max-w-[640px] m-auto flex flex-col gap-2 py-5'>
        {items.map(el=>
        <li key={el.id}>
            <TodoItem item={el}/>
        </li>)}
    </ul>
);
