import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app.jsx';
import auth from '../auth';

import {
  HomePage,
  LoginPage,
  LogoutPage,
  StuffPage,
  ContactPage,
  DashboardPage,
} from '../components/index.jsx';



function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="/login" component={LoginPage} />
    <Route path="/logout" component={LogoutPage} />

    <Route path="/stuff" component={StuffPage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/dashboard" component={DashboardPage} onEnter={requireAuth} />
  </Route>
);
