 // Author- Tejasvi Raj Pant

import gotoQuestionReducer from './gotoQuestionReducer';
import selectAnswerReducer from './selectAnswerReducer';
import quizAPIReducer from './quizAPIReducer'
import {combineReducers } from 'redux';

const rootReducer = combineReducers({
    selectedQuestionsIndex: gotoQuestionReducer,
    selectedAnswers: selectAnswerReducer,
    questionAnswerList: quizAPIReducer,
});

export default rootReducer;