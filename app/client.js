require("babel-polyfill");

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import {drawWorld, drawMouse} from './drawWorld';
import {simulateWorld} from './game/simulateWorld';
import {setupKeyBindings}from'./setupKeyBindings';
import {createMap} from './game/map/createMap';
import {setWorld} from './actions/index';
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

function renderWorld() {
  drawWorld(store.getState());
}

function renderMouse() {
  drawMouse(store.getState());
  requestAnimationFrame(renderMouse);
}

function doSimulationStep() {
  simulateWorld(store);
}

setInterval(renderWorld, 500);
setInterval(doSimulationStep, 500);
requestAnimationFrame(renderMouse);