import { configureStore } from '@reduxjs/toolkit';
import todo from '@store/slices/todo';

const store = configureStore({
  reducer: {
    todo
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
