import {
  FETCHING_BOOK_START,
  FETCH_BOOK_COMPLETE
} from './constants';

// this could reasonably be put elsewhere, but works here:
export const INITIAL_STATE = {};

// action creators:
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const bookUrl = env === 'prod' ? '/book' : 'http://localhost:3000/book';

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
      let wait = Math.max(0, 5000 - timeDelta);
      setTimeout(() => {
        dispatch(fetchBookComplete(null, bookJson));
      }, wait);
    })
    .catch(function(err) {
      dispatch(fetchBookComplete(err, {}));
    });
  }
}
