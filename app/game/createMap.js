import { Map, List } from 'immutable';

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createTile() {
  let type = getRandomInt(0, 10);
  switch (type) {
    case 0:
      return new StoneTile();
    case 1:
    case 2:
      return new DirtTile();
    default:
      return new GrassTile()
  }
}


export function createMap(width, height) {
  let map = new Map();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let coord = List([i, j]);
      map = map.set(coord, Map({ base: createTile(), entities: new List() }));
    }
  }
  return map;
}