import { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import LoadingPageIndicator from "@/components/loading-page-indicator/loading-page-indicator.component";
import AuthLoginPage from "@/pages/auth/login-page";
import AuthRegisterPage from "@/pages/auth/register-page";
import AuthResetPasswordPage from "@/pages/auth/reset-password-page";

const AuthRoutes = () => {
  return (
    <>
      <Route index element={<Navigate to="auth/login" />} />
      <Route path="login" element={
        <Suspense fallback={<LoadingPageIndicator />}>
          <AuthLoginPage />
        </Suspense>} />
      <Route path="register" element={
        <Suspense fallback={<LoadingPageIndicator />}>
          <AuthRegisterPage />
        </Suspense>} />
      <Route path="resetPassword" element={
        <Suspense fallback={<LoadingPageIndicator />}>
          <AuthResetPasswordPage />
        </Suspense>} />
    </>
  );
};

export default AuthRoutes;
