import * as types from '../actions/actionTypes'
import {createMap} from '../game/createMap';
import {List} from 'immutable';
import { createColonist} from '../game/entities';
const initialState = {
  map: null,
  width: 0,
  height: 0,
  entities: null,
  paused: true

};

function addEntityToTile(map, entity, tileX, tileY) {
  let coord = List([tileX, tileY]);
  let tile = map.get(coord);
  let entities = tile.get('entities');
  entities = entities.push(entity);
  tile = tile.set('entities', entities);
  map = map.set(coord, tile);
  return map;
}


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