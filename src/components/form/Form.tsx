import React, { FC } from 'react';
import { Input } from '@components/input/Input';

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: FC<FormProps> = ({ onSubmit }) => (
  <form className='flex w-full gap-2' onSubmit={onSubmit}>
    <Input name='todoTitle' />
    <button className='cursor-pointer rounded border-2 border-amber-400 px-5'>Add</button>
  </form>
);
