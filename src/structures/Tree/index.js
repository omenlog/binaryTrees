const Tree = require("./prototype");

function createEmptyTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

function createNewTreeWith(args) {
  return createEmptyTree().insert(args);
}

function createTree(...args) {
  return args.length === 0 ? createEmptyTree() : createNewTreeWith(args);
}

module.exports = {
  createTree
};
