'use strict';

const { replaceIn, minOf } = require('../../utils/tools');

function addNode(newNode, treeNode) {
  if (newNode.getValue() !== treeNode.getValue()) {
    return treeNode.getValue() > newNode.getValue()
      ? treeNode.leftChild === undefined || treeNode.leftChild.isALeaf()
        ? treeNode.insertChild(newNode)
        : addNode(newNode, treeNode.leftChild)
      : treeNode.rightChild === undefined || treeNode.rightChild.isALeaf()
        ? treeNode.insertChild(newNode)
        : addNode(newNode, treeNode.rightChild);
  }
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return undefined;
  } else {
    const nodeValue = rootNode.getValue();
    return nodeValue === value
      ? rootNode
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

function maxOf(rootNode) {
  return rootNode.rightChild === undefined
    ? rootNode
    : maxOf(rootNode.rightChild);
}

function removeFrom(tree, node) {
  if (!node.hasChildrens()) {
    replaceIn(tree, node, undefined);
  } else if (node.hasOneChild()) {
    const nodeChild =
      node.leftChild !== undefined ? node.leftChild : node.rightChild;
    replaceIn(tree, node, nodeChild);
  } else {
    const succesor = minOf(node.rightChild);
    node.setKey(succesor.getValue());
    removeFrom(tree, succesor);
  }

  return tree;
}

function insertIn(tree, newNode) {
  tree.rootNode === undefined
    ? tree.setRootNodeWith(newNode)
    : addNode(newNode, tree.rootNode);
  return tree;
}

function reduceTree(fn, acc, treeNode) {
  return treeNode === undefined
    ? acc
    : reduceTree(fn, fn(acc, treeNode.getValue()), treeNode.succesor());
}

function filterTree(fn, tree, treeNode) {
  const actualNode = treeNode;
  if (actualNode !== undefined) {
    if (!fn(actualNode.getValue())) {
      removeFrom(tree, treeNode);
    }
    filterTree(fn, tree, treeNode.succesor());
  }
}

module.exports = {
  removeFrom,
  addNode,
  minOf,
  reduceTree,
  maxOf,
  findNode,
  insertIn,
  filterTree
};
