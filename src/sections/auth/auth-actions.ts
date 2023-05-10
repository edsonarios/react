import { useAppDispatch, useAppSelector } from "@/store/store";
import { login, me, register } from "@/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { loginResponseProps, registerResponseProps } from "@/types/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const actionsAuth = () => {
    const dispatch = useAppDispatch();

    const loginSubmit = async (event: React.FormEvent<HTMLFormElement>, navigate: ReturnType<typeof useNavigate>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const responseLogin: loginResponseProps = unwrapResult(await dispatch(login(
                {
                    email: data.get('email') as string,
                    password: data.get('password') as string,
                }
            )));
            if (responseLogin.error.originalStatus === 201) {
                const token = responseLogin.error.data as string
                Cookies.set('token', token);
                navigate('/todos');
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const registerSubmit = async (event: React.FormEvent<HTMLFormElement>, onSuccess: () => void) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const registerResponse: registerResponseProps = unwrapResult(await dispatch(register(
                {
                    email: data.get('email') as string,
                    password: data.get('password') as string,
                }
            )));
            if (registerResponse.data) {
                onSuccess()
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const resetPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(data.get('email'))
        console.log("Reset password, comming soon...!!!")
    };

    const logoutSubmit = (navigate: ReturnType<typeof useNavigate>) => {
        Cookies.set('token', '');
        navigate('/');
    };

    const isAuthenticated = () => {
        const token = Cookies.get('token');
        return !!token;
    };

    return { loginSubmit, registerSubmit, logoutSubmit, isAuthenticated, resetPasswordSubmit }
}
