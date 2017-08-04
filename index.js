const {treePrototype} = require('./src/tree');

function createTree(){
  return Object.assign(Object.create(treePrototype),{
    rootNode: undefined
  });
}

module.exports = {
  createTree
}
