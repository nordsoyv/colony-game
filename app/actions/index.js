import * as types from './actionTypes'

export function saveCtx(ctx) {
  return {
    type: types.SAVE_CONTEXT,
    ctx
  }
}

export function createMap() {
  return {
    type: types.CREATE_MAP
  }
}

export function moveViewUp(){
  return {
    type: types.MOVE_VIEW_UP
  }
}

export function moveViewDown(){
  return {
    type: types.MOVE_VIEW_DOWN
  }
}

export function moveViewLeft(){
  return {
    type: types.MOVE_VIEW_LEFT
  }
}

export function moveViewRight(){
  return {
    type: types.MOVE_VIEW_RIGHT
  }
}