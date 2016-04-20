import * as entityFactory from '../entities';
import {getRandomInt} from '../../utils/getRandomInt';
import {addEntityToTile, createCoords} from'./mapUtils';


function createTile(i, j) {
  let tile = { entities: [] };

  let type = getRandomInt(0, 10);
  switch (type) {
    case 0:
      tile.base = entityFactory.createStoneTile(i, j);
      if (getRandomInt(0, 10) < 8) {
        tile.entities.push(entityFactory.createStone(i, j))
      }
      break;
    case 1:
    case 2:
      tile.base = entityFactory.createDirtTile(i, j);
      break;
    default:
      tile.base = entityFactory.createGrassTile(i, j);
      if (getRandomInt(0, 10) == 0) {
        tile.entities.push(entityFactory.createTree(i, j))
      }
      break;
  }
  return tile;
}


export function createMap(width, height) {
  entityFactory.resetDynamicEntityList();

  let map = {};
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let coord = createCoords(i, j);
      map[coord] = createTile(i, j);
    }
  }

  let colonist = entityFactory.createColonist(1, 1);

  addEntityToTile(map, colonist, 1, 1);
  return { map, entities: entityFactory.getDynamicEntityList() };
}