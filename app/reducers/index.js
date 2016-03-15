import { combineReducers } from 'redux';
import globals from './global';
import map from './map';
import view from './view';

const rootReducer = combineReducers({
  globals,
  map,
  view
});

export default rootReducer;