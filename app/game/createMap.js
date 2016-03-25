import { Map, List } from 'immutable';
import {createTree, createStone} from './entities';
import {getRandomInt} from '../utils/getRandomInt';

class BaseTile {
  getType() {
    return 'unknown';
  }
}

class GrassTile extends BaseTile {
  getType() {
    return 'grass';
  }
}

class StoneTile extends BaseTile {
  getType() {
    return 'stone';
  }
}

class DirtTile extends BaseTile {
  getType() {
    return 'dirt';
  }
}

function createTile(i,j) {
  let tile = new Map({ entities: new List()});

  let type = getRandomInt(0, 10);
  switch (type) {
    case 0:
      tile = tile.set('base', new StoneTile());
      if(getRandomInt(0,10) < 8 ){
        tile = tile.set('entities', tile.get('entities').push(createStone(i,j)) )
      }
      break;
      break;
    case 1:
    case 2:
      tile = tile.set('base', new DirtTile());
      break;
    default:
      tile = tile.set('base', new GrassTile());
      if(getRandomInt(0,10) == 0 ){
        tile = tile.set('entities', tile.get('entities').push(createTree(i,j)) )
      }
      break;
  }
  return tile;
}


export function createMap(width, height) {
  let map = new Map();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let coord = List([i, j]);
      map = map.set(coord, createTile(i,j));
    }
  }
  return map;
}