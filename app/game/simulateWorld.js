import {getDynamicEntityList} from'./entities';
import {addEntityToTile,removeEntityFromTile} from './mapUtils';
import { Map, List } from 'immutable';
import {setWorld} from '../actions';

function doHumanStep(entity, map) {
  if (entity.state == 'moving') {
    if (!entity.path || entity.path.length == 0) {
      entity.state = 'idle';
    } else {

      let currPos = entity.pos;
      console.log(currPos);
      let nextPos = entity.path.shift();
      entity.pos = nextPos;
      map = removeEntityFromTile(map, entity, currPos[0], currPos[1]);
      map = addEntityToTile(map, entity, nextPos[0], nextPos[1]);
    }
  }
  return { entity, map };
}

export function simulateWorld(getState, dispatch) {
  let state = getState();
  if (state.world.paused) {
    return;
  }

  let map = state.world.map;
  let entities = state.world.entities;
  entities.forEach((entity, index) => {
    if (entity.type == 'human') {
      let ret = doHumanStep(entity, map);
      map = ret.map;
      entities[index] = ret.entity;
    }
  });

  dispatch(setWorld(map, entities));

}

