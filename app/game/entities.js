let createEntity = (x, y, type, tags) => {
  return {
    pos: [x, y],
    type,
    tags
  };
};


export let createColonist = (x, y) => {
  return createEntity(x, y, 'human', []);
};

export let createTree = (x, y) => {
  return createEntity(x, y, 'tree', []);
};
