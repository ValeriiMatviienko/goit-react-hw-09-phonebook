import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import authSelectors from '../redux/auth/auth-selectors';

export default function PublicRoute({
  isAuthenticated,
  redirectTo,
  children,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.isAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
}
