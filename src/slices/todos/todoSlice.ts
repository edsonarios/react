import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todosApi } from "@/api/todos-api";
import { ItemProps, ItemPropsMongo, responseProps } from "@/types/todo-item";
import { normalizeData, normalizeTodoData } from "@/utils/normailize-todo";
import { initialState } from "./initial-state";
import { authActions } from "../auth/authSlice";

export const postTodo = createAsyncThunk(
  'todos/postTodoProcess',
  async (params: Partial<ItemProps>, thunkApi) => {
    thunkApi.dispatch(todoActions.addingItem(true));
    const response = await thunkApi.dispatch(todosApi.endpoints.addTodo.initiate(params));
    const responseData = response as Partial<responseProps>;
    if (responseData.data) {
      const item = normalizeData(responseData.data)
      thunkApi.dispatch(todoActions.add(item));
      thunkApi.dispatch(todoActions.onOffItem(item));
      thunkApi.dispatch(todoActions.onOffFocusItem(true));
    } else {
      thunkApi.dispatch(authActions.alert({
        errorSnackbar: true,
        message: `Error: Fails creating item`,
        typeAlert: 'error'
      }));
    }
    return responseData;
  });

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodosProcess',
  async (params: string, thunkApi) => {
    const response = await thunkApi.dispatch(todosApi.endpoints.getAllTodos.initiate(params));
    thunkApi.dispatch(normalizeTodos(response.data as ItemPropsMongo[]));
    return response;
  });

export const normalizeTodos = createAsyncThunk(
  'todos/normalizeTodos',
  async (data: ItemPropsMongo[], thunkApi) => {
    const dataNormalized = normalizeTodoData(data);
    thunkApi.dispatch(todoActions.load(dataNormalized));
    return null;
  });

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodoProcess',
  async (item: ItemProps, thunkApi) => {
    thunkApi.dispatch(todoActions.remove(item.id));
    const response = await thunkApi.dispatch(todosApi.endpoints.deleteTodo.initiate(item.id));
    const responseData = response as Partial<responseProps>;
    if (!responseData.isSuccess) {
      thunkApi.dispatch(todoActions.rollbackTodo(item));
      thunkApi.dispatch(authActions.alert({
        errorSnackbar: true,
        message: `Error: Fails deleting item "${item.description}"`,
        typeAlert: 'error'
      }));
    }
    return responseData;
  });

export const editTodo = createAsyncThunk(
  'todos/editTodoProcess',
  async ({ itemtoEdited, item }: { itemtoEdited: ItemProps, item: ItemProps }, thunkApi) => {
    thunkApi.dispatch(todoActions.update(itemtoEdited));
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await thunkApi.dispatch(todosApi.endpoints.editTodo.initiate(itemtoEdited));
    const responseData = response as Partial<responseProps>;

    if (!responseData.data) {
      thunkApi.dispatch(todoActions.update(item));
      thunkApi.dispatch(authActions.alert({
        errorSnackbar: true,
        message: `Error: Fails updating item "${item.description}"`,
        typeAlert: 'error'
      }));
    }
    return responseData;
  });

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    fetching: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    load: (state, action: PayloadAction<ItemProps[]>) => {
      state.data = action.payload
    },
    addingItem: (state, action: PayloadAction<boolean>) => {
      state.addingItem = action.payload
    },
    add: (state, action: PayloadAction<ItemProps>) => {
      state.data.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      const selectItemIndex = state.data.findIndex(item => item.id === action.payload);
      state.data.splice(selectItemIndex, 1);
    },
    update: (state, action: PayloadAction<ItemProps>) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    rollbackTodo: (state, action: PayloadAction<ItemProps>) => {
      const isUserAlreadyDefined = state.data.some(data => data.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.data.push(action.payload)
      }
    },
    onOffItem: (state, action: PayloadAction<ItemProps | null>) => {
      state.activeItem = action.payload
    },
    onOffFocusItem: (state, action: PayloadAction<boolean | undefined>) => {
      state.selectOnFocus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(normalizeTodos.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.addingItem = false;
      state.selectOnFocus = false;
    });
  }
});

// export reducer
export default todoSlice.reducer;

// export actions
export const todoActions = todoSlice.actions
