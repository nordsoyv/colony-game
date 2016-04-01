import {selectEntities} from './game/mapUtils';
import {getTool} from './game/tools';
import {setSelectedEntities} from './actions';


export function doInputHandling(store) {
  let state = store.getState();
  if (state.input.dragEvent) {
    let tool = getTool(state.input.selectedTool);
    let xStart = state.input.mouseStartDragXPos;
    let yStart = state.input.mouseStartDragYPos;
    let xEnd = state.input.mouseXPos;
    let yEnd = state.input.mouseYPos;
    let width = xEnd - xStart;
    let height = yEnd - yStart;

    //make sure start point is the smallest coordinate
    if(xStart > xEnd) {
      xStart = xEnd;
    }
    if(yStart < yEnd){
      yStart = yEnd
    }

    width = width > 0 ? width : width * -1;
    height = height > 0 ? height : height * -1;
    width = Math.ceil(width / 16);
    height = Math.ceil(height / 16);
    let startXTile = Math.floor(xStart / 16);
    let startYTile = Math.floor((512 - yStart) / 16);

    let selected = selectEntities(state.world.map, tool.affectTag, startXTile,startYTile,width, height);
    store.dispatch(setSelectedEntities(selected));
    store.dispatch({type: 'MOUSE_DRAG_DONE'});
  }
}