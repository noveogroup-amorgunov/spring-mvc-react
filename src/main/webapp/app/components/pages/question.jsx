import React from 'react';
import Prism from 'prismjs';
import Loader from '../utils/loader';
import $ from 'jquery';
import { t } from 'localizify';

import { withRouter  } from 'react-router';
import Answers from '../items/answers';
import Vote from '../items/vote';

import auth from '../../auth';

import UserSign from '../utils/user-sign';

import formatText from '../../utils/format-str';
import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';

import Tags from '../items/tags';



var QuestionPage = withRouter(React.createClass({
  getInitialState() {
    return {
      data: {},
      loading: true
    };
  },
  componentDidMount() {

    if (this.state.loading) {
      const id = this.props.params.id;
      const watchedCount = localStorage.getItem(`q${id}`) || 0;
      localStorage.setItem(`q${id}`, +watchedCount + 1);
    }

    setTimeout(() =>
      $.ajax({
        url: `${window.config.basename}/api/question/${this.props.params.id}`,
        dataType: 'json',
        success: data => {
          console.log(data);
          this.setState({ data, loading: false });
        },
        error: (xhr, status, err) => {
          console.error(this.props.url, status, err.toString());
        }
      })
    , 0);
  },

  handleSubmit(event) {
    event.preventDefault();

    const message = this.refs.message.value.trim();

    $.ajax({
      type: 'POST',
      url: `${window.config.basename}/api/answer`,
      contentType: 'application/json',
      data: JSON.stringify({
        message,
        question_id: this.props.params.id,
        token: auth.getToken()
      }),
      success: data => {
        console.log(data);
        if (data.msg) {

          if (data.msg == 'Wrong token' || data.code == '404') {
            auth.logout();
            return this.props.router.replace('/login');
          }

          $(this.refs.message).val('');

          const { location } = this.props

          this.componentDidMount();
          // window.location.reload();
          // if (location.state && location.state.nextPathname) {
          //   this.props.router.replace(location.state.nextPathname)
          // } else {
          //   this.props.router.replace(`/questions/${this.props.params.id}`)
          // }
        } else {
          console.error(data);
        }
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });

    return false;
  },

  onChangeAnswer() {
    const message = this.refs.message.value.trim();
    // console.log((message));
    $('.preview').html(formatText(message));
  },

  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    const { title, ago, created_at, tags, comment, answers, user, votes, id } = this.state.data;
    const html = formatText(comment);

    const popular = votes.filter(t => t.mark === 'UP').length - votes.filter(t => t.mark === 'DOWN').length;
    const userChooses = null

    const data = { user, created_at };

    return (
      <div>
        <h1>{title}</h1>
        <hr className="light" />
        <div className="clear padding-bottom-10"></div>
        <div className="question-content">
          <Vote data={{ votes, user, popular, questionId: id }} />
          <div dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
        <UserSign data={data} />
        <div style={{ paddingLeft: '65px' }} className="padding-top-10">
          <Tags data={tags} />
          <div className="padding-top-10 share-block"><a href="#">{t('Share')}</a>&nbsp;&nbsp;<a href="#">{t('Report')}</a></div>
        </div>

        <hr className="light padding-top-10 margin-top-20" />
        <h1>{t('Answers')}</h1>
        <Answers data={answers} />

        <b>{t('Add answer')}:</b>
        
        <form className={auth.loggedIn() ? '' : 'hide'} name="answers" action="answers" method="post" onSubmit={this.handleSubmit}>
            <div className="message color-red"></div>
            {t('Message')} <textarea onChange={this.onChangeAnswer} ref="message" name="message" required="required"></textarea><br />
            <hr className="light" />
            <div className="preview"></div>
            <hr className="light" />            
            <input className="btn btn-block btn-social btn-github" type="submit" value="Отправить" />
        </form>
        <div className={!auth.loggedIn() ? '' : 'hide'}><br />{t('You should auth')}</div>
      </div>
    );
  }
}));

export default QuestionPage;
