import {getRandomInt} from '../utils/getRandomInt';

let createEntity = (x, y, type, tags = [], subType = 0) => {
  return {
    pos: [x, y],
    type,
    tags,
    subType
  };
};

const IMPASSABLE = 'IMPASSABLE';


export let createColonist = (x, y) => {
  return createEntity(x, y, 'human');
};

export let createTree = (x, y) => {
  return createEntity(x, y, 'tree', [IMPASSABLE], getRandomInt(0,3));
};


export let createStone = (x, y) => {
  return createEntity(x, y, 'stone', [IMPASSABLE], getRandomInt(0, 12));
};
