import {
  ACTION_ONE,
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  FETCHING_BOOK_START,
  FETCH_BOOK_COMPLETE
} from './constants';

// this could reasonably be put elsewhere, but works here:
export const INITIAL_STATE = {};

// action creators:

const bookUrl = 'http://localhost:8000/book';


export function startFetchBook() {
  return {
    type: FETCHING_BOOK_START,
  }
}

function fetchBookComplete(err, book) {
  return {
    type: FETCH_BOOK_COMPLETE,
    data: book,
    error: err
  }
}

export function fetchBook(seed) {
  let qs = seed ? '?key=' + window.encodeURIComponent(seed) : '';
  let url = bookUrl + qs;
  return dispatch => {
    dispatch(startFetchBook());
    let startTime = Date.now();
    return fetch(url, {mode: 'cors'}).then(function(book) {
      return book.json();
    })
    .then(function(bookJson) {
      let timeDelta = Date.now() - startTime;
      let wait = Math.max(0, 3000 - timeDelta);
      setTimeout(() => {
        dispatch(fetchBookComplete(null, bookJson));
      }, wait);
    })
    .catch(function(err) {
      dispatch(fetchBookComplete(err, {}));
    });
  }
}



export function actionOne(payload) {
  return {
    type: ACTION_ONE,
    someProp: payload
  }
}

function startAsyncAction() {
  return {
    type: ASYNC_ACTION_START
  }
}

function endAsyncAction(payload) {
  return {
    type: ASYNC_ACTION_END,
    returnedData: payload
  }
}

export function performAsyncAction() {
  return dispatch => {
    dispatch(startAsyncAction());
    setTimeout(function() {
      let payload = 'Hello from app!';
      dispatch(endAsyncAction(payload));
    }, 0);
  }
}

