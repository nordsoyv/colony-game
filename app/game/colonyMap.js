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

export class ColonyMap {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._map = new Map();

    for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
        let coord = List([i, j]);
        this._map = this._map.set(coord, Map( {base: createTile() }));
      }
    }
  }

  get(x, y) {
    return this._map.get(List([x, y]));
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }
}
