import { ItemEditProps, ItemProps, ItemPropsMongo } from "@/types/todo-item";
import { Api } from './api';

export const TODO_PREFIX = 'todos';

export const todosApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<ItemPropsMongo[], any>({
      query: ({ searchParam, token }) => ({
        url: TODO_PREFIX,
        method: 'GET',
        params: { search: searchParam },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }),
      providesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    addTodo: builder.mutation<ItemPropsMongo, Partial<ItemProps>>({
      query: (body) => ({
        url: TODO_PREFIX,
        method: 'POST',
        body: body
      }),
      invalidatesTags: [{ type: 'Todos', id: 'POST' }]
    }),
    deleteTodo: builder.query<ItemPropsMongo, string>({
      query: (idTodo) => ({
        url: TODO_PREFIX + "/" + idTodo,
        method: 'DELETE',
      }),
      providesTags: [{ type: 'Todos', id: 'DELETE' }]
    }),
    editTodo: builder.query<string, ItemEditProps>({
      query: ({ id, body }) => ({
        url: TODO_PREFIX + "/" + id,
        method: 'PUT',
        body: body,
      }),
      providesTags: [{ type: 'Todos', id: 'PUT' }]
    }),
  }),
  overrideExisting: true
});

export const { useGetAllTodosQuery, useAddTodoMutation, useDeleteTodoQuery } = todosApi;
