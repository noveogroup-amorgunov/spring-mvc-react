import React from 'react';
import Questions from '../items/questions';

var HomePage = React.createClass({
  render() {
    return (
      <div>
        <Questions fetch="false" />
      </div>
    );
  }
});

export default HomePage;