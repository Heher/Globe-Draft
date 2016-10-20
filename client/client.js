import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

import App from './components/App'
import Admin from './components/Admin'
import Countries from './components/Countries'
import Events from './components/Events'
import Login from './components/Login'
import RoundStatus from './components/RoundStatus'
import CountryList from './components/CountryList'
import Leaderboard from './components/Leaderboard'
import Main from './components/Main'

import './css/index.sass'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/draft" component={Countries} />
        <Route path="/draft/picks" component={CountryList} />
        <Route path="/draft/overall" component={RoundStatus} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/events" component={Events} />
        <Route path="/events/:filter" component={Events} />
        <Route path="/signin" component={Login} />
        <Route path="/leaderboard" component={Leaderboard} />
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

render(router, app);
