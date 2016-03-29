require("babel-polyfill");

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { drawWorld} from './drawWorld';
import {simulateWorld} from './game/simulateWorld';
import { setupKeyBindings }from'./setupKeyBindings';
import {createMap} from './game/createMap';
import {setWorld} from './actions';
import './app.global.css';

const store = configureStore();
setupKeyBindings(store.dispatch);

store.dispatch({ type: 'INIT_SIMULATION' });

let world = createMap(100, 100);
store.dispatch(setWorld(world.map, world.entities));


render(
  <Root store={store}/>,
  document.getElementById('root')
);


function doInputHandling() {
  let state = store.getState();
  if (state.input.dragEvent) {
    // let xStart = state.input.mouseXPos;
    // let yStart = state.input.mouseYPos;
    // let xEnd = state.input.mouseStartDragXPos;
    // let yEnd = state.input.mouseStartDragYPos;
    
    
    
    
    
    
    
    
    
    store.dispatch({ type: 'MOUSE_DRAG_DONE' });
  }
}

function step() {
  doInputHandling();
  drawWorld(store.getState());
  requestAnimationFrame(step);
}

requestAnimationFrame(step);

function doSimulationStep(){
  simulateWorld(store.getState, store.dispatch);
}

setInterval(doSimulationStep, 1000);