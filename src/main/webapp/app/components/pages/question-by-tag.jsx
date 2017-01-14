import React from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter  } from 'react-router';

import Questions from '../items/questions';

const QuestionsByTagPage = withRouter(
  React.createClass({
    render() {
      const tag = this.props.params.name;

      return (
        <DocumentTitle title={`Вопросы с тегом "${tag}"`}>
          <Questions tag={tag} fetched="false" />
        </DocumentTitle>
      );
    }
  })
)

export default QuestionsByTagPage;
