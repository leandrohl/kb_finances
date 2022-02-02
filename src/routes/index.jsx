/* eslint-disable arrow-body-style */
import React from 'react';

import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { useAuth } from '../contexts/Auth';
import Home from '../pages/Home';

import Login from '../pages/Login';

function PrivateRoute({ component: Component, ...rest }) {
  const { userLogged } = useAuth();
  const isAuth = userLogged.signed;

  return (
    <Route {...rest} render={props => (
      isAuth ?
        <Component {...props} />
        : <Redirect to="/login" />
    )} />
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
