const { createNode } = require('../Node');

function createRBNode(key, nodeColor = 'BLACK') {
  const newNode = createNode(key);
  let color = nodeColor;

  return Object.assign(Object.create(newNode), {
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
