'use strict';

// TODO: add error to check that the color of the new node is always RED or BLACK

const {buildNodePrototype} = require('./privateFunc');

function createRBNode(key, nodeColor = 'BLACK') {
  const rbNode = buildNodePrototype(key);
  let color = nodeColor;

  return Object.assign(Object.create(rbNode), {
    getColor() {
      return color;
    },
    setColor(newColor) {
      color = newColor;
    }
  });
}

module.exports = {
  createRBNode
};
