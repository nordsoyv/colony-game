import * as types from './actionTypes'

export function saveCtx(ctx) {
  return {
    type: types.SAVE_CONTEXT,
    ctx
  }
}

export function setWorld(map, dynamicEntities){
  return {
    type: types.SET_WORLD,
    map,
    dynamicEntities,
    width:100,
    height:100
  }
}

export function pauseSimulation() {
  return {
    type: types.PAUSE_SIMULATION
  }
}

export function moveViewUp(){
  return {
    type: types.MOVE_VIEW,
    dir: 'UP',
    amount: 3
  }
}

export function moveViewDown(){
  return {
    type: types.MOVE_VIEW,
    dir: 'DOWN',
    amount: 3
  }
}

export function moveViewLeft(){
  return {
    type: types.MOVE_VIEW,
    dir: 'LEFT',
    amount: 3
  }
}

export function moveViewRight(){
  return {
    type: types.MOVE_VIEW,
    dir: 'RIGHT',
    amount: 3
  }
}

export function mouseButtonDown(button, xPos, yPos){
  return {
    type: types.MOUSE_BUTTON_DOWN,
    button,
    xPos,
    yPos
  }
}

export function mouseButtonUp(button, xPos, yPos){
  return {
    type: types.MOUSE_BUTTON_UP,
    button,
    xPos,
    yPos

  }
}

export function mouseMove(xPos, yPos){
  return {
    type: types.MOUSE_MOVE,
    xPos,
    yPos
  }
}

export function mouseLeave(){
  return {
    type: types.MOUSE_LEAVE
  }
}

export function mouseDragDone(){
  return {
    type: types.MOUSE_DRAG_DONE
  }
}