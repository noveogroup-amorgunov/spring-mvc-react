import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

const Loader = React.createClass({
  render() {
    const { isActive } = this.props.isActive;

    return (
      <div id="loader" className="loader loader-default is-active"></div>
    );
  }
});

export default Loader;