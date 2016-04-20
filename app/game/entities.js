import {getRandomInt} from '../utils/getRandomInt';
import * as entityType from './entityTypes';
import * as entityTags from './entityTags';
import * as entityStates from './entityStates';
import * as names from 'random-name';

let lastId = 0;

function getNextId() {
  return ++lastId;
}

let globalEntityList = {};

let createStaticEntity = (x, y, type, tags = [], subType = 0) => {
  return {
    id: getNextId(),
    pos: [x, y],
    type,
    tags,
    subType,
  };
};

let createDynamicEntity = (x, y, type, tags = [], subType = 0) => {
  let e = createStaticEntity(x, y, type, tags, subType);
  e.state = entityStates.IDLE;
  return e;
};


export function getDynamicEntityList() {
  return globalEntityList;
}

export function resetDynamicEntityList() {
  globalEntityList = {};
}

function addEntityToGlobalList(entity) {
  globalEntityList[entity.id] = entity;
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
  e.state = entityStates.IDLE;
  e.name =  names.first() + ' ' + names.last();
  console.log('colonist id', e.id);
  addEntityToGlobalList(e);
  return e;
};

export let createTree = (x, y) => {
  let e = createDynamicEntity(x, y, entityType.TREE, [entityTags.IMPASSABLE, entityTags.CUTTABLE], getRandomInt(0, 3));
  e.name =  'Tree';
  addEntityToGlobalList(e);
  return e;
};

export let createStone = (x, y) => {
  let e = createDynamicEntity(x, y, entityType.STONE, [entityTags.IMPASSABLE, entityTags.MINEABLE], getRandomInt(0, 12));
  e.name = 'Stone';
  addEntityToGlobalList(e);
  return e;
};
