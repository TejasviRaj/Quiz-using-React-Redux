 // Author- Tejasvi Raj Pant

import Actions from './actionTypes';


export function gotoNextQuestion() {
    return {
        type: Actions.GOTO_NEXT_QUESTION
    }
}

export function gotoPrevQuestion() {
    return {
        type: Actions.GOTO_PREV_QUESTION
    }
}

