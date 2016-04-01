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
import {doInputHandling} from './inputHandling';
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

setInterval(renderWorld, 100);

function doSimulationStep() {
  simulateWorld(store.getState, store.dispatch);
}

setInterval(doSimulationStep, 1000);

function renderMouse() {
  doInputHandling(store);
  drawMouse(store.getState());
  requestAnimationFrame(renderMouse);
}

requestAnimationFrame(renderMouse);