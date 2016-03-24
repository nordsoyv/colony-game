import { combineReducers } from 'redux';
import globals from './global';
import world from './world';
import input from './input';

const rootReducer = combineReducers({
  globals,
  world,
  input
});

export default rootReducer;