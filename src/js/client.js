import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";
import Users from "./components/Users";
import Sandbox from "./components/Sandbox";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Users} />
    </Route>
    <Route path="/sandbox" component={Sandbox} />
  </Router>,
app);