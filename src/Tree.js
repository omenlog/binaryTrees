"use strict";

const { createNode } = require("Node");

function addNode(value, treeNode) {
  return !treeNode.hasChildrens()
    ? treeNode.insertChild(value)
    : treeNode.getKey() > value
      ? addNode(value, treeNode.leftChild)
      : addNode(value, treeNode.rightChild);
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return null;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? nodeValue
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
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
  },
  insertList(values) {
    values.forEach(v => this.add(v));
  },
  add(value) {
    const { rootNode } = this;
    rootNode === undefined
      ? this.setRootNodeWith(value)
      : addNode(value, rootNode);

    return this;
  },
  contain(value) {
    return findNode(value, this.rootNode);
  }
};

function createEmptyTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

function createNewTreeWith(arg) {
  const newTree = createEmptyTree();
  arg.forEach(a => newTree.insert(a));
  return newTree;
}

function createTree(...args) {
  return args.length === 0 ? createEmptyTree() : createNewTreeWith(args);
}

module.exports = {
  createTree
};
