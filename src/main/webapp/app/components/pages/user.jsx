import React from 'react';
import { t } from 'localizify';

import UserService from '../../services/user';
import QuestionService from '../../services/question';
import AnswerService from '../../services/answer';

import Loader from '../utils/loader';
import declOfNum from '../../utils/number-dec';

import QuestionListSmall from '../items/question-list-small';
import AnswerListSmall from '../items/answer-list-small';

var UserPage = React.createClass({
  getInitialState() {
    return {
      data: {},
      isExist: false,
      loading: true
    };
  },
  componentDidMount() {

    const userName = this.props.params.name;
    const service = new UserService();
    service.getByUsername(userName).then(data => {
      this.setState({ loading: false });
      if (!data) {
        return;
      }

      const questionService = new QuestionService();
      const answerService = new AnswerService();

      data.questions = [];
      data.answers = [];
      this.setState({ isExist: true });
      this.setState({ data });


      Promise.all([
        questionService.getByUsername(userName),
        answerService.getByUsername(userName),
      ]).then(data => {
        const newData = Object.assign({}, this.state.data);
        newData.questions = data[0];
        newData.answers = data[1];
        this.setState({ data: newData });
      });
    })
  },
  render() {
    if (this.state.loading) {
      return ( <Loader isActive="true" /> );
    }

    if (!this.state.isExist) {
      return ( <div><h2>{t('User haven\'t exist')}</h2></div> );
    }

    // console.log(this.state.data);
    
    const answers = this.state.data.answers || [];
    const questions = this.state.data.questions || [];


    return (
      <div>
        <h2>{this.props.dashboard ? t('Hello') + ', ' : t('User\'s page')} {this.state.data.username}</h2>
        <div className="user-stats">
          <div className="row">
              <div className="stat answers col-3">
                  <span className="number">{questions.length}</span>
                  {declOfNum(questions.length, [t('question'), t('questions'), t('questions-2')])}
              </div>
              <div className="stat questions col-3">
                  <span className="number">{answers.length}</span>
                  {declOfNum(answers.length, [t('answer'), t('answers'), t('answers-2')])}
              </div>
              <div className="stat questions col-3">
                  <span className="number">{this.state.data.popular}</span>
                  {declOfNum(this.state.data.popular, [t('reputation'), t('reputation'), t('reputation')])}
              </div>
          </div>
        </div>
        <div className="clear"></div>
        <div className="margin-top-20">
          <h2>{t('Questions')}</h2>
          <QuestionListSmall data={questions} />
        </div>
        {/*<div className="margin-top-20">
          <h2>{t('Answer')}</h2>
          <AnswerListSmall data={answers} />
        </div>*/}
      </div>
    );
  }
});

export default UserPage;
