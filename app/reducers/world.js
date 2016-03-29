import * as types from '../actions/actionTypes'

const initialState = {
  map: null,
  width: 0,
  height: 0,
  entities: null,
  paused: true

};

let world = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_WORLD:
      return Object.assign({}, state, { map: action.map, entities: action.dynamicEntities, width: action.width, height: action.height });
    case types.PAUSE_SIMULATION:
      return Object.assign({}, state, { paused : !state.paused } );
    default:
      return state;
  }
};

export default world