import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { todoSliceActions, fetchTodo } from '@store/slices/todo';

const allActions = {
  ...todoSliceActions,
  fetchTodo
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => bindActionCreators(allActions, useAppDispatch());
