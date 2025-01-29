// PrivateRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Element {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
