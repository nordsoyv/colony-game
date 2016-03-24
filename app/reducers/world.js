import * as types from '../actions/actionTypes'
import {createMap} from '../game/createMap';
import {List} from 'immutable';
import { createColonist} from '../game/entities';
const initialState = {
  map: null,
  width: 0,
  height: 0,
  entities: null

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
    case types.CREATE_MAP:
      let map = createMap(100, 100);
      let colonist = createColonist(5,5);
      map = addEntityToTile(map,colonist,5,5);
      return Object.assign({}, state, { map: map, width: 100, height: 100 });
    default:
      return state;
  }
};

export default world