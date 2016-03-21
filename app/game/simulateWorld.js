export function simulateWorld(getState){

}

class BaseEntity{
  constructor(_x,_y){
    this.x = _x;
    this.y = _y;
    this.type = 'baseEntity';
  }

  getPos(){
    return {x:this.x, y: this.y};
  }

  getType(){
    return this.type;
  }
}


export class Colonist extends BaseEntity{
  constructor(_x,_y){
    super(_x,_y );
    this.type = 'colonist'
  }
}



