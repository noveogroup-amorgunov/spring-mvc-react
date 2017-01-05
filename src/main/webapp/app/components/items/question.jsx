import React from 'react';
import Tags from './tags';

import { Link } from 'react-router';

const Question = React.createClass({
  render() {
    const { id, answers, comment, title, created_at, tags, user, updated_at } = this.props.data;

    return (
      <div className="question-summary narrow" id="question-summary-585433">
        <div className="cp">
          <div className="votes">
            <div className="mini-counts"><span title="0 голосов">0</span></div>
            <div>голосов</div>
          </div>
          <div className="status unanswered">
            <div className="mini-counts"><span title="0 ответов">0</span></div>
            <div>ответов</div>
          </div>
          <div className="views">
            <div className="mini-counts"><span title="1 показ">1</span></div>
            <div>показ</div>
          </div>
        </div>
        <div className="summary">
          <h3><Link to={`/questions/${id}`} className="question-hyperlink" title="">{title}</Link></h3>
          <Tags data={tags} />
          <div className="started">
            <Link to={`/questions/${id}`} className="started-link">задан <span title={created_at} className="relativetime">50 сек. назад</span></Link>
            <a className="name" href="/users/226251/razdva">RazDva</a> <span className="reputation-score" title="уровень репутации " dir="ltr">1</span>
          </div>
        </div>
      </div>
    )
  }
});

export default Question;
