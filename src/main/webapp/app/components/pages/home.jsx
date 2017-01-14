import React from 'react';
import Questions from '../items/questions';

var HomePage = React.createClass({
  render() {
    return (
      <div>
        <Questions fetched="false" />
      </div>
    );
  }
});

export default HomePage;