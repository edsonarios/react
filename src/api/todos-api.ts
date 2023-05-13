import { ItemEditProps, ItemProps, ItemPropsMongo } from "@/types/todo-item";
import { Api } from './api';
import Cookies from "js-cookie";

export const TODO_PREFIX = 'todos';
export const TODO_TOKEN = Cookies.get('token');

export const todosApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<ItemPropsMongo[], any>({
      query: (searchParam) => ({
        url: TODO_PREFIX,
        method: 'GET',
        params: { search: searchParam },
        headers: {
          Authorization: 'Bearer ' + TODO_TOKEN
        }
      }),
      providesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    addTodo: builder.mutation<ItemPropsMongo, Partial<ItemProps>>({
      query: (body) => ({
        url: TODO_PREFIX,
        method: 'POST',
        body: body,
        headers: {
          Authorization: 'Bearer ' + TODO_TOKEN
        }
      }),
      invalidatesTags: [{ type: 'Todos', id: 'POST' }]
    }),
    deleteTodo: builder.query<ItemPropsMongo, string>({
      query: (idTodo) => ({
        url: TODO_PREFIX + "/" + idTodo,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + TODO_TOKEN
        }
      }),
      providesTags: [{ type: 'Todos', id: 'DELETE' }]
    }),
    editTodo: builder.query<string, ItemProps>({
      query: (body) => ({
        url: TODO_PREFIX + "/" + body.id,
        method: 'PUT',
        body: body,
        headers: {
          Authorization: 'Bearer ' + TODO_TOKEN
        }
      }),
      providesTags: [{ type: 'Todos', id: 'PUT' }]
    }),
  }),
  overrideExisting: true
});

export const { useGetAllTodosQuery, useAddTodoMutation, useDeleteTodoQuery } = todosApi;
