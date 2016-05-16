import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from 'react-redux'
import store, { history } from './store'

// import configureStore from '../src/js/store'
// import { Provider } from 'react-redux'

import Layout from "./components/Layout";
import Users from "./components/Users";
import Countries from "./components/Countries";

import css from './css/index.sass'

// let store = configureStore(initialState)

const router = (
  <Provider store={store} >
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Users} />
        <Route path="/countries" component={Countries} />
      </Route>
    </Router>
  </Provider>
)

const app = document.getElementById('app');

ReactDOM.render(router, app);