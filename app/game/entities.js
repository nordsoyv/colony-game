import {getRandomInt} from '../utils/getRandomInt';
import {fromJS, Map} from 'immutable';
import * as entityType from './entityTypes';
import * as entityTags from './entityTags';
import uuid from 'uuid';
import * as names from 'random-name';

let lastId = 0;

function getNextId(){
 return ++lastId;
}

let globalEntityList = new Map();

let createStaticEntity = (x, y, type, tags = [], subType = 0) => {
  let e = {
    id: getNextId(),
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


export function getDynamicEntityList() {
  return globalEntityList;
}

export function resetDynamicEntityList() {
  globalEntityList = new Map();
}

function addEntityToGlobalList(entity) {
  globalEntityList = globalEntityList.set(entity.get('id'), entity);
}

export let createDirtTile = (x, y)=> {
  return createStaticEntity(x, y, entityType.DIRT_TILE);
};


export let createStoneTile = (x, y)=> {
  return createStaticEntity(x, y, entityType.STONE_TILE);
};


export let createGrassTile = (x, y)=> {
  return createStaticEntity(x, y, entityType.GRASS_TILE);
};

export let createColonist = (x, y) => {
  let e = createDynamicEntity(x, y, entityType.HUMAN, [entityTags.COMMANDABLE]);
  e = e.set('state', 'moving');
  e = e.set('path', fromJS([[6, 5], [7, 5], [8, 5]]));
  e = e.set('name', names.first() + ' ' + names.last());
  console.log('colonist id', e.get('id'));
  addEntityToGlobalList(e);
  return e;
};

export let createTree = (x, y) => {
  let e = createDynamicEntity(x, y, entityType.TREE, [entityTags.IMPASSABLE, entityTags.CUTTABLE], getRandomInt(0, 3));
  e = e.set('name', 'Tree');
  addEntityToGlobalList(e);
  return e;
};

export let createStone = (x, y) => {
  let e = createDynamicEntity(x, y, entityType.STONE, [entityTags.IMPASSABLE, entityTags.MINEABLE], getRandomInt(0, 12));
  e = e.set('name', 'Stone');
  addEntityToGlobalList(e);
  return e;
};
