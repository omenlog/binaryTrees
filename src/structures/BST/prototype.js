'use strict';

/* importing modules */

const {
  findNode,
  removeFrom,
  minOf,
  insertIn,
  maxOf,
  reduceTree
} = require('./privateFunc');

const { createNode, isANodeThis } = require('../Node');
const { flat } = require('../../utils/tools');

/* small auxiliar functions used in the tree prototype */


const createNodes = arg => {
  return isANodeThis(arg) ? arg : createNode(arg);
};

/* defining tree prototype */

const treePrototype = {
  setRootNodeWith(newNode) {
    this.rootNode = newNode;
  },
  insert(...args) {
    flat(args)
      .map(createNodes)
      .forEach(newNode => insertIn(this, newNode));

    return this;
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
