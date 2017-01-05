import React from 'react';
import DocumentTitle from 'react-document-title';
import auth from '../../auth';

const DashboardPage = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <DocumentTitle title='Dashboard'>
        <div>
          <h1>Home, sweet home.</h1>
          <h1>Dashboard</h1>
          <p>You made it!</p>
          <p>{token}</p>
        </div>
      </DocumentTitle>
    )
  }
});

export default DashboardPage;