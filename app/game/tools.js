import * as tags from './entityTags';
import {getPath} from './pathing';
import * as entityStates from './entityStates';

let tools = {
  'cut': {
    name: 'cut',
    displayName: 'Cut',
    affectTag: tags.CUTTABLE
  },
  'command': {
    name: 'command',
    displayName: 'Command',
    affectTag: tags.COMMANDABLE,
    handleLeftClick: function (world, xTile, yTile) {
      console.log(`Command left click at pos [${xTile}, ${yTile}]`);
      let selected = world.selectedEntities;
      let path = getPath(world, 0, 0, 0, 0);
      let entities = world.entities;
      selected.forEach( entity => {
        entity.state = entityStates.MOVING;
        entity.path = path;
      } );
      return {map : world.map, entities};
    },
    handleRightClick: function (world, xTile, yTile) {
      console.log(`Command right click at pos [${xTile}, ${yTile}]`);
    }
  },
  'mine': {
    name: 'mine',
    displayName: 'Mine',
    affectTag: tags.MINEABLE
  }
};

export function getTool(toolName) {
  if (tools[toolName]) {
    return tools[toolName];
  }
  return null;
}

export function getTools() {
  return tools;
}
