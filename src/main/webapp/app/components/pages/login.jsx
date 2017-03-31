import React from 'react';
import auth from '../../auth';
import { withRouter  } from 'react-router';

import { t } from 'localizify';

const LoginPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        message: ''
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const username = this.refs.username.value
      const pass = this.refs.pass.value

      auth.login(username, pass, (loggedIn, message = t('Type wrong data')) => {
        if (!loggedIn)
          return this.setState({ error: true, message: t(message) })

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
        }
      })
    },

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input required="required" ref="username" placeholder="username" defaultValue="joe" /></label><br />
          <label><input required="required" type="password" ref="pass" placeholder="password" /></label><br />
          <button className="btn btn-block btn-social btn-linkedin" type="submit">{t('Login to system')}</button>
          {this.state.error && (
            <p>{this.state.message}</p>
          )}
        </form>
      )
    }
  })
)

export default LoginPage;