import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { deleteTodo, fetchTodos, toggleTodoStatus, addTodo } from '@store/slices/todoSlice';
import { bindActionCreators } from '@reduxjs/toolkit';

const thunkActions = {
  fetchTodos,
  toggleTodoStatus,
  deleteTodo,
  addTodo
};
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useThunks = () => bindActionCreators(thunkActions, useAppDispatch());
