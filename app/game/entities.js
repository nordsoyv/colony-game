import {getRandomInt} from '../utils/getRandomInt';
import {fromJS, List} from 'immutable';
import uuid from 'uuid';

let globalEntityList = new List();

let createStaticEntity = (x, y, type, tags = [], subType = 0) => {
  let e = {
    id: uuid.v4(),
    pos: [x, y],
    type,
    tags,
    subType,
  };
  return fromJS(e);
};

let createDynamicEntity = (x, y, type, tags = [], subType = 0) => {
  let e = createStaticEntity(x, y, type, tags, subType);
  e = e.set('state', 'idle');

  return e;
};

const IMPASSABLE = 'IMPASSABLE';

export function getDynamicEntityList() {
  return globalEntityList;
}

export function resetDynamicEntityList() {
  globalEntityList = new List();
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
  e = e.set('state', 'moving');
  e = e.set('path' , fromJS([[6, 5], [7, 5], [8, 5]]));
  globalEntityList = globalEntityList.push(e);
  return e;
};

export let createTree = (x, y) => {
  let e = createDynamicEntity(x, y, 'tree', [IMPASSABLE], getRandomInt(0, 3));
  globalEntityList = globalEntityList.push(e);
  return e;
};

export let createStone = (x, y) => {
  let e =  createDynamicEntity(x, y, 'stone', [IMPASSABLE], getRandomInt(0, 12));
  globalEntityList = globalEntityList.push(e);
  return e;
};
