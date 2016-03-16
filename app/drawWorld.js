const tileSize = 20;

let viewPortWidth = 500;
let viewPortHeigth = 500;

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

export function drawWorld(state) {
  let ctx = state.globals.ctx;

  ctx.clearRect(0, 0, 500, 500);

  let map = state.map;
  let tileStartX = state.view.viewX;
  let tileStartY = state.view.viewY;
  for (let x = 0; x * tileSize < viewPortWidth; x++) {
    for (let y = 0; y * tileSize < viewPortHeigth; y++) {
      let xTile = tileStartX + x;
      let yTile = tileStartY + y;
      let tile = map.get(xTile, yTile);
      tileDrawer[tile.base.getType()](ctx, x * tileSize, y * tileSize);
    }
  }
  //console.log('rendering');
}
