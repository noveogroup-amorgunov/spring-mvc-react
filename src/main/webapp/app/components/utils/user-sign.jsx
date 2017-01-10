import React from 'react';
import timeAgo from '../../utils/time-ago';
import { Link } from 'react-router';

const Answer = React.createClass({
  render() {
    const user = this.props.data.user;
    const created_at = this.props.data.created_at;


    return (
      <div className="user-info clear">
          <div className="user-action-time">
              Задан <span title="" className="relativetime">{timeAgo(created_at)} назад</span>
          </div>
          <div className="user-details">
              <Link to={`/users/${user.username}`}>{user.username}</Link>
              <div className="-flair">
                  <span className="reputation-score" title="reputation score " dir="ltr">{user.popular}</span>
              </div>
          </div>
      </div>
    )
  }
});

export default Answer;
