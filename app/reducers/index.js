import { combineReducers } from 'redux';
import globals from './global';
import world from './world';
import input from './input';
import simulation from './simulation';

const rootReducer = combineReducers({
  globals,
  world,
  input,
  simulation
});

export default rootReducer;