import { FC } from 'react';

import '@app/styles/index.css';
import {Route, Routes} from "react-router";
import {Home, Todo} from "@pages";

export const App: FC = () => (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path='/todo' element={<Todo/>}/>
    </Routes>
);
