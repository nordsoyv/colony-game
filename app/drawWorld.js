const tileSize = 16;
let terrainTiles;
let humanTiles;

function loadImages() {
  terrainTiles = document.getElementById('terrain');
  humanTiles = document.getElementById('humans');
  if (!(terrainTiles && humanTiles)) {
    setTimeout(loadImages, 5);
  }
}

loadImages();

let viewPortWidth = 500;
let viewPortHeight = 500;

function drawTerrain(ctx, tileX, tileY, destX, destY) {
  ctx.drawImage(
    terrainTiles,
    tileX * tileSize,
    tileY * tileSize,
    tileSize,
    tileSize,
    destX * tileSize,
    destY * tileSize,
    tileSize,
    tileSize);
}

function drawHuman(ctx, tileX, tileY, destX, destY) {
  ctx.drawImage(
    humanTiles,
    tileX * tileSize,
    tileY * tileSize,
    tileSize,
    tileSize,
    destX * tileSize,
    destY * tileSize,
    tileSize,
    tileSize);
}

function drawGrass(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 3, xPos, yPos);
}

function drawStone(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 8, xPos, yPos);
}

function drawDirt(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 11, xPos, yPos);
}

let tileDrawer = {
  'grass': drawGrass,
  'stone': drawStone,
  'dirt': drawDirt
};

function drawMap(state, ctx) {
  let map = state.map;
  let tileStartX = state.input.viewX;
  let tileStartY = state.input.viewY;
  for (let x = 0; x * tileSize < viewPortWidth; x++) {
    for (let y = 0; y * tileSize < viewPortHeight; y++) {
      let xTile = tileStartX + x;
      let yTile = tileStartY + y;
      let tile = map.get(xTile, yTile);
      tileDrawer[tile.get('base').getType()](ctx, x, y);
    }
  }
}

function drawMouse(state, ctx) {
  if (state.input.mouseLeftButton) {
    ctx.translate(0.5, 0.5);
    ctx.strokeStyle = "rgb(255,255,255)";
    let width = state.input.mouseXPos - state.input.mouseStartDragXPos;
    let height = state.input.mouseYPos - state.input.mouseStartDragYPos;
    ctx.strokeRect(state.input.mouseStartDragXPos, state.input.mouseStartDragYPos, width, height);
    ctx.translate(-0.5, -0.5);
  }
}

function drawEntities(state, ctx) {
  let colonists = state.simulation.colonists;
  colonists.forEach(colonist => {
    let pos = colonist.getPos();
    let screenX = pos.x - state.input.viewX;
    let screenY = pos.y - state.input.viewY;
    drawHuman(ctx, 1,0, screenX, screenY);
  })
}

export function drawWorld(state) {
  let canvas = document.getElementById('mainWindow');
  viewPortHeight = canvas.height - 1;
  viewPortWidth = canvas.width - 1;
  let ctx = state.globals.ctx;
  ctx.clearRect(0, 0, viewPortWidth, viewPortHeight);
  if (terrainTiles) {
    drawMap(state, ctx);
  }
  if(humanTiles){
    drawEntities(state, ctx);
  }
  drawMouse(state, ctx);


}
