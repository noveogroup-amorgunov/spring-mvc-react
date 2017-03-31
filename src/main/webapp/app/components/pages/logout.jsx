import React from 'react';
import auth from '../../auth';
import { t } from 'localizify';

const LogoutPage = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <p>{t('You logout succesfully')}</p>
    );
  }
});

export default LogoutPage;