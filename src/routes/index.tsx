/* eslint-disable arrow-body-style */
import React from 'react';

import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';

export const Routes: React.FC = () => {
  const isAuth = false;

  // const PrivateRoute = (path: string, exact: boolean,
  //   Component: React.FC<RouteComponentProps>) => (
  //     <Route
  //       path={path}
  //       exact={exact}
  //       render={(props: RouteComponentProps) => (isAuth
  //         ? <Component {...props} />
  //         : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  //     />
  // );

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
