import { RegisterProps, LoginProps } from "@/types/auth";

import { authApi as Api } from './api';

export const REGISTER = 'register';
export const LOGIN = 'login';
export const ME = 'me';

export const authApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterProps, Partial<RegisterProps>>({
            query: (body) => ({
                url: REGISTER,
                method: 'POST',
                body: body
            }),
        }),
        login: builder.mutation<LoginProps, Partial<LoginProps>>({
            query: (body) => ({
                url: LOGIN,
                method: 'POST',
                body: body
            }),
        }),
        me: builder.query<any, any>({
            query: (token) => ({
                url: ME,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }),
        }),
    }),
    overrideExisting: true
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
