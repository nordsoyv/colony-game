import {moveViewDown,moveViewLeft,moveViewRight,moveViewUp, mouseMove, mouseButtonDown, mouseButtonUp, mouseLeave} from './actions';

function setupMouseBindings(dispatch) {

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
    canvas.onmouseleave = function () {
      dispatch(mouseLeave());
    };
    return;
  }
  //loop until we get the canvas element
  setTimeout(setupMouseBindings, 5, dispatch);
}

export function setupKeyBindings(dispatch) {
  window.onresize = function () {
    let rect = document.getElementById('mapContainer').getBoundingClientRect();
    let canvas = document.getElementById('mainWindow');

    //console.log(rect.width , rect.height);
    canvas.width = rect.width-5;
    canvas.height = rect.height-5;
  };
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

  setupMouseBindings(dispatch);
}