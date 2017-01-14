import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, useRouterHistory /*, browserHistory*/ } from 'react-router'

import routes from 'routers/routers.jsx';

import { createHistory } from 'history'

const browserHistory = useRouterHistory(createHistory)({
  basename: window.config.basename
});

ReactDOM.render(
  <Router routes={routes} history={browserHistory}></Router>,
  document.getElementById('app')
);
