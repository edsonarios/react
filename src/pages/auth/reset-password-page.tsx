import Header from '@/components/header/header.component';
import AuthResetPasswordPage from '@/sections/auth/reset-password/reset-password.component';

const AuthPage = () => {
    return (
        <div>
            <div className="auth-header">
                <Header title="TodosApp" />
            </div>
            <div className="auth">
                <AuthResetPasswordPage />
            </div>
        </div>
    )
};

export default AuthPage
