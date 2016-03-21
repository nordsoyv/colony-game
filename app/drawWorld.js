const tileSize = 16;
let terrainTiles;

function loadImages() {
  terrainTiles = document.getElementById('terrain');
  console.log(terrainTiles);
  if (!terrainTiles) {
    setTimeout(loadImages, 5);
  }
}

loadImages();

let viewPortWidth = 500;
let viewPortHeight = 500;


function drawGrass(ctx, xPos, yPos) {
  ctx.drawImage(terrainTiles, 5 * 16, 3 * 16, 16, 16, xPos, yPos, 16, 16);
}

function drawStone(ctx, xPos, yPos) {
  ctx.drawImage(terrainTiles, 5 * 16, 8 * 16, 16, 16, xPos, yPos, 16, 16);
}

function drawDirt(ctx, xPos, yPos) {
  ctx.drawImage(terrainTiles, 5 * 16, 11 * 16, 16, 16, xPos, yPos, 16, 16);
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
      tileDrawer[tile.base.getType()](ctx, x * tileSize, y * tileSize);
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

    ctx.fillStyle = "rgb(240,240,240)";
    ctx.textBaseline = 'center';
    ctx.textAlign = 'center';
    ctx.fillText('@', (screenX * tileSize) + (tileSize / 2), (screenY * tileSize) + (tileSize / 2))

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
  drawEntities(state, ctx);
  drawMouse(state, ctx);
  //console.log('rendering');


}
