import {List} from 'immutable';

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

export function selectEntities(map, tag, startX, startY, width, height) {
  let selectedEntities = new List();

  for(let x = startX; x <= startX + width; x++){
    for(let y = startY; y <= startY + height; y++){
      let coord = new List([x,y]);
      let tile = map.get(coord);
      let entities = tile.get('entities');
      entities.forEach(entity => {
        if(entity.get('tags').filter(t => t == tag).count() > 0  ){
          selectedEntities = selectedEntities.push(entity);
        }
      })
    }
  }

  return selectedEntities;
}