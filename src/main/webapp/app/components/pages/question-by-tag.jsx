import React from 'react';
import DocumentTitle from 'react-document-title';
import { withRouter  } from 'react-router';
import { t } from 'localizify';

import Questions from '../items/questions';

const QuestionsByTagPage = withRouter(
  React.createClass({
    render() {
      const tag = this.props.params.name;

      return (
        <DocumentTitle title={t('Questions by tag «{tag}»', { tag })}>
          <Questions tag={tag} fetched="false" />
        </DocumentTitle>
      );
    }
  })
)

export default QuestionsByTagPage;
