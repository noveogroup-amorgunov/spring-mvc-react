import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

const Tag = React.createClass({
  render() {
    const { name } = this.props.data;  

    return (
      <Link to={`/questions/tagged/${name}`}
        className="post-tag" 
        title={`показать вопросы с меткой «${name}»`} 
        rel="tag">
        {name}
      </Link>
    );
  }
});

export default Tag;