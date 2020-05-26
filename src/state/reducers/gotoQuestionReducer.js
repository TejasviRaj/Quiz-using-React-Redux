 // Author- Tejasvi Raj Pant

import Actions from '../actions/actionTypes'; 

const initialState = {
    selectedQuestionIndex: 0,
};

const gotoQuestionReducer = (state = initialState, action) => {
    switch(action.type){
        case Actions.GOTO_NEXT_QUESTION:
            return {
                selectedQuestionIndex: state.selectedQuestionIndex + 1
            }
        case Actions.GOTO_PREV_QUESTION:
            return {
                selectedQuestionIndex: state.selectedQuestionIndex - 1
            }
        case Actions.RESET_QUESTION_COUNTER:
            return {
                selectedQuestionIndex: 0
            }
        default: 
            return state;
    }
}

export default gotoQuestionReducer;