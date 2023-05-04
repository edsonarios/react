import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todosApi } from "@/api/todos-api";
import { fechTodosProps, ItemEditProps, ItemProps, ItemPropsMongo, responseProps } from "@/types/todo-item";
import { normalizeData, normalizeTodoData } from "@/utils/normailize-todo";
import { initialState } from "./initial-state";
import { authActions } from "../auth/authSlice";

// action types
// Document actions => procesada en los reducers, ejecutadas desde cualquier parte de la aplicacion
// Initial actions => iniciar un flujo de acciones, se lanzan desde los componentes, nunca son procesados en los reducers, debe iniciar otras acciones
// Event actions => son ejecutadas por otras acciones y se encargan de ejecutar otras funcione(s).


export const postTodo = createAsyncThunk(
  'todos/postTodoProcess',
  async (params: Partial<ItemProps>, thunkApi) => {
    thunkApi.dispatch(todoActions.addingItem(true));
    const response = await thunkApi.dispatch(todosApi.endpoints.addTodo.initiate(params));
    const responseData = response as { data: ItemPropsMongo };
    thunkApi.dispatch(todoActions.add(normalizeTodoData([responseData.data])[0]));
    return responseData;
  });

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodosProcess',
  async (params: fechTodosProps, thunkApi) => {
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
    console.log(response)
    const responseData = response as Partial<responseProps>;
    if (!responseData.isSuccess) {
      thunkApi.dispatch(todoActions.rollbackTodo(item));
      thunkApi.dispatch(authActions.message('Error: Fails deleting item'));
      thunkApi.dispatch(authActions.errorSnackbar(true));
      thunkApi.dispatch(authActions.typeAlert("error"));
    }
    return responseData;
  });

export const editTodo = createAsyncThunk(
  'todos/editTodoProcess',
  async (item: ItemEditProps, thunkApi) => {
    thunkApi.dispatch(todoActions.remove(item.id));
    const response = await thunkApi.dispatch(todosApi.endpoints.editTodo.initiate(item));
    console.log(response)
    const responseData = response as Partial<responseProps>;

    thunkApi.dispatch(todoActions.add(normalizeData(responseData.data)));
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
    rollbackTodo: (state, action: PayloadAction<ItemProps>) => {
      const isUserAlreadyDefined = state.data.some(data => data.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.data.push(action.payload)
      }
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
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log(state, action)
    });
  }
});

// export reducer
export default todoSlice.reducer;

// export actions
export const todoActions = todoSlice.actions
