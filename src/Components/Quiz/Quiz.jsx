// Author- Tejasvi Raj Pant

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gotoNextQuestion, gotoPrevQuestion } from '../../state/actions/gotoQuestionsCreator'
import { customSelectAnswer } from '../../state/actions/selectAnswerCreator'
import { fetchData } from '../../state/actions/quizAPICreator';
import {resetQuestionCounter} from '../../state/actions/resetQuestionCounterCreator'
import classes from './Quiz.css';
import Question from '../Question/Question';
import { withRouter } from "react-router-dom";
import Result from '../Result/Result';
import fetchDataFromAPI from './fetchData'

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            score: 0,
            dataFetched: 0,
        };
        this.category = this.props.match.params.id;
        this.questionAnswerList = null;
        this.selectAnswer = this.selectAnswer.bind(this);
    }


    componentDidMount() {
        const fetchDataFromAPIBound = fetchDataFromAPI.bind(this);
        fetchDataFromAPIBound();

    }


    componentWillUnmount() {
        this.props.resetQuestionCounter();
        console.log("unmounted");
    }
   
    

    selectAnswer(questionId, selectedAnswer) {
        if (this.props.selectedQuestionIndex === (this.questionAnswerList.length - 1)) {
            this.props.selectAnswer(questionId, selectedAnswer, null).then(() => this.calculateScore());

            return;
        }
        this.props.selectAnswer(questionId, selectedAnswer, this.calculateScore);

    }
    
    calculateScore = () => {
        let score = 0;
        this.questionAnswerList.forEach((questionObj, index) => {
            if (questionObj.correctAnswer === this.props.selectedAnswers[index]) {
                score++;
            }
        });
        this.setState({ score: score * 10 });
    };

    render() {

        if (!this.questionAnswerList) {
            return null;
        }

        const { question, choices } = this.questionAnswerList[this.props.selectedQuestionIndex];

        if (!this.state.isSubmit) {
            return (
                <div className={classes.quizBox}>
                    <p class={classes.score}>Score - {this.state.score} </p>
                    <Question
                        selectedAnswer={this.props.selectedAnswers[this.props.selectedQuestionIndex]}
                        selectAnswer={this.selectAnswer}
                        selectedQuestionIndex={this.props.selectedQuestionIndex}
                        question={question}
                        choices={choices}
                        className={classes.question}
                    />
                    <div class={classes.skipBackBtns}>
                        {this.props.selectedQuestionIndex > 0 ? <button className={classes.submit} onClick={this.props.gotoPrevQuestion}>BACK</button> : <div> </div>}
                        {(this.props.selectedQuestionIndex < (this.questionAnswerList.length - 1)) ? <button className={classes.submit} onClick={this.props.gotoNextQuestion}>{this.props.selectedAnswers[this.props.selectedQuestionIndex] ? 'CONTINUE' : 'SKIP'}</button> : <button className={classes.submit} onClick={() => this.setState({ isSubmit: true })}>SUBMIT</button>}
                    </div>
                </div>
            );
        }
        else {
            return (
               <Result score = {this.state.score} />
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        selectedQuestionIndex: state.selectedQuestionsIndex.selectedQuestionIndex,
        selectedAnswers: state.selectedAnswers.selectedAnswers,
        questionAnswerList: state.questionAnswerList.questionAnswerList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        gotoNextQuestion: () => dispatch(gotoNextQuestion()),
        gotoPrevQuestion: () => dispatch(gotoPrevQuestion()),
        resetQuestionCounter: () => dispatch(resetQuestionCounter()),
        selectAnswer: (questionId, selectedAnswer, callback) => dispatch(customSelectAnswer(questionId, selectedAnswer, callback)),
        fetchData: (category) => dispatch(fetchData(category))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz));