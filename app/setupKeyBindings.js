import * as actions from './actions';

function setupMouseBindings(dispatch) {

  function getMousePos(event, canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  let canvas = document.getElementById('mouseWindow');
  if (canvas) {
    canvas.onmousemove = function (event) {
      let pos = getMousePos(event, canvas);
      dispatch(actions.mouseMove(pos.x, pos.y))
    };
    canvas.onmousedown = function (event) {
      let pos = getMousePos(event, canvas);
      dispatch(actions.mouseButtonDown(event.button, pos.x, pos.y));
    };
    canvas.onmouseup = function (event) {
      let pos = getMousePos(event, canvas);
      dispatch(actions.mouseButtonUp(event.button, pos.x, pos.y));
    };
    canvas.onmouseleave = function () {
      dispatch(actions.mouseLeave());
    };
    return;
  }
  //loop until we get the canvas element
  setTimeout(setupMouseBindings, 5, dispatch);
}

export function setupKeyBindings(dispatch) {
/*
  window.onresize = function () {
    let rect = document.getElementById('mapContainer').getBoundingClientRect();
    let canvas = document.getElementById('mainWindow');

    //console.log(rect.width , rect.height);
    canvas.width = rect.width;
    canvas.height = rect.height;
  };
*/
  document.onkeypress = function (event) {
    switch (event.code) {
      case 'Space':
        dispatch(actions.pauseSimulation());
        break;
      case 'KeyW':
        dispatch(actions.moveViewUp());
        break;
      case 'KeyA':
        dispatch(actions.moveViewLeft());
        break;
      case 'KeyS':
        dispatch(actions.moveViewDown());
        break;
      case 'KeyD':
        dispatch(actions.moveViewRight());
        break;
    }
  };

  setupMouseBindings(dispatch);
}