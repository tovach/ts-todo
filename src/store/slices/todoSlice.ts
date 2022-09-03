import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@types';
import { BASE_URL } from '@utils/constants';
import { RootState } from '@store';

type TodoSliceState = {
  items: Todo[];
  loading: boolean;
  error: null | string;
  totalEntities: string | null;
};

const isReject = (action: AnyAction) => action.type.endsWith('rejected');

export const fetchTodos = createAsyncThunk<
  { data: Todo[]; totalEntities: string | null },
  string,
  { rejectValue: string }
>('todoSlice/fetchTodos', async (arg, thunkAPI) => {
  try {
    const response = await fetch(arg);
    if (!response.ok) {
      throw new Error(`Error occurred, response status code ${response.status}`);
    }
    const data = await response.json();
    const totalEntities = response.headers.get('x-total-count');
    return { data, totalEntities };
  } catch (e) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('Something went wrong...');
  }
});

export const toggleTodoStatus = createAsyncThunk<
  Todo,
  Todo,
  { rejectValue: string; state: RootState }
>('todoSlice/toggleTodoStatus', async (arg, thunkAPI) => {
  const url = `${BASE_URL}/${arg.id}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: !arg.completed
      })
    });

    if (!response.ok) {
      throw new Error(`Error occurred, response status code ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

export const deleteTodo = createAsyncThunk<
  Todo['id'],
  Todo['id'],
  { rejectValue: string; state: RootState }
>('todoSlice/deleteTodo', async (arg, thunkAPI) => {
  const url = `${BASE_URL}/${arg}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Error occurred, response status code ${response.status}`);
    }
    return arg;
  } catch (e) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('Something went wrong');
  }
});

export const addTodo = createAsyncThunk<Todo, Todo, { rejectValue: string; state: RootState }>(
  'todoSlice/addTodo',
  async (arg, thunkAPI) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
      });

      if (!response.ok) {
        throw new Error(`Error occurred, response status code ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const initialState: TodoSliceState = {
  items: [],
  loading: false,
  error: null,
  totalEntities: null
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.totalEntities = action.payload.totalEntities;
      })
      .addCase(toggleTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleTodoStatus.fulfilled, (state, action) => {
        state.loading = false;
        const todo = state.items.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.items.push(action.payload);
      })
      .addMatcher(isReject, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default todoSlice.reducer;
