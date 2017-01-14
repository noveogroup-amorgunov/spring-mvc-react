import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app.jsx';
import auth from '../auth';

import {
  HomePage,
  LoginPage,
  LogoutPage,
  AddQuestionPage,
  ContactPage,
  DashboardPage,
  QuestionPage,
  QuestionsByTagPage,
  SignupPage,
  UserPage,
  ChangePasswordPage,
  TagsPage
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
    <Route path="/logout" component={LogoutPage} onEnter={requireAuth} />
    <Route path="/signup" component={SignupPage} />

    <Route path="/questions/:id" component={QuestionPage} />
    <Route path="/questions/tagged/:name" component={QuestionsByTagPage} />

    <Route path="/users/:name" component={UserPage} />

    <Route path="/add" component={AddQuestionPage} onEnter={requireAuth} />
    <Route path="/tags" component={TagsPage} />
    <Route path="/dashboard" component={DashboardPage} onEnter={requireAuth} />

    <Route path="/changepassword" component={ChangePasswordPage} onEnter={requireAuth} />
  </Route>
);
