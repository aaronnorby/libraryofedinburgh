export const ACTION_ONE         = 'ACTION_ONE';
export const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
export const ASYNC_ACTION_END   = 'ASYNC_ACTION_END';

// this could reasonably be put elsewhere, but works here: 
export const INITIAL_STATE = {};

// action creators: 

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

