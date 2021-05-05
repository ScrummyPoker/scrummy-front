import React from 'react';
import { Redirect, Route } from 'react-router';
import { isLoggedIn } from './services/auth';
import DashboardLayout from './components/_shared/layout/DashboardLayout';
import { ROUTE_AUTH_LOGIN } from './utils/routes';

const PrivateRoute = ({ component: Component }) => {
  return (
    <Route
      strict
      exact
      render={props => {
        if (isLoggedIn()) {
          return (
            <DashboardLayout>
              <Component {...props} />
            </DashboardLayout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: ROUTE_AUTH_LOGIN,
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
