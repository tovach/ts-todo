import { FC } from 'react';
import { Route, Routes } from 'react-router';

import { Home, Todo } from '@pages';

import '@app/styles/index.css';

export const App: FC = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path='/todo' element={<Todo />} />
  </Routes>
);
