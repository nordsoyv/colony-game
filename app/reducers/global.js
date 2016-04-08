import {SAVE_CONTEXT, DEBUG_MODE} from '../actions/actionTypes'

const initialState = { ctx: null, debug : true };

let global = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTEXT:
      return Object.assign({}, state, { ctx: action.ctx });
    case DEBUG_MODE:
      return Object.assign({}, state, { debug: !state.debug });
    default:
      return state;
  }
};

export default global