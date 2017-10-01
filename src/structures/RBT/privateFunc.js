"use strict";

function updateRootNode(posibleRoot) {
  return posibleRoot.parentNode === undefined
    ? posibleRoot
    : updateRootNode(posibleRoot.parentNode);
}

function updateRootOf(tree) {
  let newRootNode = updateRootNode(tree.rootNode);
  newRootNode.setColor("BLACK");
  tree.rootNode = newRootNode;
}

module.exports = {
  updateRootOf
};
