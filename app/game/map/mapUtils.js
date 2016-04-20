export function addEntityToTile(map, entity, xPos, yPos) {
  try{
    let coord = createCoords(xPos,yPos);
    map[coord].entities.push(entity);
  } catch(e){
    console.log(entity);
    console.log(xPos);
    console.log(yPos);
   console.trace();
  }

}

export function removeEntityFromTile(map, entityToRemove, xPos, yPos) {
  let coord = createCoords(xPos,yPos);
  let tile = map[coord];
  tile.entities = tile.entities.filter(entity => entity.id != entityToRemove.id);
}

export function selectEntities(map, tag, startX, startY, width, height) {
  let selectedEntities = [];
  for (let x = startX; x <= startX + width; x++) {
    for (let y = startY; y <= startY + height; y++) {
      let coord = createCoords(x,y);
      let tile = map[coord];
      tile.entities.forEach(entity => {
        if (entity.tags.filter(t => t == tag).length > 0) {
          selectedEntities.push(entity);
        }
      });
    }
  }

  return selectedEntities;
}

export function createCoords(x,y){
  return x + "_" + y;
}