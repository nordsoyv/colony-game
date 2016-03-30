require("babel-polyfill");

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import {drawWorld, drawMouse} from './drawWorld';
import {simulateWorld} from './game/simulateWorld';
import {setupKeyBindings}from'./setupKeyBindings';
import {createMap} from './game/createMap';
import {setWorld} from './actions/index';
import {selectEntities} from './game/mapUtils';
import {getTool} from './game/tools';
import './app.global.css';

const store = configureStore();
setupKeyBindings(store.dispatch);

store.dispatch({type: 'INIT_SIMULATION'});

let world = createMap(100, 100);
store.dispatch(setWorld(world.map, world.entities));


render(
  <Root store={store}/>,
  document.getElementById('root')
);


function doInputHandling() {
  let state = store.getState();
  if (state.input.dragEvent) {
    let tool = getTool(state.input.selectedTool);
    let xStart = state.input.mouseStartDragXPos;
    let yStart = state.input.mouseStartDragYPos;
    let xEnd = state.input.mouseXPos;
    let yEnd = state.input.mouseYPos;
    let width = xEnd - xStart;
    let height = yEnd - yStart;

    //make sure start point is the smallest coordinate
    if(xStart > xEnd) {
      xStart = xEnd;
    }
    if(yStart < yEnd){
      yStart = yEnd
    }

    width = width > 0 ? width : width * -1;
    height = height > 0 ? height : height * -1;
    width = Math.ceil(width / 16);
    height = Math.ceil(height / 16);
    let startXTile = Math.floor(xStart / 16);
    let startYTile = Math.floor((512 - yStart) / 16);
    
    let selected = selectEntities(state.world.map, tool.affectTag, startXTile,startYTile,width, height);

    console.log(selected);

    store.dispatch({type: 'MOUSE_DRAG_DONE'});
  }
}

function renderWorld() {
  drawWorld(store.getState());
}

setInterval(renderWorld, 100);

function doSimulationStep() {
  simulateWorld(store.getState, store.dispatch);
}

setInterval(doSimulationStep, 1000);

function renderMouse() {
  doInputHandling();
  drawMouse(store.getState());
  requestAnimationFrame(renderMouse);
}

requestAnimationFrame(renderMouse);