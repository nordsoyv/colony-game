require("babel-polyfill");

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import {drawWorld} from './drawWorld';


const store = configureStore();

store.dispatch({type : 'CREATE_MAP'});

render(
  <Root store={store} />,
  document.getElementById('root')
);

function step (){
  //do work
  //console.log('Hi');
  drawWorld(store.getState());

  requestAnimationFrame(step);
}


requestAnimationFrame(step);