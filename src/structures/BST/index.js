const Tree = require("./prototype");

// TODO: Implement error handling in every tree feature
// TODO: Implement map function in the tree
// TODO: Implement min function that return the min value in the tree
// TODO: Implement filter function in the tree
// TODO: Implement reduce function in the tree

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
