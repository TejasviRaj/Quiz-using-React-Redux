 // Author- Tejasvi Raj Pant

import Actions from '../actions/actionTypes'

const initialState = {
    questionAnswerList: []
}

function quizAPIReducer(state = initialState, action) {
    if (action.type === Actions.DATA_FETCHED) {
        return Object.assign({}, state, {
            questionAnswerList: state.questionAnswerList.concat(action.payload)
        });
    }
    return state;
}
export default quizAPIReducer;

