let createEntity = (x, y, type, tags = []) => {
  return {
    pos: [x, y],
    type,
    tags
  };
};

const IMPASSABLE = 'IMPASSABLE';

export let createColonist = (x, y) => {
  return createEntity(x, y, 'human');
};

export let createTree = (x, y) => {
  return createEntity(x, y, 'tree', [IMPASSABLE]);
};

export let createStone = (x, y) => {
  return createEntity(x, y, 'stone', [IMPASSABLE]);
};
