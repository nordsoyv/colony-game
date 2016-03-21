import * as types from '../actions/actionTypes'
import {Colonist} from '../game/simulateWorld';

let initialState = {
  colonists : []
};

export default function simulation( state = initialState, action) {
  switch (action.type){
    case types.INIT_SIMULATION:
      let colonist = new Colonist(5,5);
      return Object.assign({},state, {colonists: [colonist]  });
    default:
      return state;
  }
}