"use strict";

const { createNode } = require("Node");

function addNode(value, treeNode) {
  return treeNode.getKey() > value
    ? treeNode.leftChild === undefined
      ? treeNode.insertChild(value)
      : addNode(value, treeNode.leftChild)
    : treeNode.rightChild === undefined
      ? treeNode.insertChild(value)
      : addNode(value, treeNode.rightChild);
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return null;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? rootNode
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

function replaceIn(tree, oldNode, newNode) {
  const { parentNode } = oldNode;

  if (parentNode === undefined) {
    tree.rootNode = newNode;
  } else {
    const { leftChild } = parentNode;
    if (leftChild && leftChild.getKey() === oldNode.getKey()) {
      parentNode.leftChild = newNode;
    } else {
      parentNode.rightChild = newNode;
    }
  }

  if (newNode !== undefined) {
    newNode.parentNode = oldNode.parentNode;
  }
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
    tree.remove(succesor.getKey());
    node.setKey(succesor.getKey());
  }

  return tree;
}

const isAListThis = Array.isArray;

function flatReducer(flatArray, arg) {
  return isAListThis(arg) ? flatArray.concat(flat(arg)) : flatArray.concat(arg);
}

function flat(args) {
  return args.reduce(flatReducer, []);
}

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    this.insertList(flat(args));
    return this;
  },
  insertList(args) {
    args.forEach(arg => this.add(arg));
  },
  add(value) {
    const { rootNode } = this;
    rootNode === undefined
      ? this.setRootNodeWith(value)
      : addNode(value, rootNode);

    return this;
  },
  contain(...args) {
    const nodes = flat(args).map(arg => findNode(arg, this.rootNode));
    const everyNodeIsFinded = nodes.every(node => node);
    return everyNodeIsFinded ? nodes : false;
  },
  remove(arg) {
    const nodes = this.contain(arg);
    return nodes !== false ? removeFrom(this, nodes[0]) : this;
  }
};

function createEmptyTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

function createNewTreeWith(args) {
  const newTree = createEmptyTree();
  args.forEach(arg => newTree.insert(arg));
  return newTree;
}

function createTree(...args) {
  return args.length === 0 ? createEmptyTree() : createNewTreeWith(args);
}

function minOf(rootNode) {
  return rootNode.leftChild === undefined
    ? rootNode
    : minOf(rootNode.leftChild);
}

module.exports = {
  createTree,
  minOf
};
