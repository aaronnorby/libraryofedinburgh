import * as TestUtils from 'react-addons-test-utils';

import { default as bookReducer } from '../src/reducers/book';
import { FETCHING_BOOK_START, FETCH_BOOK_COMPLETE } from '../src/actions/constants';

describe('reducer', () => {
  it('sets an initial state', () => {
    let state = bookReducer(undefined, {});
    expect(state.isFetching).to.equal(false);
    expect(state.data).to.deep.equal({});
    expect(state.error).to.deep.equal({});
  });

  it('sets isFetching on fetch start', () => {
    const action = {
      type: FETCHING_BOOK_START
    };

    let nextState = bookReducer(undefined, action);

    expect(nextState.isFetching).to.equal(true);
  });

  it('sets book data on fetch book complete', () => {
    const action = {
      type: FETCH_BOOK_COMPLETE,
      data: 'fake data',
      error: null
    }

    let nextState = bookReducer(undefined, action);

    expect(nextState.isFetching).to.equal(false);
    expect(nextState.data).to.equal('fake data');
    expect(nextState.error).to.equal(null);
  });
});
