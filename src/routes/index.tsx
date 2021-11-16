/* eslint-disable arrow-body-style */
import React from 'react';

import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Home from '../pages/Home';

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
<<<<<<< HEAD
        <Route path="/home" exact component={Home} />
=======
        <Route path="/" exact component={Home} />
>>>>>>> e3570c4d95c33a791e017088cbef329d8318b131
      </Switch>
    </BrowserRouter>
  );
};
