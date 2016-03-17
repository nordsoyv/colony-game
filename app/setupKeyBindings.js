import {moveViewDown,moveViewLeft,moveViewRight,moveViewUp, mouseMove, mouseButtonDown, mouseButtonUp} from './actions';

export function setupKeyBindings(dispatch) {
  document.onkeypress = function (event) {
    switch (event.code) {
      case 'KeyW':
        dispatch(moveViewUp());
        break;
      case 'KeyA':
        dispatch(moveViewLeft());
        break;
      case 'KeyS':
        dispatch(moveViewDown());
        break;
      case 'KeyD':
        dispatch(moveViewRight());
        break;
    }
  };

  function setupMouseBindings() {

    function getMousePos(event, canvas) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }


    let canvas = document.getElementById('mainWindow');
    if (canvas) {
      canvas.onmousemove = function (event) {
        let pos = getMousePos(event, canvas);
        dispatch(mouseMove(pos.x, pos.y))
      };
      canvas.onmousedown = function (event) {
        let pos = getMousePos(event, canvas);
        dispatch(mouseButtonDown(event.button, pos.x, pos.y));
      };
      canvas.onmouseup = function (event) {
        let pos = getMousePos(event, canvas);
        dispatch(mouseButtonUp(event.button, pos.x, pos.y));
      };

      return;
    }
    setTimeout(setupMouseBindings, 5);
  }

  setupMouseBindings();


}