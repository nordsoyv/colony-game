const tileSize = 20;

let viewPortWidth = 500;
let viewPortHeight = 500;

function drawGrass(ctx, xPos, yPos) {
  ctx.fillStyle = "rgb(65,128,43)";
  ctx.fillRect(xPos, yPos, tileSize - 1, tileSize - 1);
}

function drawStone(ctx, xPos, yPos) {
  ctx.fillStyle = "rgb(20,20,20)";
  ctx.fillRect(xPos, yPos, tileSize - 1, tileSize - 1);
}

function drawDirt(ctx, xPos, yPos) {
  ctx.fillStyle = "rgb(143,88,70)";
  ctx.fillRect(xPos, yPos, tileSize - 1, tileSize - 1);
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

function drawMouse(state, ctx){
  if(state.input.mouseLeftButton){
    ctx.translate(0.5,0.5);
    ctx.strokeStyle = "rgb(255,255,255)";
    let width = state.input.mouseXPos - state.input.mouseStartDragXPos;
    let height = state.input.mouseYPos - state.input.mouseStartDragYPos;
    ctx.strokeRect(state.input.mouseStartDragXPos, state.input.mouseStartDragYPos, width, height);
    ctx.translate(-0.5,-0.5);
  }
}

function drawEntities(state, ctx) {
  let colonists = state.simulation.colonists;
  colonists.forEach(colonist => {
    let pos = colonist.getPos();
    let screenX = pos.x - state.input.viewX;
    let screenY = pos.y - state.input.viewY;

    ctx.fillStyle = "rgb(240,240,240)";
    ctx.fillText('@', screenX * tileSize, screenY*tileSize)

  })
}
export function drawWorld(state) {
  let canvas = document.getElementById('mainWindow');
  viewPortHeight = canvas.height-1;
  viewPortWidth = canvas.width-1;
  let ctx = state.globals.ctx;
  ctx.clearRect(0, 0, viewPortWidth, viewPortHeight);
  drawMap(state, ctx);
  drawEntities(state, ctx);
  drawMouse(state, ctx);
  //console.log('rendering');
}
