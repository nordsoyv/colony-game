import {addEntityToTile, removeEntityFromTile} from './map/mapUtils';
import * as entityTypes from './entityTypes';
import * as entityState from './entityStates';

function doHumanStep(entity, map) {
  if (entity.state == entityState.MOVING) {
    let path = entity.path;
    if (path.length == 0) {
      entity.state = entityState.IDLE;
    } else {
      removeEntityFromTile(map, entity, entity.pos[0], entity.pos[1]);
      let nextPos = entity.path.shift();
      entity.pos = nextPos;
      addEntityToTile(map, entity, nextPos[0], nextPos[1]);
    }
  }
}

export function simulateWorld(store) {
  let state = store.getState();
  if (state.world.paused) {
    return;
  }

  let map = state.world.map;
  let entities = state.world.entities;
  Object.keys(entities).forEach(entityId => {
    let entity = entities[entityId];
    if (entity.type == entityTypes.HUMAN) {
      doHumanStep(entity, map);
    }
  });
}

