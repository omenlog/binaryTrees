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

function addIn(tree,newRBNode) {
  /* calling the insert function of BST prototype object */
  Object.getPrototypeOf(tree.__proto__).insert.call(tree, newRBNode);
  newRBNode.fixTheTree();
  updateRootOf(tree);
  return tree;
}

module.exports = {
  updateRootOf,
  addIn
};
