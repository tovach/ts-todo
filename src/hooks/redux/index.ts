import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store';
import { addTodo, deleteTodo, fetchTodos, toggleTodoStatus } from '@store/slices/todoSlice';

const thunkActions = {
  fetchTodos,
  toggleTodoStatus,
  deleteTodo,
  addTodo
};
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useThunks = () => bindActionCreators(thunkActions, useAppDispatch());
