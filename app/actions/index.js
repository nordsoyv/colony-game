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
    type: types.MOVE_VIEW,
    dir: 'UP',
    amount: 1
  }
}

export function moveViewDown(){
  return {
    type: types.MOVE_VIEW,
    dir: 'DOWN',
    amount: 1
  }
}

export function moveViewLeft(){
  return {
    type: types.MOVE_VIEW,
    dir: 'LEFT',
    amount: 1
  }
}

export function moveViewRight(){
  return {
    type: types.MOVE_VIEW,
    dir: 'RIGHT',
    amount: 1
  }
}