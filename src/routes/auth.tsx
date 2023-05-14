import React from "react";
import { Route, Navigate } from "react-router-dom";
import { NoAuthenticatedRoute } from "./private-route";

const AuthLoginPage = React.lazy(() => import('@/pages/auth/login-page'));
const AuthRegisterPage = React.lazy(() => import('@/pages/auth/register-page'));
const AuthResetPasswordPage = React.lazy(() => import('@/pages/auth/reset-password-page'));

const ProtectedLoginPage = NoAuthenticatedRoute(AuthLoginPage, '/todos');
const ProtectedRegisterPage = NoAuthenticatedRoute(AuthRegisterPage, '/todos');
const ProtectedResetPasswordPage = NoAuthenticatedRoute(AuthResetPasswordPage, '/todos');

const AuthRoutes = [
  <Route index element={<Navigate to="login" />} />,
  <Route path="login" element={<ProtectedLoginPage />} />,
  <Route path="register" element={<ProtectedRegisterPage />} />,
  <Route path="resetPassword" element={<ProtectedResetPasswordPage />} />,
];

export default AuthRoutes;
