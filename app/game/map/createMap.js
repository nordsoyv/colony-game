import { Map, List } from 'immutable';
import * as entities from '../entities';
import {getRandomInt} from '../../utils/getRandomInt';
import {addEntityToTile} from'./mapUtils';

function createTile(i, j) {
  let tile = new Map({ entities: new List() });

  let type = getRandomInt(0, 10);
  switch (type) {
    case 0:
      tile = tile.set('base', entities.createStoneTile(i, j));
      if (getRandomInt(0, 10) < 8) {
        tile = tile.set('entities', tile.get('entities').push(entities.createStone(i, j).get('id')))
      }
      break;
    case 1:
    case 2:
      tile = tile.set('base', entities.createDirtTile(i, j));
      tile = tile.set('entities', new List());
      break;
    default:
      tile = tile.set('base', entities.createGrassTile(i, j));
      if (getRandomInt(0, 10) == 0) {
        tile = tile.set('entities', tile.get('entities').push(entities.createTree(i, j).get('id')))
      }
      break;
  }
  return tile;
}


export function createMap(width, height) {
  entities.resetDynamicEntityList();

  let map = new Map();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let coord = List([i, j]);
      map = map.set(coord, createTile(i, j));
    }
  }

  let colonist = entities.createColonist(5, 5);

  map = addEntityToTile(map, colonist, new List([5,5]));
  return { map, entities: entities.getDynamicEntityList() };
}