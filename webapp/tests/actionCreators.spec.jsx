import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { actionOne, performAsyncAction } from '../src/actions/index';
import { ACTION_ONE, ASYNC_ACTION_START, ASYNC_ACTION_END } from '../src/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actionOne action creator', () => {
  it('should return a someProp with its action', () => {
    const payload = 'sample';
    const expectedAction = {
      type: ACTION_ONE,
      someProp: payload
    };

    const result = actionOne(payload);

    expect(result.type).to.equal(expectedAction.type);
    expect(result.someProp).to.equal(expectedAction.someProp);
  });
});

describe('async action creator', () => {
  it('should start and end async action', (done) => {
    // we are going to use the redux-mock-store utility to mock our entire store to
    // test async actions. It runs assertion internally (using 'expect') against
    // the series of actions we provide
    
    
    const INITIAL_STATE = {};

    // the series of actions we expect to be dispatched
    const expectedActions = [
      {type: ASYNC_ACTION_START},
      {type: ASYNC_ACTION_END, returnedData: 'Hello from app!'}
    ];

    const store = mockStore(INITIAL_STATE, expectedActions, done);

    // start it off: 
    store.dispatch(performAsyncAction());
  });
});


