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
  isDragging: false,
  selectedTool : 'command',
};

let input = (state = initialState, action) => {
  switch (action.type) {
    case types.MOVE_VIEW_DOWN:
      return Object.assign({}, state, { viewY: state.viewY - action.amount });
    case types.MOVE_VIEW_UP:
      return Object.assign({}, state, { viewY: state.viewY + action.amount });
    case types.MOVE_VIEW_RIGHT:
      return Object.assign({}, state, { viewX: state.viewX + action.amount });
    case types.MOVE_VIEW_LEFT:
      return Object.assign({}, state, { viewX: state.viewX - action.amount });
    case types.MOUSE_LEAVE:
      return Object.assign({}, state, {
        isDragging:false,
        mouseLeftButton : false,
        mouseRightButton : false,
        mouseXPos:0,
        mouseYPos:0,
        mouseStartDragXPos:0,
        mouseStartDragYPos:0  });
    case types.MOUSE_DRAG_DONE:
      return Object.assign({}, state, {isDragging:false});
    case types.MOUSE_DRAG:
      return Object.assign({}, state, {
        isDragging: true,
        mouseXPos:action.endX,
        mouseYPos:action.endY,
        mouseStartDragXPos:action.startX,
        mouseStartDragYPos:action.startY,
      });
    case types.SET_TOOL:
      return Object.assign({}, state, { selectedTool: action.tool});
    default:
      return state;
  }
};

export default input