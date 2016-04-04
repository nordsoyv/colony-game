import {take, put, select} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {getTool} from '../game/tools';
import {selectEntities} from '../game/map/mapUtils';
import {setSelectedEntities} from '../actions';

const getMapWidth = state => state.world.width;
const getMapHeight = state => state.world.height;
const getMap = state => state.world.map;
const getEntities = state => state.world.entities;
const getInput = state => state.input;
const getSelectedTool = state => state.input.selectedTool;

function* moveViewDaemon() {
  while (true) {
    let action = yield take(types.MOVE_VIEW);
    let input = yield select(getInput);
    let mapWidth = yield select(getMapWidth);
    let mapHeight = yield select(getMapHeight);
    let minX = 0;
    let minY = 0;
    let maxX = mapWidth - 20;
    let maxY = mapHeight - 20;
    let viewX = input.viewX;
    let viewY = input.viewY;
    switch (action.dir) {
      case 'UP':
        if (viewY + action.amount >= maxX) {
          yield put({ type: types.MOVE_VIEW_UP, amount: maxY - viewY });
        } else {
          yield put({ type: types.MOVE_VIEW_UP, amount: action.amount });
        }
        break;
      case 'DOWN':
        if (viewY - action.amount > minY) {
          yield put({ type: types.MOVE_VIEW_DOWN, amount: action.amount });
        } else {
          yield put({ type: types.MOVE_VIEW_DOWN, amount: viewY });
        }
        break;
      case 'RIGHT':
        if (viewX + action.amount <= maxX) {
          yield put({ type: types.MOVE_VIEW_RIGHT, amount: action.amount });
        } else {
          yield put({ type: types.MOVE_VIEW_RIGHT, amount: maxX - viewX });
        }
        break;
      case 'LEFT':
        if (viewX - action.amount >= minX) {
          yield put({ type: types.MOVE_VIEW_LEFT, amount: action.amount });
        } else {
          yield put({ type: types.MOVE_VIEW_LEFT, amount: viewX - minX });
        }
        break;
    }
  }
}

function* handleMouseCLick() {
  while (true) {
    let action = yield take(types.MOUSE_CLICK);
    console.log('click');
  }
}

function* handleMouseDrag() {
  while (true) {
    let action = yield take(types.MOUSE_DRAG_DONE);
    console.log('dragdone');
    let entities = yield select(getEntities);
    let map = yield select(getMap);
    let toolName = yield select(getSelectedTool);
    let tool = getTool(toolName);
    let xStart = action.startX;
    let yStart = action.startY;
    let xEnd = action.endX;
    let yEnd = action.endY;
    let width = xEnd - xStart;
    let height = yEnd - yStart;
    width = Math.ceil(width / 16);
    height = Math.ceil(height / 16);
    if(xStart > xEnd) {
      xStart = xEnd;
    }
    if(yStart < yEnd){
      yStart = yEnd
    }
    let startXTile = Math.floor(xStart / 16);
    let startYTile = Math.floor((512 - yStart) / 16);
    let selected = selectEntities(map, entities, tool.affectTag, startXTile, startYTile, width, height);
    yield put(setSelectedEntities(selected));
  }
}


export default [
  moveViewDaemon,
  handleMouseCLick,
  handleMouseDrag
];