import {getRandomInt} from '../utils/getRandomInt';

let globalEntityList = [];

let createStaticEntity = (x, y, type, tags = [], subType = 0) => {
  let e = {
    pos: [x, y],
    type,
    tags,
    subType,
  };
  return e;
};

let createDynamicEntity = (x, y, type, tags = [], subType = 0) => {
  let e = createStaticEntity(x, y, type, tags, subType);
  e.status = 'idle';
  globalEntityList.push(e);
  return e;
};

const IMPASSABLE = 'IMPASSABLE';

export function getDynamicEntityList() {
  return globalEntityList;
}

export function resetDynamicEntityList() {
  globalEntityList = [];
}

export let createDirtTile = (x, y)=> {
  return createStaticEntity(x, y, 'dirt-tile');
};


export let createStoneTile = (x, y)=> {
  return createStaticEntity(x, y, 'stone-tile');
};


export let createGrassTile = (x, y)=> {
  return createStaticEntity(x, y, 'grass-tile');
};

export let createColonist = (x, y) => {
  let e = createDynamicEntity(x, y, 'human');
  e.state = 'moving';
  e.path = [[6, 5], [7, 5], [8, 5]];
  return e;
};

export let createTree = (x, y) => {
  return createDynamicEntity(x, y, 'tree', [IMPASSABLE], getRandomInt(0, 3));
};

export let createStone = (x, y) => {
  return createDynamicEntity(x, y, 'stone', [IMPASSABLE], getRandomInt(0, 12));
};
