 // Author- Tejasvi Raj Pant

 import React, { Component } from 'react';
import { connect } from 'react-redux';
import {gotoNextQuestion, gotoPrevQuestion} from '../../state/actions/gotoQuestionsCreator'
import {customSelectAnswer} from '../../state/actions/selectAnswerCreator'
import {getData} from '../../state/actions/apiDataCreator';
import classes from './Quiz.css';
import Question from '../Question/Question';
import { withRouter } from "react-router-dom";


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            score: 0
        };
        this.id = this.props.match.params.id;
        this.selectAnswer = this.selectAnswer.bind(this);
        this.onNextButtonHandler = this.onNextButtonHandler.bind(this);
    }

    questionAnswerList = [
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


    componentDidMount(){
        this.props.getData(this.id);
    }

    selectAnswer(questionId, selectedAnswer) {
        if (this.props.selectedQuestionIndex === (this.questionAnswerList.length-1)){
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
        console.log(this.props.apiData[0]["response_code"]);
        let resultArray = (this.props.apiData[0]["results"]);
        for (let i of resultArray) {
            console.log(i);
        }
        console.log(typeof resultArray)


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
        this.setState({ score: score*10 });
    }

    render() {
        const { question, choices } = this.questionAnswerList[this.props.selectedQuestionIndex];

        if (!this.state.isSubmit) {
            return (
                <div className = {classes.quizBox}>
                    <p class = {classes.score}>Score - {this.state.score} </p>
                        <Question
                            selectedAnswer={this.props.selectedAnswers[this.props.selectedQuestionIndex]}
                            selectAnswer={this.selectAnswer}
                            selectedQuestionIndex={this.props.selectedQuestionIndex}
                            question = {question}
                            choices = {choices}
                            className = {classes.question}
                        />
                        <div class = "skipBackBtns">
                                {this.props.selectedQuestionIndex > 0 ? <button className = {classes.submit} onClick={this.onPrevButtonHandler}>BACK</button> : <div> </div>}
                                {(this.props.selectedQuestionIndex < (this.questionAnswerList.length-1))? <button className = {classes.submit} onClick={this.onNextButtonHandler}>{this.props.selectedAnswers[this.props.selectedQuestionIndex] ? 'CONTINUE': 'SKIP'}</button>: <button className = {classes.submit} onClick={this.onSubmitQuizHandler}>SUBMIT</button>}
                        </div>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                <div className = {classes.quizBox}>
                    <p className = {classes.quizCaptionHeading}>Results </p>
                    <br/>
                    <p className = {classes.quizCaptionSH}>Score - {this.state.score} </p> 
                    <p className = {classes.quizCaptionSH}>Total - 100 </p> 

                    <button className = {classes.submit}>HOME</button>
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
        apiData :state.apiData.apiData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        gotoNextQuestion: () => dispatch(gotoNextQuestion()),
        gotoPrevQuestion: () => dispatch(gotoPrevQuestion()),
        selectAnswer: (questionId, selectedAnswer, callback) => dispatch(customSelectAnswer(questionId, selectedAnswer, callback)),
        getData: (category) => dispatch(getData(category))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz));