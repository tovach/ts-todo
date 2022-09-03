import { FC } from 'react';

type InputProps = {
  name: string;
};

export const Input: FC<InputProps> = ({ name }) => (
  <input
    className='w-full rounded border-2 border-green-400 p-2'
    type='text'
    placeholder='Add new item'
    name={name}
  />
);
