import React from 'react';
import $ from 'jquery';

const p = window.config.basename;

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
          <h3><a href={`${p}/questions/${id}`} className="question-hyperlink" title="">{title}</a></h3>
          <div className="tags t-javascript t-null">
            <a href="/questions/tagged/javascript" className="post-tag" title="показать вопросы с меткой «javascript»" rel="tag">javascript</a> <a href="/questions/tagged/null" className="post-tag" title="показать вопросы с меткой «null»" rel="tag">null</a> 
          </div>
          <div className="started">
            <a href={`${p}/questions/${id}`} className="started-link">задан <span title={created_at} className="relativetime">50 сек. назад</span></a>
            <a className="name" href="/users/226251/razdva">RazDva</a> <span className="reputation-score" title="уровень репутации " dir="ltr">1</span>
          </div>
        </div>
      </div>
    )
  }
});

const Questions = React.createClass({
  getInitialState() {
    return {
      questions: []
    };
  },
  componentDidMount() {
    $.ajax({
      url: `${window.config.basename}/api/questions`,
      dataType: 'json',
      success: (questions) => {
        console.log('success');
        // console.log(data);
        this.setState({ questions });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  render() {
    const data = this.state.questions;

    return (
      <div className="question-list">
        {data.map((item, index) => 
          <div key={index}>
            <Question data={item} />
          </div>
        )}
      </div>
    );
  }
});

var HomePage = React.createClass({
  render() {
    return (
      <div>
        <Questions />
      </div>
    );
  }
});

export default HomePage;