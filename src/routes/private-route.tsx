import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { actionsAuth } from '@/sections/auth/auth-actions';
import LoadingPageIndicator from '@/components/loading-page-indicator/loading-page-indicator.component';

export const AuthenticatedRoute = (Component: React.ComponentType<any>, redirectTo: string = '/') => {
  const PrivateRouteWrapper: React.FC = (props) => {
    const { isAuthenticated } = actionsAuth()
    const location = useLocation();

    if (isAuthenticated()) {
      return (
        <Suspense fallback={<LoadingPageIndicator />}>
          <Component {...props} />
        </Suspense>
      );
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
      return (
        <Suspense fallback={<LoadingPageIndicator />}>
          <Component {...props} />
        </Suspense>
      );
    }
  };
  return PrivateRouteWrapper;
};
