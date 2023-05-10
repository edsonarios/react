import Header from '@/components/header/header.component';
import AuthRegisterPage from '@/sections/auth/register/register.component';

const AuthPage = () => {
    return (
        <div>
            <div className="auth-header">
                <Header title="TodosApp" />
            </div>
            <div className="auth">
                <AuthRegisterPage />
            </div>
        </div>
    )
};

export default AuthPage
