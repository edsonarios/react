import * as React from 'react';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthContainer from "@/sections/auth/auth-container.component";
import AuthLoginPage from "@/sections/auth/login/login.component";
import { Link } from 'react-router-dom';
const AuthPage = () => {
    return (
        <Provider store={store}>
            <AuthLoginPage />
        </Provider>
    )
};

export default AuthPage
