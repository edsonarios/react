import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { actionsAuth } from '@/sections/auth/auth-actions';

export const AuthenticatedRoute = (Component: React.ComponentType<any>, redirectTo: string = '/') => {
  const PrivateRouteWrapper: React.FC = (props) => {
    const { isAuthenticated } = actionsAuth()
    const location = useLocation();

    if (isAuthenticated()) {
      return <Component {...props} />;
    } else {
      return (
        <Navigate
          to={redirectTo}
          state={{ from: location }}
        />
      );
    }
  };

  return PrivateRouteWrapper;
};

export const NoAuthenticatedRoute = (Component: React.ComponentType<any>, redirectTo: string = '/') => {
  const PrivateRouteWrapper: React.FC = (props) => {
    const { isAuthenticated } = actionsAuth()
    const location = useLocation();

    if (isAuthenticated()) {
      return (
        <Navigate
          to={redirectTo}
          state={{ from: location }}
        />
      );
    } else {
      return <Component {...props} />;

    }
  };

  return PrivateRouteWrapper;
};
