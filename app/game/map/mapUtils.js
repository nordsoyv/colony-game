import {List} from 'immutable';

export function addEntityToTile(map, entity, pos) {
  let tile = map.get(pos);
  tile = tile.set('entities', tile.get('entities').push(entity.get('id')));
  map = map.set(pos, tile);
  return map;
}

export function removeEntityFromTile(map, entity, pos) {
  let tile = map.get(pos);
  let entities = tile.get('entities').filter(id => id != entity.get('id'));
  tile = tile.set('entities', entities);
  map = map.set(pos, tile);
  return map;
}

export function selectEntities(map, globalEntities, tag, startX, startY, width, height) {
  let selectedEntities = new List();
  for (let x = startX; x <= startX + width; x++) {
    for (let y = startY; y <= startY + height; y++) {
      let coord = new List([x, y]);
      let tile = map.get(coord);
      let entityIds = tile.get('entities', List());
      entityIds.forEach(entityId => {
        let entity = globalEntities.get(entityId);
        if (entity.get('tags').filter(t => t == tag).count() > 0) {
          selectedEntities = selectedEntities.push(entity.get('id'));
        }
      });
    }
  }

  return selectedEntities;
}