import { Map, List } from 'immutable';

export function addEntityToTile(map, entity, tileX, tileY) {
  let coord = List([tileX, tileY]);
  let tile = map.get(coord);
  let entities = tile.get('entities');
  entities = entities.push(entity);
  tile = tile.set('entities', entities);
  map = map.set(coord, tile);
  return map;
}

export function removeEntityFromTile(map, entity, tileX, tileY){
  debugger;
  let coord = List([tileX, tileY]);
  let tile = map.get(coord);
  let entities = tile.get('entities').filter(e => e.id != entity.id  );
  console.log(entities);
  tile = tile.set('entities', entities);
  map = map.set(coord, tile);
  return map;
}