 // Author- Tejasvi Raj Pant

import Actions from '../actions/actionTypes'

const initialState = {
    apiData: []
}

function apiDataReducer(state = initialState, action) {
    if (action.type === Actions.DATA_LOADED) {
        return Object.assign({}, state, {
            apiData: state.apiData.concat(action.payload)
        });
    }
    return state;
}
export default apiDataReducer;

