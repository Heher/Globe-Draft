import React from 'react'
import { render } from 'react-dom'

import App from './modules/App'
import About from './modules/About'
import Users from './modules/Users'
import User from './modules/User'
import Home from './modules/Home'

import { Router, Route, browserHistory, IndexRoute } from 'react-router'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/users" component={Users}>
        <Route path="/users/:userName" component={User}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))