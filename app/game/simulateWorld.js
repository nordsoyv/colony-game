import {getDynamicEntityList} from'./entities';


function doHumanStep(entity) {
  if(entity.state == 'moving'){
    if(!entity.path){
      entity.state ='idle';
    }else {

    }
  }
}

export function simulateWorld(getState) {
  getDynamicEntityList().forEach(entity => {
    if(entity.type == 'human'){
      doHumanStep(entity);
    }
  });
}

