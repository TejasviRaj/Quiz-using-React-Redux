 // Author- Tejasvi Raj Pant

import Actions from './actionTypes';
import { gotoNextQuestion } from './gotoQuestionsCreator';

export function selectAnswer(questionId, selectedAnswer) {
    return {
        type: Actions.SELECT_ANSWER,
        questionId: questionId,
        selectedAnswer: selectedAnswer
    }
}

export function customSelectAnswer(questionId,selectedAnswer,callback) {
    return function(dispatch) {
        if (callback == null) {
             Promise.resolve(dispatch(selectAnswer(questionId, selectedAnswer)));
             return;
        }
        Promise.resolve(dispatch(selectAnswer(questionId, selectedAnswer))).then(() => dispatch(gotoNextQuestion())).then(() => callback());
    }
}
