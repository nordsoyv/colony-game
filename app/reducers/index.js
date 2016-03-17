import { combineReducers } from 'redux';
import globals from './global';
import map from './map';
import input from './input';

const rootReducer = combineReducers({
  globals,
  map,
  input
});

export default rootReducer;