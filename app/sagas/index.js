import { take, put } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';

function* moveViewDaemon(getState){
  while(true){
    let action  = yield take(types.MOVE_VIEW);
    let state = getState();
    let minX = 0;
    let minY = 0;
    let maxX = state.map.width() - 20;
    let maxY = state.map.height() - 20;
    let viewX = state.view.viewX;
    let viewY = state.view.viewY;
    switch (action.dir){
      case 'UP':
        if(viewY - action.amount <= minY ){
          yield put({type:types.MOVE_VIEW_UP, amount: viewY - minY});
        }else{
          yield put({type:types.MOVE_VIEW_UP, amount: action.amount});
        }
        break;
      case 'DOWN':
        if(viewY + action.amount <= maxY ){
          yield put({type:types.MOVE_VIEW_DOWN, amount: action.amount});
        }else{
          yield put({type:types.MOVE_VIEW_DOWN, amount: maxY - viewY});
        }
        break;
      case 'RIGHT':
        if(viewX + action.amount <= maxX ){
          yield put({type:types.MOVE_VIEW_RIGHT, amount: action.amount});
        }else{
          yield put({type:types.MOVE_VIEW_RIGHT, amount: maxX - viewX});
        }
        break;
      case 'LEFT':
        if(viewX - action.amount >= minX ){
          yield put({type:types.MOVE_VIEW_LEFT, amount: action.amount});
        }else{
          yield put({type:types.MOVE_VIEW_LEFT, amount: viewX - minX});
        }
        break;
    }
  }

}

export default [
  moveViewDaemon,
];