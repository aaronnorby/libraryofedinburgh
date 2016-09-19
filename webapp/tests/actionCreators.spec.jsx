import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// import { actionOne, performAsyncAction } from '../src/actions/index';
// import { ACTION_ONE, ASYNC_ACTION_START, ASYNC_ACTION_END } from '../src/actions/index';
import { fetchBook, startFetchBook } from '../src/actions/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('fetchBook', () => {
  let _fetch;
  beforeEach(() => {
    _fetch = fetch;
    fetch = () => { return new Promise(
      function(resolve, reject) {
        resolve({ json: () => { return true; } });
      }
    )};
  });

  afterEach(() => {
    fetch = _fetch;
  });

  it('should fetch a book async', (done) => {
    const store = mockStore({});
    return store.dispatch(fetchBook())
      .then(() => {
        expect(store.getActions()[0]).to.deep.equal(startFetchBook());
        done();
      })
      .catch(function(err) {
        console.log('err ', err.message);
        throw new Error(err);
      });
  });
});
