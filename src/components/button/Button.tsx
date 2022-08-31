import {FC, ReactNode} from 'react';

type ButtonProps = {
    children: ReactNode;
}

export const Button: FC<ButtonProps> = ({children}) => (
    <button className='w-[25px] h-[25px]'>
        {children}
    </button>
);
