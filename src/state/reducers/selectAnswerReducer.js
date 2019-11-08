 // Author- Tejasvi Raj Pant

 import Actions from '../actions/actionTypes'; 

const initialState = {
    selectedAnswers: {}
};

const selectAnswerReducer = (state = initialState, action) => {
    switch(action.type){
        case Actions.SELECT_ANSWER:
            return {
                selectedAnswers: {
                    ...state.selectedAnswers,
                    [action.questionId]:action.selectedAnswer
                } 
            }
        default: 
            return state;
    }
}

export default selectAnswerReducer;