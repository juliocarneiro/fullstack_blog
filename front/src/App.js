import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Home from "./pages/Home";
import Login from "./pages/Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Home />} />
      <Route
        path="/login"
        component={() =>
          isAuthenticated() ? (
            <Redirect to={{ pathname: "/admin" }} />
          ) : (
            <Login />
          )
        }
      />
      <PrivateRoute path="/admin" component={() => <h1>ADMIN</h1>} />
    </Switch>
  </BrowserRouter>
);

export default App;
