import * as types from '../actions/actionTypes'
import { List } from 'immutable';

const initialState = {
  map: null,
  width: 0,
  height: 0,
  entities: null,
  paused: true,
  selectedEntities: List()

};

let world = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_WORLD:
      return Object.assign({}, state, { map: action.map, entities: action.dynamicEntities, width: action.width, height: action.height });
    case types.PAUSE_SIMULATION:
      return Object.assign({}, state, { paused : !state.paused } );
    case types.SET_SELECTED_ENTITIES:
      return Object.assign({}, state, {selectedEntities: action.entities});
    default:
      return state;
  }
};

export default world