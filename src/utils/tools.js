'use strict';

function flatReducer(flatArray, arg) {
  return Array.isArray(arg)
    ? flatArray.concat(flat(arg))
    : flatArray.concat(arg);
}

function flat(args) {
  return args.reduce(flatReducer, []);
}

/* function to build another error functions */
function buildError(errorName, errorMessage) {
  const errorFunction = function errorFunction() {
    this.name = errorName;
    this.message = errorMessage;
    this.stack = new Error().stack;
  };

  errorFunction.prototype = Object.create(Error.prototype);
  errorFunction.prototype.constructor = errorFunction;

  return errorFunction;
}

const launch = ErrorFunction => {
  throw new ErrorFunction();
};

function replaceIn(tree, oldNode, newNode) {
  const { parentNode } = oldNode;

  if (parentNode === undefined) {
    tree.rootNode = newNode;
  } else {
    const { leftChild } = parentNode;
    if (leftChild && leftChild.getValue() === oldNode.getValue()) {
      parentNode.leftChild = newNode;
    } else {
      parentNode.rightChild = newNode;
    }
  }

  if (newNode !== undefined) {
    newNode.parentNode = oldNode.parentNode;
  }
}

function minOf(rootNode) {
  return rootNode.leftChild === undefined || rootNode.leftChild.isALeaf()
    ? rootNode
    : minOf(rootNode.leftChild);
}

module.exports = {
  flat,
  buildError,
  replaceIn,
  launch,
  minOf
};
