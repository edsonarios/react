import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthResetPasswordPage from '@/sections/auth/reset-password/reset-password.component';

const AuthPage = () => {
    return (
        <Provider store={store}>
            <AuthResetPasswordPage />
        </Provider>
    )
};

export default AuthPage
