import { FC, useState } from 'react';

import { Button } from '@components/button/Button';

type PaginationProps = {
  totalPages: number;
  onClick: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ totalPages, onClick }) => {
  const [active, setActive] = useState(0);

  const clickHandler = (index: number) => {
    setActive(index);
    onClick(index + 1);
  };

  return (
    <ul className='flex gap-2'>
      {Array(totalPages)
        .fill(0)
        .map((el, index) => (
          <li key={index}>
            <Button
              className={`${
                active === index ? 'border-green-500' : 'border-amber-300'
              } flex items-center justify-center rounded border-2`}
              onClick={() => clickHandler(index)}
            >
              {index + 1}
            </Button>
          </li>
        ))}
    </ul>
  );
};
