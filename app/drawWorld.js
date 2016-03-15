const tileSize = 20;


function drawGrass(ctx, xPos, yPos){
  ctx.fillStyle = "rgb(65,128,43)";
  ctx.fillRect(xPos*tileSize, yPos*tileSize, tileSize-1, tileSize-1);
}

function drawStone(ctx, xPos, yPos){
  ctx.fillStyle = "rgb(20,20,20)";
  ctx.fillRect(xPos*tileSize, yPos*tileSize, tileSize-1, tileSize-1);
}

function drawDirt(ctx, xPos, yPos){
  ctx.fillStyle = "rgb(143,88,70)";
  ctx.fillRect(xPos*tileSize, yPos*tileSize, tileSize-1, tileSize-1);
}

let tileDrawer = {
  'grass' : drawGrass,
  'stone' : drawStone,
  'dirt': drawDirt
};

export function drawWorld(state){
  let ctx = state.globals.ctx;
  let map = state.map;
  for(let x = 0; x< map.width(); x++){
    for(let y=0; y < map.height(); y++){
      let tile = map.get(x,y);
      tileDrawer[tile.base.getType()](ctx, x, y);
    }
  }
}
