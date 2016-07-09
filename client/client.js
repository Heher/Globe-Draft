import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import store, { history } from './store'

import App from './components/App'
import Admin from './components/Admin'
import Countries from './components/Countries'
import Events from './components/Events'
import Login from './components/Login'

import css from './css/index.sass'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state,
  wrapperDisplayName: 'UserIsAuthenticated'
})

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Events}></IndexRoute>
        <Route path="/draft" component={Countries}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path='/events' component={Events}></Route>
        <Route path='/events/:day' component={Events}></Route>
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

render(router, app);