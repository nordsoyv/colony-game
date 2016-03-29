
export function addEntityToTile(map, entity, pos) {
  let tile = map.get(pos);
  let entities = tile.get('entities');
  entities = entities.push(entity);
  tile = tile.set('entities', entities);
  map = map.set(pos, tile);
  return map;
}

export function removeEntityFromTile(map, entity, pos){
  let tile = map.get(pos);
  let entities = tile.get('entities').filter(e => e.id != entity.id  );
  tile = tile.set('entities', entities);
  map = map.set(pos, tile);
  return map;
}