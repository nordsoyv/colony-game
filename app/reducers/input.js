import * as types from '../actions/actionTypes'

const initialState = {
  viewX: 0,
  viewY: 0,
  mouseLeftButton : false,
  mouseRightButton : false,
  mouseXPos:0,
  mouseYPos:0,
  mouseStartDragXPos:0,
  mouseStartDragYPos:0,
};

function isLeftButton(btn){
  return btn == 0;
}
function isRightButton(btn){
  return btn == 2;
}

function createMouseState(action){
  return {
    mouseStartDragXPos:action.xPos,
    mouseStartDragYPos: action.yPos,
    mouseXPos: action.xPos,
    mouseYPos: action.yPos,
  }
}

let input = (state = initialState, action) => {
  let mouseState;
  switch (action.type) {
    case types.MOVE_VIEW_DOWN:
      return Object.assign({}, state, { viewY: state.viewY + action.amount });
    case types.MOVE_VIEW_UP:
      return Object.assign({}, state, { viewY: state.viewY - action.amount });
    case types.MOVE_VIEW_RIGHT:
      return Object.assign({}, state, { viewX: state.viewX + action.amount });
    case types.MOVE_VIEW_LEFT:
      return Object.assign({}, state, { viewX: state.viewX - action.amount });
    case types.MOUSE_BUTTON_DOWN:
      mouseState = createMouseState(action);
      if(isLeftButton(action.button)){
        mouseState.mouseLeftButton = true;
      }
      if(isRightButton(action.button)){
        mouseState.mouseRightButton = true;
      }
      return Object.assign({}, state, mouseState);
    case types.MOUSE_BUTTON_UP:
      mouseState = createMouseState(action);
      if(isLeftButton(action.button)){
        mouseState.mouseLeftButton = false;
      }
      if(isRightButton(action.button)){
        mouseState.mouseRightButton = false;
      }
      return Object.assign({}, state, mouseState);
    case types.MOUSE_MOVE:
      return Object.assign({},state, {
        mouseXPos: action.xPos,
        mouseYPos: action.yPos
      });
    case types.MOUSE_LEAVE:
      return Object.assign({}, state, {
        mouseLeftButton : false,
        mouseRightButton : false,
        mouseXPos:0,
        mouseYPos:0,
        mouseStartDragXPos:0,
        mouseStartDragYPos:0  });
    default:
      return state;
  }
};

export default input