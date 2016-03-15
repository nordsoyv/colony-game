import { takeEvery } from 'redux-saga';
import * as types from '../actions/actionTypes';

import * as viewSagas from './moveViewSagas';

function* moveViewLeftDaemon(getState){
  yield *takeEvery(types.MOVE_VIEW_LEFT, viewSagas.moveViewLeftSaga, getState);
}

function* moveViewRightDaemon(getState){
  yield *takeEvery(types.MOVE_VIEW_RIGHT, viewSagas.moveViewRightSaga, getState);
}

function* moveViewUpDaemon(getState){
  yield *takeEvery(types.MOVE_VIEW_UP, viewSagas.moveViewUpSaga, getState);
}

function* moveViewDownDaemon(getState){
  yield *takeEvery(types.MOVE_VIEW_DOWN, viewSagas.moveViewDownSaga, getState);
}

export default [
  moveViewLeftDaemon,
  moveViewRightDaemon,
  moveViewUpDaemon,
  moveViewDownDaemon
];