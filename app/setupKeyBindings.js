import * as actions from './actions';

let mouseButtonDownPos = {};
let mouseButtonLeft = false;
let mouseButtonRight = false;


function isSmallMovement(pos) {
  return !!(Math.abs(pos.x - mouseButtonDownPos.x) < 5 &&
  Math.abs(pos.y - mouseButtonDownPos.y) < 5);
}

function isLeftButton(btn) {
  return btn == 0;
}
function isRightButton(btn) {
  return btn == 2;
}

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
      if (mouseButtonLeft || mouseButtonRight) {
        dispatch(actions.mouseDrag(mouseButtonDownPos.x, mouseButtonDownPos.y, pos.x, pos.y));
      }
    };
    canvas.onmousedown = function (event) {
      mouseButtonDownPos = getMousePos(event, canvas);
      if (isLeftButton(event.button)) mouseButtonLeft = true;
      if (isRightButton(event.button)) mouseButtonRight = true;
    };
    canvas.onmouseup = function (event) {
      let pos = getMousePos(event, canvas);
      if (isLeftButton(event.button)) mouseButtonLeft = false;
      if (isRightButton(event.button)) mouseButtonRight = false;

      if (isSmallMovement(pos)) {
        dispatch(actions.mouseClick(event.button, pos.x, pos.y));
      } else {
        let startX, startY, endX, endY;
        if (mouseButtonDownPos.x < pos.x) {
          startX = mouseButtonDownPos.x;
          endX = pos.x;
        } else {
          startX = pos.x;
          endX = mouseButtonDownPos.x;
        }
        if (mouseButtonDownPos.y < pos.y) {
          startY = mouseButtonDownPos.y;
          endY = pos.y;
        } else {
          startY = pos.y;
          endY = mouseButtonDownPos.y;
        }
        dispatch(actions.mouseDragDone(event.button, startX, startY, endX, endY));
      }
    };
    canvas.onmouseleave = function () {
      mouseButtonLeft = false;
      mouseButtonRight = false;
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