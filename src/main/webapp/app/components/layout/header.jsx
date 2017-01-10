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
                <Link to="/" className="black south" activeClassName="active" title="export-default">
                  <strong><i className="fa fa-bug" aria-hidden="true"></i> export-default
                  </strong>
                </Link>
              </li>
              <li className="li"><Link to="/add" activeClassName="active"><u>Добавить</u></Link></li>
              <li className="li"><Link to="/contact" activeClassName="active"><u>Теги</u></Link></li>
              <li className="li"><Link to="/dashboard" activeClassName="active"><u>Профиль</u></Link></li>
              <li title={"You are " + (this.props.loggedIn ? '' : 'not') + " logged in."} className="li right">  
                {this.props.loggedIn ? (

                  <span>&#123;&#123;#IF LOGGED_IN &#125;&#125; Привет, <b>&#123;&#123;{localStorage.name}&#125;&#125;</b> <Link to="/logout"><u>Выйти</u></Link> &#123;&#123;/IF&#125;&#125;</span>
                  
                ) : (
                  <span>
                    <Link to="/login" activeClassName="active">Войти</Link>
                    <Link to="/signup" activeClassName="active">Регистрация</Link>
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