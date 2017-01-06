import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

const Loader = React.createClass({
  render() {
    const { isActive } = this.props.isActive;

    return (
      <div className="loader">
        <div className="line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
    );
  }
});

export default Loader;