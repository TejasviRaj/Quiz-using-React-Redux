
   let calculateScore = () => {
    let score = 0;
    this.questionAnswerList.forEach((questionObj, index) => {
        if (questionObj.correctAnswer === this.props.selectedAnswers[index]) {
            score++;
        }
    });
    this.setState({ score: score * 10 });
};
    export default function selectAnswer(questionId, selectedAnswer) {
        let calculateScoreBound = calculateScore.bind(this);
        if (this.props.selectedQuestionIndex === (this.questionAnswerList.length - 1)) {
            this.props.selectAnswer(questionId, selectedAnswer, null).then(() => calculateScoreBound());

            return;
        }
        this.props.selectAnswer(questionId, selectedAnswer, calculateScoreBound);

    }
    
 