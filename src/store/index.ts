import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '@store/slices/todoSlice';

export const appStore = configureStore({
  reducer: {
    todoSlice
  }
});

export default appStore;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
