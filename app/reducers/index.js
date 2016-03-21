import { combineReducers } from 'redux';
import globals from './global';
import map from './map';
import input from './input';
import simulation from './simulation';

const rootReducer = combineReducers({
  globals,
  map,
  input,
  simulation
});

export default rootReducer;