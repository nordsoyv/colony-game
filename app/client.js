require("babel-polyfill");

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import {drawWorld} from './drawWorld';
import {simulateWorld} from './game/simulateWorld';
import {setupKeyBindings}from'./setupKeyBindings';
import {createMap} from './game/createMap';
import {setWorld} from './actions';
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
    let xStart = state.input.mouseStartDragXPos;
    let yStart = state.input.mouseStartDragYPos;
    let xEnd = state.input.mouseXPos;
    let yEnd = state.input.mouseYPos;
    let width = xEnd - xStart;
    let height = yEnd - yStart;
    width = width > 0 ? width : width * -1;
    height = height > 0 ? height : height * -1;
    width = Math.ceil(width / 16);
    height = Math.ceil(height / 16);
    let startXTile = Math.floor(xStart / 16);
    let startYTile = Math.floor((512 - yStart) / 16);
    store.dispatch({type: 'MOUSE_DRAG_DONE'});
  }
}

function step() {
  doInputHandling();
  drawWorld(store.getState());
  requestAnimationFrame(step);
}

requestAnimationFrame(step);

function doSimulationStep() {
  simulateWorld(store.getState, store.dispatch);
}

setInterval(doSimulationStep, 1000);