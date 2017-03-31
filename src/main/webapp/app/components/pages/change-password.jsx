import React from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter  } from 'react-router';
import { t } from 'localizify';

import UserService from '../../services/user';
import auth from '../../auth';

const ChangePasswordPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        message: ''
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const old_password = this.refs.old_pass.value;
      const password = this.refs.pass.value;
      const token = auth.getToken();


      const data = { token, old_password, password };

      const service = new UserService();
      service.changePassword(data).then(response => {

        console.log(response);

        if (response.code == '404') {
          console.log(404);
          this.setState({ error: true, message: t(response.msg) });
          return;
        } else {

          const { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/dashboard')
          }
        }
      })
    },

    render() {
      const token = auth.getToken();
      const name = auth.getName();

      return (
        <DocumentTitle title={t('Change password')}>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label><input required="required" type="password" ref="old_pass" placeholder={t('Type old password')} /></label><br />
              <label><input required="required" type="password" ref="pass" placeholder={t('Type new password')} /></label><br />
              <button className="btn btn-block btn-social btn-linkedin" type="submit">{t('Change password 2')}</button>
              {this.state.error && (
                <p>{this.state.message}</p>
              )}
            </form>
          </div>
        </DocumentTitle>
      )
    }
  })
);

export default ChangePasswordPage;