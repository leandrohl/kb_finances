/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react'
import {
  BrowserRouter, Switch, Route, Redirect, useHistory
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

function PublicRoute ({ component: Component, ...rest }) {
  const { replace, location } = useHistory()

  const goToRedirect = (pathRequest) => {
    if (location.pathname !== pathRequest) replace(pathRequest)
    return pathRequest
  }

  return (
    <Route exact path={goToRedirect(rest.path)} render={props => (<Component {...props} />)} />
  )
}

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" exact component={Login} />
        <PublicRoute path="/user_registration" exact component={UserRegistration} />
        <PrivateRoute path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
};
