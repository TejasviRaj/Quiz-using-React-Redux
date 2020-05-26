 // Author- Tejasvi Raj Pant

 import React, { Component } from 'react';
import { connect } from 'react-redux';
import {gotoNextQuestion, gotoPrevQuestion} from '../../state/actions/gotoQuestionsCreator'
import {customSelectAnswer} from '../../state/actions/selectAnswerCreator'
import {getData} from '../../state/actions/apiDataCreator';
import classes from './Quiz.css';
import Question from '../Question/Question';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            score: 0
        };
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
        this.props.getData();
    }

    selectAnswer(questionId, selectedAnswer) {
        if (this.props.selectedQuestionIndex === 3){
            this.props.selectAnswer(questionId, selectedAnswer, null);
            return;
        }
        this.props.selectAnswer(questionId, selectedAnswer, this.calculateScore);
    //    this.props.gotoNextQuestion();
        // this.calculateScore();
      //  this.onNextButtonHandler();
    }

    onPrevButtonHandler = () => {
        this.props.gotoPrevQuestion();
        this.calculateScore();
    }

    onNextButtonHandler() {
        this.props.gotoNextQuestion();
        this.calculateScore();
        console.log(this.props.apiData)

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
        this.setState({ score: score });
    }

    render() {
        const { question, choices } = this.questionAnswerList[this.props.selectedQuestionIndex];

        if (!this.state.isSubmit) {
            return (
                <div className = {classes.quizBox}>
                    Score - {this.state.score}
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
                                {(this.props.selectedQuestionIndex < (this.questionAnswerList.length-1))? <button className = {classes.submit} onClick={this.onNextButtonHandler}>SKIP</button>: <button className = {classes.submit} onClick={this.onSubmitQuizHandler}>SUBMIT</button>}
                        </div>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                    Congratulations
                    Score - {this.state.score}                   
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
        getData: () => dispatch(getData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);