import * as entityTypes from './game/entityTypes';
import {createCoords} from './game/map/mapUtils';

const tileSize = 16;
let terrainTiles;
let humanTiles;
let itemTiles;
let imagesLoaded = false;
let debug = false;
let debugPaths = [];

function loadImages() {
  terrainTiles = document.getElementById('terrain');
  humanTiles = document.getElementById('humans');
  itemTiles = document.getElementById('items');
  if (terrainTiles && humanTiles && itemTiles) {
    imagesLoaded = true;
  }
  if (!imagesLoaded) {
    setTimeout(loadImages, 5);
  }
}

loadImages();

let viewPortWidth = 512;
let viewPortHeight = 512;

function drawSprite(ctx, image, tileX, tileY, destX, destY) {
  ctx.drawImage(
    image,
    tileX * tileSize,
    tileY * tileSize,
    tileSize,
    tileSize,
    destX * tileSize,
    viewPortHeight - 16 - (destY * tileSize),
    tileSize,
    tileSize);
}

function drawTerrain(ctx, tileX, tileY, destX, destY) {
  drawSprite(ctx, terrainTiles, tileX, tileY, destX, destY);
}

function drawHumanTile(ctx, tileX, tileY, destX, destY) {
  drawSprite(ctx, humanTiles, tileX, tileY, destX, destY);
}

function drawItemTile(ctx, tileX, tileY, destX, destY) {
  drawSprite(ctx, itemTiles, tileX, tileY, destX, destY);
}

function drawHuman(ctx, destX, destY) {
  drawHumanTile(ctx, 1, 0, destX, destY);
}

function drawGrassTile(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 3, xPos, yPos);
}

function drawTree(ctx, xPos, yPos, subType) {
  drawTerrain(ctx, 11 + subType, 12, xPos, yPos);
}

function drawStoneTile(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 8, xPos, yPos);
}

function drawDirtTile(ctx, xPos, yPos) {
  drawTerrain(ctx, 5, 11, xPos, yPos);
}

function drawStone(ctx, xPos, yPos, subType) {
  drawItemTile(ctx, 36 + subType, 5, xPos, yPos);
}

let entityDrawer = {
  [entityTypes.HUMAN]: drawHuman,
  [entityTypes.TREE]: drawTree,
  [entityTypes.STONE]: drawStone,
  [entityTypes.GRASS_TILE]: drawGrassTile,
  [entityTypes.STONE_TILE]: drawStoneTile,
  [entityTypes.DIRT_TILE]: drawDirtTile
};

function drawMap(state, ctx) {
  let map = state.world.map;
  let tileStartX = state.input.viewX;
  let tileStartY = state.input.viewY;
  for (let x = 0; x * tileSize < viewPortWidth; x++) {
    for (let y = 0; y * tileSize < viewPortHeight; y++) {
      let xTile = tileStartX + x;
      let yTile = tileStartY + y;
      let tile = map[createCoords(xTile, yTile)];
      if (tile) {
        entityDrawer[tile.base.type](ctx, x, y, tile.subType);
        tile.entities.forEach(entity => {
          if (debug) {
            if (entity.path) {
              debugPaths.push(entity.path);
            }
          }
          entityDrawer[entity.type](ctx, x, y, entity.subType);
        });
      }
    }
  }
}

export function drawMouse(state) {
  let canvas = document.getElementById('mouseWindow');
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.height, canvas.width);

  if (state.input.isDragging) {
    ctx.translate(0.5, 0.5);
    ctx.strokeStyle = "rgb(255,255,255)";
    let width = state.input.mouseXPos - state.input.mouseStartDragXPos;
    let height = state.input.mouseYPos - state.input.mouseStartDragYPos;
    ctx.strokeRect(state.input.mouseStartDragXPos, state.input.mouseStartDragYPos, width, height);
    ctx.translate(-0.5, -0.5);
  }
}

function drawPaused(state, ctx) {
  if (state.world.paused) {
    ctx.fillStyle = 'white';
    ctx.font = "48px serif";
    ctx.fillText('PAUSED', 200, 200);
  }
}

function drawPaths(ctx) {
  debugPaths.forEach(path => {
    if (path.length < 2) {
      // dont draw short paths
      return;
    }

    ctx.translate(0.5, 0.5);
    ctx.strokeStyle = "rgb(255,45,27)";
    ctx.beginPath();

    let first = path[0];

    let xPos = (first[0] * 16) - 8;
    let yPos =  viewPortHeight - (first[1] * 16) + 8;
    ctx.moveTo(xPos,yPos);

    for (let i = 1; i < path.length ; i++) {
      let node = path[i];
      let xPos = (node[0] * 16) - 8;
      let yPos =  viewPortHeight - (node[1] * 16) + 8;
      ctx.lineTo(xPos,yPos);
    }

    ctx.stroke();
    ctx.translate(-0.5, -0.5);
  })
}


export function drawWorld(state) {
  let canvas = document.getElementById('mainWindow');
  viewPortHeight = canvas.height;
  viewPortWidth = canvas.width;
  let ctx = state.globals.ctx;
  debug = state.globals.debug;
  if (debug) {
    debugPaths = [];
  }
  ctx.clearRect(0, 0, viewPortWidth, viewPortHeight);
  if (imagesLoaded) {
    drawMap(state, ctx);
  }

  if (debug) {
    drawPaths(ctx);
  }
  drawPaused(state, ctx);


}
