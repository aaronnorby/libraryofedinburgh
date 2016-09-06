import { combineReducers } from 'redux';

import {
  ACTION_ONE,
  ASYNC_ACTION_START,
  ASYNC_ACTION_END
} from '../actions/index';

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
    default:
      return state;
  }
}

// export default function makeRootReducer() {
//   return combineReducers({
//     reducer,
//   });
// }
