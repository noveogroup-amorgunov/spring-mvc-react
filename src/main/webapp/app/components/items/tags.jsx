import React from 'react';
import Tag from './tag';

const Tags = React.createClass({
  render() {
    const { data } = this.props;

    if (!data[0].name) {
      return (<div className="tags"></div>);
    }

    return (
      <div className="tags">
        {data.map((item, index) => 
          <span key={index}>
            <Tag data={item} />
          </span>
        )}
      </div>
    );
  }
});

export default Tags;
