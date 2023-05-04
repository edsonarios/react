import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthLoginPage from "@/sections/auth/login/login.component";

const AuthPage = () => {
    return (
        <Provider store={store}>
            <AuthLoginPage />
        </Provider>
    )
};

export default AuthPage
