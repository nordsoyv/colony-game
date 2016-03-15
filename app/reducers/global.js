import {SAVE_CONTEXT} from '../actions/actionTypes'

const initialState = { ctx: null };

let global = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONTEXT:
      return Object.assign({}, state, { ctx: action.ctx });
    default:
      return state;
  }
};

export default global