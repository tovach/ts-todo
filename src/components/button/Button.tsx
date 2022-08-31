import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, className, onClick }) => (
  <button className={`${className || ''} h-[25px] w-[25px]`} onClick={onClick}>
    {children}
  </button>
);
