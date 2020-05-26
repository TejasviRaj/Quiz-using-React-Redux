 // Author- Tejasvi Raj Pant
 import Actions from './actionTypes'

export function fetchData(category) {
    return function(dispatch) {
      return fetch("https://opentdb.com/api.php?amount=10&type=multiple&category="+category)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: Actions.DATA_FETCHED, payload: json });
        }).then(console.log("dispatched"));
    };
  }