import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const API_BASE_URL = 'https://todo-service-0qq0.onrender.com/api/v1/';
export const API_BASE_URL_AUTH = 'https://todo-service-0qq0.onrender.com/api/v1/auth/';

export const Api = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL_AUTH }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});
