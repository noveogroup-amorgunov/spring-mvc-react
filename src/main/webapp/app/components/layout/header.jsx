import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
  render() {
    return (
      <header id="header">
        <div className="header-wrap">
          <div className="header">
            <ul id="menu" className="menu">
              <li className="li logo">
                <Link to="/" className="black" activeClassName="active">
                  <strong><i className="fa fa-bug" aria-hidden="true"></i> export-default
                  </strong>
                </Link>
              </li>
              <li className="li"><Link to="/stuff" activeClassName="active"><u>Теги</u></Link></li>
              <li className="li"><Link to="/contact" activeClassName="active"><u>Пользователи</u></Link></li>
              <li className="li"><Link to="/about" activeClassName="active"><u>О сайте</u></Link></li>
              <li className="li"><Link to="/dashboard" activeClassName="active"><u>Dashboard</u></Link> (authenticated)</li>
              <li title={"You are " + (this.props.loggedIn ? '' : 'not') + " logged in."} className="li right">  
                {this.props.loggedIn ? (

                  <span>&#123;&#123;#IF LOGGED_IN &#125;&#125; Привет, <b>&#123;&#123;username&#125;&#125;</b> <Link to="/logout"><u>Выйти</u></Link> &#123;&#123;/IF&#125;&#125;</span>
                  
                ) : (
                  <Link to="/login">Войти</Link>
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