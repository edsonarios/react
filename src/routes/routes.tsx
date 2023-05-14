import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import AuthRoutes from "./auth";
import { AuthenticatedRoute, NoAuthenticatedRoute } from './private-route';

import { Provider } from "react-redux";
import { store } from "@/store/store";

const TodosPage = React.lazy(() => import('@/pages/todos/todos-page'));
const AuthLoginPage = React.lazy(() => import('@/pages/auth/login-page'));

const AppRoutes = () => {
  const ProtectedTodosPage = AuthenticatedRoute(TodosPage, '/');
  const ProtectedLoginPage = NoAuthenticatedRoute(AuthLoginPage, '/todos');

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ProtectedLoginPage />} />
        <Route path="/todos" element={<ProtectedTodosPage />} />
        <Route path="auth" element={<Outlet />}>
          {AuthRoutes}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  )
};

export default AppRoutes;
