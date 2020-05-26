import backupQuestionAnswerList from './backupQuestionAnswerList'
import he from 'he';

// bound to Quiz
export default function fetchData() {
    this.questionAnswerList = null;

        
    this.props.fetchData(this.category).then(() => {
        console.log("API hit with category" + this.state.category)
        this.questionAnswerList = [];

        if(this.props.questionAnswerList[0]["response_code"] !== 0) {
            console.log("response code not 0");
            this.questionAnswerList = backupQuestionAnswerList;
            return;
        };
        this.questionAnswerList = [];
        console.log(this.props.questionAnswerList);
        let questionAnswerArray = (this.props.questionAnswerList[0]["results"]);
        for (let questionAnswerAPI of questionAnswerArray) {
            let questionAnswer = {};
            questionAnswerAPI.correct_answer = he.decode(questionAnswerAPI.correct_answer);
            questionAnswer.question = he.decode(questionAnswerAPI.question);
            for (let choiceIndex in questionAnswerAPI.incorrect_answers) {
                questionAnswerAPI.incorrect_answers[choiceIndex] = he.decode(questionAnswerAPI.incorrect_answers[choiceIndex]);
            }
            questionAnswer.choices = [...questionAnswerAPI.incorrect_answers, questionAnswerAPI.correct_answer];
            questionAnswer.correctAnswer = questionAnswerAPI.correct_answer;
            this.questionAnswerList.push(questionAnswer);

        }
        console.log(this.questionAnswerList);
    }).catch((e) => {
        console.log("Error catched -", e);
        this.questionAnswerList = backupQuestionAnswerList.slice();
    }).finally(() => this.setState({dataFetched: !this.state.dataFetched}));
}