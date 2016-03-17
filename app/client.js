require("babel-polyfill");

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { drawWorld} from './drawWorld';
import { setupKeyBindings }from'./setupKeyBindings';
import './app.global.css';

const store = configureStore();
setupKeyBindings(store.dispatch);

store.dispatch({ type: 'CREATE_MAP' });

render(
  <Root store={store}/>,
  document.getElementById('root')
);


function step() {
  drawWorld(store.getState());
  requestAnimationFrame(step);
}

requestAnimationFrame(step);