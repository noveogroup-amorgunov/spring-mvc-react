import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, useRouterHistory /*, browserHistory*/ } from 'react-router';
import localizify from 'localizify';
import { createHistory } from 'history';

import en from './messages/en.json';
import ru from './messages/ru.json';

import routes from 'routers/routers.jsx';

localizify
  .add('en', en)
  .add('ru', ru)
  .setLocale(localStorage.locale || 'en');

// console.log(localizify.getLocale());

const browserHistory = useRouterHistory(createHistory)({
  basename: window.config.basename
});

ReactDOM.render(
  <Router routes={routes} history={browserHistory}></Router>,
  document.getElementById('app')
);
