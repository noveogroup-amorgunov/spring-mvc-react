import React from 'react';
import $ from 'jquery';
import { t } from 'localizify';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';
import formatText from '../../utils/format-str';
import UserSign from '../utils/user-sign';

import Vote from './vote';

import { Link } from 'react-router';

const AnswerListSmallItem = React.createClass({
  render() {
    const { id, comment, created_at, user, updated_at, votes } = this.props.data;

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
    const popularText = declOfNum(popular, [t('vote'), t('votes'), t('votes-2')]);
    const html = formatText(comment);

    const data = { user, created_at, text: t('Answered') };

    return (
      <div className="answer-summary narrow" id={`answer-summary-${id}`}>
        <Vote data={{ votes, user, answerId: id, popular }} />
        <div dangerouslySetInnerHTML={{__html: html}}></div>
        <UserSign data={data} />
      </div>
    )
  }
});

const AnswerListSmall = React.createClass({
  componentDidMount() {},

  render() {
    const data = this.props.data;

    if (!data || !data.length) {
      return ( <div>{t('User haven\'t questions yet')}</div> );
    }

    return (
      <div className="answer-list-small">
        {data.map((item, index) => 
          <div key={index}>
            <AnswerListSmallItem data={item} />
          </div>
        )}
      </div>
    );
  }
});

export default AnswerListSmall;
