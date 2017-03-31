import React from 'react';
import { Link } from 'react-router';
import { t } from 'localizify';

import LanguageSwitcher from '../utils/language-switcher';

var Header = React.createClass({
  render() {
    return (
      <header id="header">
        <div className="header-wrap">
          <div className="header">
            <ul id="menu" className="menu">
              <li className="li logo">
                <Link to="/" className="black south" activeClassName="active" title="export-default">
                  <strong><i className="fa fa-bug" aria-hidden="true"></i> export-default
                  </strong>
                </Link>
              </li>
              <li className="li"><Link to="/add" activeClassName="active"><u>{t('Add')}</u></Link></li>
              <li className="li"><Link to="/tags" activeClassName="active"><u>{t('Tags')}</u></Link></li>
              <li className="li"><Link to="/dashboard" activeClassName="active"><u>{t('Profile')}</u></Link></li>
              <li className="li right"><LanguageSwitcher /></li>
              <li title={"You are " + (this.props.loggedIn ? '' : 'not') + " logged in."} className="li right">  
                {this.props.loggedIn ? (

                  <span>&#123;&#123;#IF LOGGED_IN &#125;&#125; {t('Hi')}, <b>&#123;&#123;{localStorage.name}&#125;&#125;</b> <Link to="/logout"><u>{t('Logout')}</u></Link> &#123;&#123;/IF&#125;&#125;</span>
                  
                ) : (
                  <span>
                    <Link to="/login" activeClassName="active">{t('Login')}</Link>
                    <Link to="/signup" activeClassName="active">{t('Sign up')}</Link>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
});

export default Header;