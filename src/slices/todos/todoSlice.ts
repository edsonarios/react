import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todosApi } from "@/api/todos-api";
import { ItemProps, ItemPropsMongo } from "@/types/todo-item";
import { normalizeTodoData } from "@/utils/normailize-todo";
import { initialState } from "./initial-state";
import React, { useRef } from 'react';
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
  async (params, thunkApi) => {
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
  async (item: Partial<ItemPropsMongo>, thunkApi) => {
    thunkApi.dispatch(todoActions.remove(item._id));
    const response = await thunkApi.dispatch(todosApi.endpoints.deleteTodo.initiate(item._id));
    const responseData = response as { data: Partial<ItemPropsMongo> };
    if (!responseData.isSuccess) {
      thunkApi.dispatch(todoActions.rollbackTodo(item));
      thunkApi.dispatch(authActions.errorMessage('Error: Fails deleting item'));
      thunkApi.dispatch(authActions.errorSnackbar(true));
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
  }
});

// export reducer
export default todoSlice.reducer;

// export actions
export const todoActions = todoSlice.actions
