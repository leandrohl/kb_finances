/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react'
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom'

import { USER_GET } from '../configs/constants'
import Home from '../pages/Home'
import Login from '../pages/Login'
import UserRegistration from '../pages/UserRegistration'

function PrivateRoute ({ component: Component, ...rest }) {
  const isAuth = localStorage.getItem(USER_GET) !== null
  return (
    <Route {...rest} render={props => (
      isAuth
        ? <Component {...props} />
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
