import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from 'react-redux'
import store, { history } from './store'

import App from "./components/App";
import Users from "./components/Users";
import Countries from "./components/Countries";

import css from './css/index.sass'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Users}></IndexRoute>
        <Route path="/countries" component={Countries}></Route>
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

render(router, app);