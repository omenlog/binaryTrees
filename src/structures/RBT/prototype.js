'use strict';

const prototypeBST = require('../BST/prototype');
const { createRBNode } = require('../RBNode');
const { addIn, removeFrom, filterTree} = require('./privateFunc');
const { isANodeThis } = require('../Node');
const { flat } = require('../../utils/tools');

const createRBNodes = arg => {
  return isANodeThis(arg) ? arg : createRBNode(arg, 'RED');
};

const deleteFrom = (rbTree, nodeValue) => {
  const node = rbTree.find(nodeValue);
  return node !== undefined ? removeFrom(rbTree, node) : rbTree;
};

const prototypeRB = Object.assign(Object.create(prototypeBST), {
  insert(...args) {
    flat(args)
      .map(createRBNodes)
      .forEach(newNode => addIn(this, newNode));

    return this;
  },
  filter(fn){
    filterTree(fn,this,this.min());
    return this;
  },
  remove(...args) {
    flat(args).forEach(arg => deleteFrom(this, arg));
    return this;
  }
});

module.exports = prototypeRB;
