import {
  FETCHING_BOOK_START,
  FETCH_BOOK_COMPLETE
} from '../actions/constants';

export default function book(state = { isFetching: false, data: {}, error: {} }, action) {
  switch (action.type) {
    case FETCHING_BOOK_START:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_BOOK_COMPLETE:
      let newState = {
        isFetching: false,
        data: action.data,
        error: action.error
      };
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}
