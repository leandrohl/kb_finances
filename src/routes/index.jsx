/* eslint-disable arrow-body-style */
import React from 'react'
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom'

import { USER_GET } from '../configs/constants'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserRegistration from '../pages/UserRegistration'

// eslint-disable-next-line react/prop-types
function PrivateRoute ({ component: Component, ...rest }) {
  const isAuth = localStorage.getItem(USER_GET) !== null

  console.log(isAuth)
  return (
    <Route {...rest} render={props => (
      isAuth
        ? <Component {...props} />
        // eslint-disable-next-line react/prop-types
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
  )
}

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/user_registration" exact component={UserRegistration} />
        <PrivateRoute path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
};
