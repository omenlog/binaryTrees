"use strict";

const {
  findNode,
  insertListIn,
  removeFrom,
  minOf,
  maxOf,
  reduceTree
} = require("./privateFunc");

const { createNode } = require("../Node");
const { flat } = require("../../utils/tools");

const treePrototype = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    return insertListIn(this, flat(args));
  },
  contain(...args) {
    const nodes = flat(args).map(arg => findNode(arg, this.rootNode));
    const everyNodeIsFinded = nodes.every(node => node);
    return everyNodeIsFinded ? true : false;
  },
  find(nodeKey) {
    const node = findNode(nodeKey, this.rootNode);
    return node !== undefined ? node : undefined;
  },
  remove(arg) {
    const node = this.find(arg);
    return node !== undefined ? removeFrom(this, node) : this;
  },
  reduce(fn, initialAcc) {
    const initialNode = this.min();
    return this.rootNode === undefined
      ? initialAcc
      : !initialAcc
        ? reduceTree(fn, initialNode.getKey(), initialNode.succesor())
        : reduceTree(fn, initialAcc, initialNode);
  },
  max() {
    const { rootNode } = this;
    return rootNode === undefined ? undefined : maxOf(rootNode);
  },
  min() {
    const { rootNode } = this;
    return rootNode === undefined ? undefined : minOf(rootNode);
  },
  [Symbol.iterator]() {
    return this.iterator();
  },
  iterator() {
    let actualNode = this.min();

    const changeActualNode = () => {
      actualNode = actualNode ? actualNode.succesor() : undefined;
    };

    const buildResult = () => ({
      value: actualNode,
      done: actualNode === undefined
    });

    /* returning the iterator constructed */

    return {
      next() {
        const iteratorResult = buildResult();
        changeActualNode();
        return iteratorResult;
      },
      return(v = undefined) {
        actualNode = undefined;
        return {
          value: v,
          done: true
        };
      }
    };
  }
};

module.exports = treePrototype;
