// import { combineReducers } from 'redux';

import {
  ACTION_ONE,
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  FETCHING_BOOK_START,
  FETCH_BOOK_COMPLETE
} from '../actions/constants';

export const INITIAL_STATE = {
  someProp: 'old prop',
  data: '',
  isFetching: false };

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_ONE:
      return Object.assign({}, state, {someProp: action.someProp});
    case ASYNC_ACTION_START:
      return Object.assign({}, state, {isFetching: true});
    case ASYNC_ACTION_END:
      return Object.assign({}, state, {isFetching: false, data: action.returnedData});
    case FETCHING_BOOK_START:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_BOOK_COMPLETE:
      return Object.assign({}, state, { isFetching: false, data: action.data, error: action.error });
    default:
      return state;
  }
}

function book(state = { isFetching: false, data: {}, error: {} }, action) {
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
  }
}
