import React from 'react';
import { t } from 'localizify';

var Footer = React.createClass({
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="copyright">
          {t('Created using')} <a href="#">Spring MVC</a> &amp; <a href="#">ReactJS</a>  | <span className="js-now-year">2016</span>
        </div>
      </footer>
    );
  }
});

export default Footer;