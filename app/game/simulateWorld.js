import {addEntityToTile,removeEntityFromTile} from './map/mapUtils';
import { List } from 'immutable';
import {setWorld} from '../actions';
import * as entityTypes from './entityTypes';

function doHumanStep(entity, map) {
  if (entity.get('state') == 'moving') {
    let path = entity.get('path', new List());
    if (path.count() == 0) {
      entity = entity.set('state', 'idle');
    } else {
      let currPos = entity.get('pos');
      let nextPos = path.first();
      map = removeEntityFromTile(map, entity, currPos);
      entity = entity.set('pos', nextPos);
      entity = entity.set('path', path.shift());
      map = addEntityToTile(map, entity, nextPos, nextPos);
    }
  }
  return { entity, map };
}

export function simulateWorld(store) {
  let state = store.getState();
  if (state.world.paused) {
    return;
  }

  let map = state.world.map;
  let entities = state.world.entities;
  entities.forEach((entity, index) => {
    if (entity.get('type') == entityTypes.HUMAN) {
      let ret = doHumanStep(entity, map);
      map = ret.map;
      entities = entities.set(index, ret.entity);
    }
  });

  store.dispatch(setWorld(map, entities));

}

