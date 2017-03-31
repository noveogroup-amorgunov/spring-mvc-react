import React from 'react';
import auth from '../../auth';
import { withRouter  } from 'react-router';

import { t } from 'localizify';

const SignupPage = withRouter(
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

      auth.register(username, pass, (loggedIn, message = t('Type wrong data"')) => {
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
          <label><input required="required" ref="username" placeholder="username" /></label><br />
          <label><input required="required" type="password" ref="pass" placeholder="password" /></label><br />
          <button className="btn btn-block btn-social btn-linkedin" type="submit">{t('Sign up 2')}</button>
          {this.state.error && (
            <p>{this.state.message}</p>
          )}
        </form>
      )
    }
  })
)

export default SignupPage;