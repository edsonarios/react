import { ItemProps, ItemPropsMongo } from "@/types/todo-item";
import { Api } from './api';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    deleteTodo: builder.query<ItemPropsMongo[], any>({
      query: (idTodo) => ({
        url: TODO_PREFIX + "s/" + idTodo,
        method: 'DELETE',
      }),
      providesTags: [{ type: 'Todos', id: 'DELETE' }]
    }),
  }),
  overrideExisting: true
});

export const { useGetAllTodosQuery, useAddTodoMutation, useDeleteTodoQuery } = todosApi;