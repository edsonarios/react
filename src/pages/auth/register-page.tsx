import * as React from 'react';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthRegisterPage from '@/sections/auth/register/register.component';

const AuthPage = () => {
    return (
        <Provider store={store}>
            <AuthRegisterPage />
        </Provider>
    )
};

export default AuthPage
