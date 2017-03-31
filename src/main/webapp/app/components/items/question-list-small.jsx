import React from 'react';
import $ from 'jquery';
import { t } from 'localizify';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';
import formatText from '../../utils/format-str';
import UserSign from '../utils/user-sign';

import Vote from './vote';

import { Link } from 'react-router';

const QuestionListSmallItem = React.createClass({
  render() {
    const { id, title, answers, comment, created_at, user, updated_at, votes } = this.props.data;

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;

    return (
      <div className="row post-container">
        <span className="icon-a"></span>
        <span className="vote">{popular}</span>
        <Link to={`/questions/${id}`} className="question-hyperlink ">{title}</Link>
        <span className="post-date"><span title="2008-10-09 15:59:11Z" className="relativetime">{t('Asked')} {timeAgo(created_at)}</span></span>
      </div>
    )
  }
});

const QuestionListSmall = React.createClass({
  componentDidMount() {},

  render() {
    const data = this.props.data;

    if (!data || !data.length) {
      return ( <div>{t('User haven\'t questions yet')}</div> );
    }

    return (
      <div className="question-list-small">
        {data.map((item, index) => 
          <div key={index}>
            <QuestionListSmallItem data={item} />
          </div>
        )}
      </div>
    );
  }
});

export default QuestionListSmall;
