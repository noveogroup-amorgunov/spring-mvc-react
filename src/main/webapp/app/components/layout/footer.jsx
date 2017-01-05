import React from 'react';

var Footer = React.createClass({
  render() {
    return (
      <footer className="footer" id="footer">
        <div className="copyright">
          Разработано с помощью <a href="#">Spring MVC</a> &amp; <a href="#">ReactJS</a>  | <span className="js-now-year">2016</span>
        </div>
      </footer>
    );
  }
});

export default Footer;