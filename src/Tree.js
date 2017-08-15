"use strict";

const { createNode } = require("Node");
const {flat} = require("utils/tools");
const {addNode,findNode,removeFrom,insertListIn} = require('utils/treeTools');

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    return insertListIn(this,flat(args));
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

module.exports = {
  createTree,
};
