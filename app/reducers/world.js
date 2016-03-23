import * as types from '../actions/actionTypes'
import {createMap} from '../game/colonyMap';


const initialState = {
  map:null,
  width:0,
  height:0
};

let world = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_MAP:
      return Object.assign({}, state, {map:createMap(500,500), width:500, height:500 });
    default:
      return state;
  }
};

export default world