import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import sagaMiddleware from 'redux-saga';
import sagas from '../sagas';

import createLogger from 'redux-logger';

import * as types from '../actions/actionTypes';

function filterActions(getState, action) {
  let actionsToFilter = [
    'EFFECT_RESOLVED',
    'EFFECT_TRIGGERED',
    types.MOVE_VIEW,
    types.MOVE_VIEW_LEFT,
    types.MOVE_VIEW_RIGHT,
    types.MOVE_VIEW_UP,
    types.MOVE_VIEW_DOWN,
    types.MOUSE_MOVE,
    types.MOUSE_LEAVE,
    types.MOUSE_BUTTON_DOWN,
    types.MOUSE_BUTTON_UP,
    types.SET_WORLD
  ];

  return !actionsToFilter.includes(action.type);
}


const logger = createLogger({
  predicate: filterActions
});

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(sagaMiddleware(...sagas), logger)
  ));
  return store;
}