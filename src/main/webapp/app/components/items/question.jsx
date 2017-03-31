import React from 'react';
import { t } from 'localizify';

import Tags from './tags';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';

import { Link } from 'react-router';

const Question = React.createClass({
  render() {
    const { id, answers, comment, title, created_at, tags, user, updated_at, votes } = this.props.data;

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
    const popularText = declOfNum(Math.abs(popular), [t('vote'), t('votes'), t('votes-2')]);
    const answersCountText = declOfNum(answers.length, [t('answer'), t('answers'), t('answers-2')]);
    // console.log(votes);
    // console.log(popular);

    const watchedCount = localStorage.getItem(`q${id}`) || 0;
    const watchedCountText = declOfNum(watchedCount, [t('show'), t('shows'), t('shows-2')]);

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
            <div className="mini-counts"><span title="">{watchedCount}</span></div>
            <div>{watchedCountText}</div>
          </div>
        </div>
        <div className="summary">
          <h3><Link to={`/questions/${id}`} className="question-hyperlink" title="">{title}</Link></h3>
          {tags.length ? (<Tags data={tags} />) : ''}
          <div className="started">
            <Link to={`/questions/${id}`} className="started-link">{t('Asked')} <span title={created_at} className="relativetime">{timeAgo(created_at)}</span></Link>&nbsp;
            <Link to={`/users/${user.username}`} className="name">{user.username}</Link> <span className="reputation-score" title={t('level of reputation')} dir="ltr">{user.popular || 0}</span>
          </div>
        </div>
      </div>
    )
  }
});

export default Question;
