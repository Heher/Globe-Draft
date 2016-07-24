import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { routerActions } from 'react-router-redux'
import store, { history } from './store'

import App from './components/App'
import Admin from './components/Admin'
import Countries from './components/Countries'
import Events from './components/Events'
import Login from './components/Login'
import RoundStatus from './components/RoundStatus'
import CountryList from './components/CountryList'
import Leaderboard from './components/Leaderboard'

import css from './css/index.sass'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Events}></IndexRoute>
        <Route path="/draft" component={Countries}></Route>
        <Route path="/draft/picks" component={CountryList}></Route>
        <Route path="/draft/overall" component={RoundStatus}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path='/events' component={Events}></Route>
        <Route path='/events/:day' component={Events}></Route>
        <Route path='/signin' component={Login}></Route>
        <Route path='/leaderboard' component={Leaderboard}></Route>
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

render(router, app);