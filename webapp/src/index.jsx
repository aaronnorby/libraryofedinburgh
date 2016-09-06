import React                             from 'react';
import { render }                        from 'react-dom';
import { Provider }                      from 'react-redux';
import configureStore                    from './store/configureStore';
import { INITIAL_STATE }                 from './reducers/reducer';
import App                               from './containers/App';

// because we're using webpack to bundle and process with sass:
require('./styles/main.scss');

// congifureStore can also take an initial state object, eg in the case os
// server-side rendering window._INITIAL_STATE
const store = configureStore(INITIAL_STATE);
console.log("nothing");

if (process.env.NODE_ENV === 'development') {
  window.devToolsExtension && window.devToolsExtension.open();
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
