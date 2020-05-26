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
import he from 'he';
import {Link} from 'react-router-dom'


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
        this.onNextButtonHandler = this.onNextButtonHandler.bind(this);
    }

    backupQuestionAnswerList = [
        {
            question: "Who played Hey Jude?",
            choices: ["Beatles", "Pink Floyd", "Mettalica", "Nirvana"],
            correctAnswer: "Beatles"
        },
        {
            question: "Where was Buddha born?",
            choices: ["Nepal", "India", "China", "Japan"],
            correctAnswer: "Nepal"
        },
        {
            question: "When is Mikkel?",
            choices: ["1921", "1953", "1986", "2019"],
            correctAnswer: "1986"
        },
        {
            question: "Best FB Group.",
            choices: ["MRR", "MRR vs WRR", "RONB", "khai k bhannu"],
            correctAnswer: "khai k bhannu"
        }
    ];


    componentDidMount() {

        this.questionAnswerList = null;

        
        this.props.fetchData(this.category).then(() => {
            console.log("API hit with category" + this.state.category)
            this.questionAnswerList = [];

            if(this.props.questionAnswerList[0]["response_code"] !== 0) {
                console.log("response code not 0");
                this.questionAnswerList = this.backupQuestionAnswerList;
                return;
            };
            this.questionAnswerList = [];
            console.log(this.props.questionAnswerList);
            let questionAnswerArray = (this.props.questionAnswerList[0]["results"]);
            for (let questionAnswerAPI of questionAnswerArray) {
                let questionAnswer = {};
                
                questionAnswer.question = he.decode(questionAnswerAPI.question);
                questionAnswer.choices = [...questionAnswerAPI.incorrect_answers, questionAnswerAPI.correct_answer];
                questionAnswer.correctAnswer = questionAnswerAPI.correct_answer;
                this.questionAnswerList.push(questionAnswer);

            }
            console.log(this.questionAnswerList);
        }).catch((e) => {
            console.log("Error catched -", e);
            this.questionAnswerList = this.backupQuestionAnswerList.slice();
        }).finally(() => this.setState({dataFetched: !this.state.dataFetched}));
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

    onPrevButtonHandler = () => {
        this.props.gotoPrevQuestion();
        this.calculateScore();
    }

    onNextButtonHandler() {
        this.props.gotoNextQuestion();
        this.calculateScore();
      
    }

    onSubmitQuizHandler = () => {
        this.setState({ isSubmit: true });
        this.calculateScore();
    }

    calculateScore = () => {
        let score = 0;
        this.questionAnswerList.forEach((questionObj, index) => {
            if (questionObj.correctAnswer === this.props.selectedAnswers[index]) {
                score++;
            }
        });
        this.setState({ score: score * 10 });
    }

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
                    <div class="skipBackBtns">
                        {this.props.selectedQuestionIndex > 0 ? <button className={classes.submit} onClick={this.onPrevButtonHandler}>BACK</button> : <div> </div>}
                        {(this.props.selectedQuestionIndex < (this.questionAnswerList.length - 1)) ? <button className={classes.submit} onClick={this.onNextButtonHandler}>{this.props.selectedAnswers[this.props.selectedQuestionIndex] ? 'CONTINUE' : 'SKIP'}</button> : <button className={classes.submit} onClick={this.onSubmitQuizHandler}>SUBMIT</button>}
                    </div>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div className={classes.quizBox}>
                        <p className={classes.quizCaptionHeading}>Results </p>
                        <br />
                        <p className={classes.quizCaptionSH}>Score - {this.state.score} </p>
                        <p className={classes.quizCaptionSH}>Total - 100 </p>

                        <Link to="/">
                        <button className={classes.submit}>HOME</button>
                        </Link>
                    </div>
                </React.Fragment>
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