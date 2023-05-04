import { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoadingPageIndicator from "@/components/loading-page-indicator/loading-page-indicator.component";

import TodosPage from '@/pages/todos/todos-page';
import NotFoundPage from '@/pages/not-found/not-found-page';
import AuthLoginPage from "@/pages/auth/login-page";
import AuthRegisterPage from "@/pages/auth/register-page";
import AuthResetPasswordPage from "@/pages/auth/reset-password-page";
import AuthRoutes from "./auth";

import { Provider } from "react-redux";
import { store } from "@/store/store";

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingPageIndicator />}>
            <AuthLoginPage />
            {/* <TodosPage /> */}
          </Suspense>} />
        <Route path="/todos" element={
          <Suspense fallback={<LoadingPageIndicator />}>
            <TodosPage />
          </Suspense>} />
        {/* <AuthRoutes /> */}
        {/* <Route path="auth" element={<AuthRoutes />} />  */}
        <Route path="auth" element={<Outlet />}>
          <Route index element={<Navigate to="login" />} />
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
        </Route>
        <Route path="*" element={
          <Suspense fallback={<LoadingPageIndicator />}>
            <NotFoundPage />
          </Suspense>
        } />
      </Routes>
    </Provider>
  )
};

export default AppRoutes;
