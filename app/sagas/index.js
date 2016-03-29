import { take, put, select } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';

const getMapWidth = state => state.world.width;
const getMapHeight = state => state.world.height;
const getInput = state => state.input;

function* moveViewDaemon(){
  while(true){
    let action  = yield take(types.MOVE_VIEW);
    let input = yield select(getInput);
    let mapWidth = yield select(getMapWidth);
    let mapHeight = yield select(getMapHeight);
    let minX = 0;
    let minY = 0;
    let maxX = mapWidth - 20;
    let maxY = mapHeight - 20;
    let viewX = input.viewX;
    let viewY = input.viewY;
    switch (action.dir){
      case 'UP':
        if(viewY + action.amount >= maxX ){
          yield put({type:types.MOVE_VIEW_UP, amount: maxY - viewY});
        }else{
          yield put({type:types.MOVE_VIEW_UP, amount: action.amount});
        }
        break;
      case 'DOWN':
        if(viewY - action.amount > minY ){
          yield put({type:types.MOVE_VIEW_DOWN, amount: action.amount });
        }else{
          yield put({type:types.MOVE_VIEW_DOWN, amount: viewY});
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