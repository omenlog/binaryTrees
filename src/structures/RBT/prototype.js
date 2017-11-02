'use strict';

const prototypeBST = require('../BST/prototype');
const { createRBNode } = require('../RBNode');
const { addIn, deleteFixUp } = require('./privateFunc');
const { isANodeThis } = require('../Node');
const { flat, replaceIn, minOf } = require('../../utils/tools');

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
    let x;
    const node = this.find(nodeKey);

    let nodeOriginalColor = node.getColor();

    if (!node.hasChildrens()) {
      x = node.rightChild;
      replaceIn(this, node, node.rightChild);
    } else if (node.leftChild.isALeaf() || node.rightChild.isALeaf()) {
      const nodeChild = node.leftChild.isALeaf()
        ? node.rightChild
        : node.leftChild;
      x = nodeChild;
      replaceIn(this, node, nodeChild);
    } else {
      const succesor = minOf(node.rightChild);
      node.setKey(succesor.getKey());
      nodeOriginalColor = succesor.getColor();
      x = succesor.rightChild;
      replaceIn(this, succesor, succesor.rightChild);
    }

    if (nodeOriginalColor === 'BLACK') {
      if (x.isALeaf() && x === this.rootNode) {
        this.rootNode = undefined;
      } else {
        deleteFixUp(this, x);
      }
    }

    return this;
  }
});

module.exports = prototypeRB;
