import React from 'react';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';
import formatText from '../../utils/format-str';
import UserSign from '../utils/user-sign';

import { Link } from 'react-router';

const Answer = React.createClass({
  render() {
    const { id, comment, created_at, user, updated_at, votes } = this.props.data;

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
    const popularText = declOfNum(popular, [`голос`, `голоса`, `голосов`]);
    const html = formatText(comment);

    const data = { user, created_at };

    return (
      <div className="question-summary narrow" id={`question-summary-${id}`}>
        <div dangerouslySetInnerHTML={{__html: html}}></div>
        <UserSign data={data} />
      </div>
    )
  }
});

export default Answer;
