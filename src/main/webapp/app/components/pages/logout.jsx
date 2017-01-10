import React from 'react';
import auth from '../../auth';

const LogoutPage = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <p>Вы успешно вышли из системы</p>
    );
  }
});

export default LogoutPage;