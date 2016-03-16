import { take, put, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';

const getMap = state => state.map;
const getView = state => state.view;


function* moveViewDaemon(){
  while(true){
    let action  = yield take(types.MOVE_VIEW);
    let map = yield select(getMap);
    let view = yield select(getView);
    let minX = 0;
    let minY = 0;
    let maxX = map.width() - 20;
    let maxY = map.height() - 20;
    let viewX = view.viewX;
    let viewY = view.viewY;
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