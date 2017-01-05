import React from 'react';
import $ from 'jquery';

import Question from './question';
import Loader from '../utils/loader';

const Questions = React.createClass({
  getInitialState() {
    return {
      questions: [],
      loading: true
    };
  },
  componentDidMount() {
    $.ajax({
      url: `${window.config.basename}/api/questions`,
      dataType: 'json',
      success: (questions) => {
        this.setState({ questions, loading: false });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    const data = this.state.questions;

    return (
      <div className="question-list">
        {data.map((item, index) => 
          <div key={index}>
            <Question data={item} />
          </div>
        )}
      </div>
    );
  }
});

export default Questions;
