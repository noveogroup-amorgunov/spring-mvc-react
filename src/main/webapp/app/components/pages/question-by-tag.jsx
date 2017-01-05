import React from 'react';
import DocumentTitle from 'react-document-title';
import auth from '../../auth';

const QuestionsByTagPage = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <DocumentTitle title='Dashboard'>
        <div>1234456
        </div>
      </DocumentTitle>
    )
  }
});

export default QuestionsByTagPage;