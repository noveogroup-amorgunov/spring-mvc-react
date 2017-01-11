import React from 'react';
import Tags from './tags';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';

import { Link } from 'react-router';

const Question = React.createClass({
  render() {
    const { id, answers, comment, title, created_at, tags, user, updated_at, votes } = this.props.data;

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
    const popularText = declOfNum(Math.abs(popular), [`голос`, `голоса`, `голосов`]);
    const answersCountText = declOfNum(answers.length, [`ответ`, `ответа`, `ответов`]);
    // console.log(votes);
    // console.log(popular);

    return (
      <div className="question-summary narrow" id={`question-summary-${id}`}>
        <div className="cp">
          <div className="votes cp__item">
            <div className="mini-counts"><span title={`${popular} ${popularText}`}>{popular}</span></div>
            <div>{`${popularText}`}</div>
          </div>
          <div className="status unanswered cp__item">
            <div className="mini-counts"><span title={`${answers.length} ${answersCountText}`}>{answers.length}</span></div>
            <div>{`${answersCountText}`} </div>
          </div>
          <div className="views cp__item">
            <div className="mini-counts"><span title="1 показ">1</span></div>
            <div>показ</div>
          </div>
        </div>
        <div className="summary">
          <h3><Link to={`/questions/${id}`} className="question-hyperlink" title="">{title}</Link></h3>
          <Tags data={tags} />
          <div className="started">
            <Link to={`/questions/${id}`} className="started-link">задан <span title={created_at} className="relativetime">{timeAgo(created_at)}</span></Link>&nbsp;
            <Link to={`/users/${user.username}`} className="name">{user.username}</Link> <span className="reputation-score" title="уровень репутации " dir="ltr">{user.popular || 0}</span>
          </div>
        </div>
      </div>
    )
  }
});

export default Question;
