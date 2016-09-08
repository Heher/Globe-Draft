import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './store'

import App from './components/App'
import AdminContainer from './components/AdminContainer'
import Countries from './components/Countries'
import Events from './components/Events'
import Login from './components/Login'
import RoundStatus from './components/RoundStatus'
import CountryList from './components/CountryList'
import Leaderboard from './components/Leaderboard'
import Main from './components/Main'
import UserAdminSection from './components/admin/users/UserAdminSection'
import RegionAdminSection from './components/admin/regions/RegionAdminSection'
import CountryAdminSection from './components/admin/countries/CountryAdminSection'

import './css/index.sass'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main}></IndexRoute>
        <Route path="draft">
          <IndexRoute component={Countries} />
          <Route path="picks" component={CountryList} />
          <Route path="overall" component={RoundStatus} />
        </Route>
        <Route path="admin" component={AdminContainer}>
          <Route path="users" component={UserAdminSection} />
          <Route path="regions" component={RegionAdminSection} />
          <Route path="countries" component={CountryAdminSection} />
        </Route>
        <Route path="/login" component={Login}></Route>
        <Route path='/events' component={Events}></Route>
        <Route path='/events/:filter' component={Events}></Route>
        <Route path='/signin' component={Login}></Route>
        <Route path='/leaderboard' component={Leaderboard}></Route>
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

render(router, app);