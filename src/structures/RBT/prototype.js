'use strict';

const prototypeBST = require('../BST/prototype');
const { createRBNode } = require('../RBNode');
const { addIn, removeFrom } = require('./privateFunc');
const { isANodeThis } = require('../Node');
const { flat } = require('../../utils/tools');

const createRBNodes = arg => {
  return isANodeThis(arg) ? arg : createRBNode(arg, 'RED');
};

const prototypeRB = Object.assign(Object.create(prototypeBST), {
  insert(...args) {
    flat(args)
      .map(createRBNodes)
      .forEach(newNode => addIn(this, newNode));

    return this;
  },
  remove(nodeKey) {
    const node = this.find(nodeKey);
    return node !== undefined ? removeFrom(this, node) : this;
  }
});

module.exports = prototypeRB;
