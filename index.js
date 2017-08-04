const {treePrototype} = require('./src/tree');

function createTree(){
  return Object.create(treePrototype);
}

module.exports = {
  createTree
}
