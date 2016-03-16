import {moveViewDown,moveViewLeft,moveViewRight,moveViewUp} from './actions';

export function setupKeyBindings(dispatch){
  document.onkeypress = function (event) {
    switch(event.code){
      case 'KeyW':dispatch(moveViewUp()); break;
      case 'KeyA':dispatch(moveViewLeft()); break;
      case 'KeyS':dispatch(moveViewDown()); break;
      case 'KeyD':dispatch(moveViewRight()); break;
    }
  }
}