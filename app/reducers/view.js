import * as types from '../actions/actionTypes'

const initialState = {
  viewX: 0,
  viewY: 0

};

let view = (state = initialState, action) => {
  switch (action.type) {
    case types.MOVE_VIEW_DOWN:
      return Object.assign({}, state, { viewY: state.viewY + action.amount });
    case types.MOVE_VIEW_UP:
      return Object.assign({}, state, { viewY: state.viewY - action.amount });
    case types.MOVE_VIEW_RIGHT:
      return Object.assign({}, state, { viewX: state.viewX + action.amount });
    case types.MOVE_VIEW_LEFT:
      return Object.assign({}, state, { viewX: state.viewX - action.amount });
    default:
      return state;
  }
};

export default view