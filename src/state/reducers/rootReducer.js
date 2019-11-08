 // Author- Tejasvi Raj Pant

import gotoQuestionReducer from './gotoQuestionReducer';
import selectAnswerReducer from './selectAnswerReducer';
import apiDataReducer from './apiDataReducer'
import {combineReducers } from 'redux';

const rootReducer = combineReducers({
    selectedQuestionsIndex: gotoQuestionReducer,
    selectedAnswers: selectAnswerReducer,
    apiData: apiDataReducer,
});

export default rootReducer;