import React from 'react';
import $ from 'jquery';
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
    const popularText = declOfNum(popular, [`голос`, `голоса`, `голосов`]);
    const html = formatText(comment);

    const data = { user, created_at, text: `Ответ дан ` };

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
      return ( <div>Пользователь не оставлял вопросов</div> );
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
