import Header from "@/components/header/header.component";
import AuthLoginPage from "@/sections/auth/login/login.component";

const AuthPage = () => {
    return (
        <div>
            <div className="auth-header">
                <Header title="TodosApp" />
            </div>
            <div className="auth">
                <AuthLoginPage />
            </div>
        </div>
    )
};

export default AuthPage
