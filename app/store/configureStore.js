import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import sagaMiddleware from 'redux-saga';
import sagas from '../sagas';

import createLogger from 'redux-logger';

function filterActions(getState, action) {
  let actionsToFilter = [
    'EFFECT_RESOLVED',
    'EFFECT_TRIGGERED',
    'MOVE_VIEW',
    'MOVE_VIEW_LEFT',
    'MOVE_VIEW_RIGHT',
    'MOVE_VIEW_UP',
    'MOVE_VIEW_DOWN',

  ];


  return !actionsToFilter.includes(action.type);
}


const logger = createLogger({
  predicate: filterActions
});

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(sagaMiddleware(...sagas), logger)

    //DevTools.instrument(),
    //persistState(
    //  window.location.href.match(
    //    /[?&]debug_session=([^&]+)\b/
      //)
    //)
  ));

  //if (module.hot) {
  //   Enable Webpack hot module replacement for reducers
    //module.hot.accept('../reducers', () => {
    //  const nextReducer = require('../reducers');
    //  store.replaceReducer(nextReducer);
    //});
  //}

  return store;
}