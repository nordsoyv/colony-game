import * as tags from './entityTags';

let tools = {
  'cut': {
    name: 'cut',
    displayName: 'Cut',
    affectTag: tags.CUTTABLE
  },
  'command': {
    name:'command',
    displayName: 'Command',
    affectTag: tags.COMMANDABLE
  },
  'mine': {
    name:'mine',
    displayName: 'Mine',
    affectTag: tags.MINEABLE
  }
};

export function getTool(toolName) {
  if(tools[toolName]){
    return tools[toolName];
  }
}

export function getTools() {
  return tools;
}
