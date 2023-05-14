import { combineReducers } from 'redux';
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from '@/api/todos-api';
import todoReducer from '@/slices/todos/todoSlice';
import { authApi } from '@/api/auth-api';
import authReducer from '@/slices/auth/authSlice';
import { logger } from './middleware/logger';

const rootReducer = combineReducers({ todo: todoReducer, [todosApi.reducerPath]: todosApi.reducer, auth: authReducer, [authApi.reducerPath]: authApi.reducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)
      .concat(authApi.middleware)
      .concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
