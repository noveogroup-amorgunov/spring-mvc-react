import React from 'react';
import Loader from '../utils/loader';

var QuestionPage = React.createClass({
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

  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    const { title, ago, created_at, tags, comment } = this.state.data;

    return (
      <div>
        <h1>{title}</h1>

        <div className="started">
          Задан <span title="$question.created_at" className="relativetime">$question.ago</span>
        </div>

        <div className="tags">
            <a href="tags?id=$tag.id" className="post-tag" title="показать вопросы с меткой «$tag.name»" rel="tag">tag.name</a>
        </div>
        <div className="clear padding-bottom-10"></div>
        <div>
          {comment}
        </div>

        <h1>Ответы</h1>

        <b>Добавить ответ:</b>
        <form name="answers" action="answers" method="post">
            <div className="message color-red"></div>
            Сообщение <textarea name="message" required></textarea><br />
            <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
});

export default QuestionPage;
