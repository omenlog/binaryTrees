const Tree = require('./prototype');

// TODO: Implement error handling in every tree feature

function createEmptyTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

function createNewTreeWith(args) {
  return createEmptyTree().insert(args);
}

function createBST(...args) {
  return args.length === 0 ? createEmptyTree() : createNewTreeWith(args);
}

module.exports = {
  createBST
};
