import React from 'react';
import Prism from 'prismjs';
import Loader from '../utils/loader';

import { withRouter  } from 'react-router';
import Answers from '../items/answers';

import UserSign from '../utils/user-sign';

import formatText from '../../utils/format-str';
import declOfNum from '../../utils/number-dec';
import timeAgo from '../../utils/time-ago';

var QuestionPage = withRouter(React.createClass({
  getInitialState() {
    return {
      data: {},
      loading: true
    };
  },
  componentDidMount() {
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
      data: JSON.stringify({ message, question_id: this.props.params.id }),
      success: data => {
        console.log(data);
        if (data.msg) {
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

  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    const { title, ago, created_at, tags, comment, answers, user } = this.state.data;
    const html = formatText(comment);

    const data = { user, created_at };

    return (
      <div>
        <h1>{title}</h1>
        <hr className="light" />

        <div className="started">
          Задан <span title="$question.created_at" className="relativetime">$question.ago</span>
        </div>

        <div className="tags">
            <a href="tags?id=$tag.id" className="post-tag" title="показать вопросы с меткой «$tag.name»" rel="tag">tag.name</a>
        </div>
        <div className="clear padding-bottom-10"></div>
        <div dangerouslySetInnerHTML={{__html: html}}></div>

        <UserSign data={data} />

        <hr className="light margin_top_100" />
        <h1>Ответы</h1>
        <Answers data={answers} />

        <b>Добавить ответ:</b>
        <form name="answers" action="answers" method="post" onSubmit={this.handleSubmit}>
            <div className="message color-red"></div>
            Сообщение <textarea ref="message" name="message" required="required"></textarea><br />
            <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}));

export default QuestionPage;
