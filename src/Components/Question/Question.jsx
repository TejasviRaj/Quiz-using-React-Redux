// Author- Tejasvi Raj Pant

import React from 'react';
import classes from './Question.css';


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.selectAnswer = this.selectAnswer.bind(this);
    }

    selectAnswer(selectedAnswer) {
        this.props.selectAnswer(this.props.selectedQuestionIndex, selectedAnswer);
    }
    render() {
        return (
            <div className = {classes.questionBox}>
                    <p className = {classes.question}> {this.props.question} </p>
                    {this.props.choices.map(choice => {
                        return <button className = {classes.choice + " " + (choice === this.props.selectedAnswer? classes.selectedChoice: "")} key={choice} onClick={() => this.selectAnswer(choice)}>
                            {choice}
                        </button>
                    })}
            </div>
        );
    }
}

export default Question;