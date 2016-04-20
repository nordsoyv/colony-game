import {fromJS} from 'immutable';

let open = [];
let closed = [];

export function getPath(world, startX, startY, endX, endY){

  let { map , entities}  = world;
  
  return fromJS( [
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10]
  ]);
  
  
}