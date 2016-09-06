import * as TestUtils from 'react-addons-test-utils';

import reducer from '../src/reducers/reducer';

describe('reducer', () => {
  it('sets an initial state', () => {
    let state = reducer(undefined, {});
    expect(state.someProp).to.equal('old prop');
  });

  it('sets someProp with ACTION_ONE', () => {
    const INITIAL_STATE = {
      someProp: 'some value',
      data: 'some data',
      isFetching: false
    }

    const action = {
      type: 'ACTION_ONE',
      someProp: 'new value'
    }

    const nextState = reducer(INITIAL_STATE, action);

    expect(nextState.someProp).to.equal('new value');
  });
});
