import {getDynamicEntityList} from'./entities';


function doHumanStep(entity) {
  //console.log('thinking');
}

export function simulateWorld(getState) {
  getDynamicEntityList().forEach(entity => {
    if(entity.type == 'human'){
      doHumanStep(entity);
    }
  });
}

