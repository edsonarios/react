import { useAppDispatch, useAppSelector } from "@/store/store";
import { login, register } from "@/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { loginResponseProps, registerResponseProps } from "@/types/auth";
import { unwrapResult } from "@reduxjs/toolkit";

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
                navigate('/todos');
            }
        } catch (error: any) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    const registerSubmit = async (event: React.FormEvent<HTMLFormElement>, onSuccess: () => void,) => {
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

    return { loginSubmit, registerSubmit }
}
