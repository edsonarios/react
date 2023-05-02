import { RegisterProps, LoginProps } from "@/types/auth";

import { authApi as Api } from './api';

export const REGISTER = 'register';
export const LOGIN = 'login';

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
    }),
    overrideExisting: true
});

export const { useLoginMutation, useRegisterMutation } = authApi;
