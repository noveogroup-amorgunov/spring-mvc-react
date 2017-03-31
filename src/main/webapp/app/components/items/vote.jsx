import React from 'react';
import { t } from 'localizify';

import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';
import formatText from '../../utils/format-str';

import auth from '../../auth';
import UserSign from '../utils/user-sign';

import { Link } from 'react-router';

const Vote = React.createClass({
  getInitialState() {
    return {
      rating: 0,
      isVoted: 0,
    };
  },

  up(e) {
    event.preventDefault();
    console.log('up');
    this.request('UP');
  },
  down(e) {
    event.preventDefault();
    this.request('DOWN');
  },

  request(mark = 'UP') {
    if (this.isOwnUser() || this.isVoted('UP') || this.isVoted('DOWN')) {
      console.log('this is own user or is voted');
      return false;
    }

    const data = {
      token: auth.getToken(),
      mark
    };

    if (this.props.data.answerId) {
      data.answer_id = this.props.data.answerId
    } else if (this.props.data.questionId) {
      data.question_id = this.props.data.questionId
    }

    $.ajax({
      type: 'POST',
      url: `${window.config.basename}/api/vote`,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: data => {
        console.log(data);
        const sign = mark === 'UP' ? 1 : -1;
        if (data.msg) {
          this.setState({ rating: this.state.rating + sign });
          this.setState({ isVoted: sign });
        }
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });
  },

  isOwnUser() {
    return auth.getName() === this.props.data.user.username;
  },

  isVoted(mark = 'UP') {
    if (this.state.isVoted === 1 && mark === 'UP') {
      return true;
    }
    if (this.state.isVoted === -1 && mark === 'DOWN') {
      return true;
    }

    let result = false;
    const userName = auth.getName();
    if (!this.props.data.votes) {
      return false;
    }
    this.props.data.votes.forEach(item => {
      if (item.user.username == userName && item.mark == mark) {
        result = true;
      }
    });
    return result;
  },

  componentDidMount() {
    this.setState({ rating: this.props.data.popular });
  },

  render() {
    // console.log(JSON.stringify(this.props.data));
    const { questionId, answerId, popular, votes } = this.props.data;

    const classNameUp = this.state.isVoted === 1 || this.isVoted('UP') ? 'vote-up-on' : 'vote-up-off';
    const classNameDown = this.state.isVoted === -1 || this.isVoted('DOWN') ? 'vote-down-on' : 'vote-down-off';

    

    return (
      <div className="vote" title={ this.isOwnUser() ? t('You can\'t vote for own answer or question') : ''}>
          <a href="javascript:void(0);" onClick={this.up} className={classNameUp}>up vote</a>
          <span className="vote-count-post high-scored-post">{this.state.rating}</span>
          <a href="javascript:void(0);" onClick={this.down} className={classNameDown}>down vote</a>
      </div>
    )
  }
});

export default Vote;
