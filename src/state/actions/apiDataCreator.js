 // Author- Tejasvi Raj Pant

export function getData(category) {
    return function(dispatch) {
      return fetch("https://opentdb.com/api.php?amount=10&type=multiple&category="+category)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: "DATA_LOADED", payload: json });
        });
    };
  }