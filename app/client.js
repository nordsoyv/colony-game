require("babel-polyfill");

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { drawWorld} from './drawWorld';
import {simulateWorld} from './game/simulateWorld';
import { setupKeyBindings }from'./setupKeyBindings';
import './app.global.css';

const store = configureStore();
setupKeyBindings(store.dispatch);

store.dispatch({ type: 'CREATE_MAP' });

render(
  <Root store={store}/>,
  document.getElementById('root')
);


function doInputHandling() {
  let state = store.getState();

  if(state.input.dragEvent){
    store.dispatch({type: 'MOUSE_DRAG_DONE'});
  }


}

function step() {
  doInputHandling();
  simulateWorld(store.getState);
  drawWorld(store.getState());
  requestAnimationFrame(step);
}

requestAnimationFrame(step);