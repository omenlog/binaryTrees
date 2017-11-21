'use strict';

// TODO: Thrown and error when contain and find are called without any argument

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

/* small auxiliar function used in the tree prototype */

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
  find(...args) {
    const flatArgs = flat(args);
    return flatArgs.length === 1
      ? findNode(args[0], this.rootNode)
      : flatArgs
          .map(arg => findNode(arg, this.rootNode))
          .filter(node => node !== undefined);
  },
  remove(...args) {
    flat(args)
      .map(arg => this.find(arg))
      .filter(node => node !== undefined)
      .forEach(node => removeFrom(this, node));

    return this;
  },
  reduce(fn, initialAcc) {
    const initialNode = this.min();
    return this.rootNode === undefined
      ? initialAcc
      : !initialAcc
        ? reduceTree(fn, initialNode.getValue(), initialNode.succesor())
        : reduceTree(fn, initialAcc, initialNode);
  },
  max() {
    const { rootNode } = this;
    return rootNode === undefined ? undefined : maxOf(rootNode);
  },
  maxValue() {
    const max = this.max();
    return max !== undefined ? max.getValue() : undefined;
  },
  min() {
    const { rootNode } = this;
    return rootNode === undefined ? undefined : minOf(rootNode);
  },
  minValue() {
    const min = this.min();
    return min !== undefined ? min.getValue() : undefined;
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
