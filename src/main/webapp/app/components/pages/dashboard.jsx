import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

import auth from '../../auth';
import User from './user';

const DashboardPage = React.createClass({
  render() {
    const token = auth.getToken();
    const name = auth.getName();

    return (
      <DocumentTitle title='Персональная страница'>
        <div>
          <User dashboard={true} params={{ name }} />
          <div className="margin-top-20">
            <span>Ваш токен: <span className="token-text">{token}</span></span><br />
            <span><Link to="changepassword">Сменить пароль</Link></span>
          </div>
        </div>
      </DocumentTitle>
    )
  }
});

export default DashboardPage;