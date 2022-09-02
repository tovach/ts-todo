import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@types';

const isError = (action: AnyAction) => action.type.endsWith('rejected');

export const fetchTodo = createAsyncThunk<Todo[], string, { rejectValue: string }>(
  'todoSlice/fetchTodo',
  async (arg: string, { rejectWithValue }) => {
    try {
      const response = await fetch(arg);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      return await response.json();
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
    }
  }
);

type TodoState = {
  items: Todo[];
};

const initialState: TodoState = {
  items: []
};

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log(action.payload);
      });
  }
});

export const todoSliceActions = todoSlice.actions;
export default todoSlice.reducer;
