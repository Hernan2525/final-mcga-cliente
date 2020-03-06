import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
      localStorage.getItem("Token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
      localStorage.getItem("Token") ? (
        <Redirect
          to={{
            pathname: "/Admin",
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthenticatedRoute
