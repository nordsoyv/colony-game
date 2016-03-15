import * as types from '../actions/actionTypes'
import {ColonyMap} from '../game/colonyMap';


const initialState = null;

let map = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_MAP:
      return new ColonyMap(500,500);
    default:
      return state;
  }
};

export default map