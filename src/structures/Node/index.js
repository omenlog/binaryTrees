'use strict';

const Node = require('./prototype');
const {setChild} = require('./privateFunc');
const {missingNodeValue} = require('./errors');
const {launch} = require('../../utils/tools');

// TODO: Implement error handling in every node feature
// TODO: implement setLeftChild and setRightChild function as node private functions

function createNode(newKey = launch(missingNodeValue)) {
  let key = newKey;
  return Object.assign(Object.create(Node), {
    getKey() {
      return key;
    },
    setKey(k) {
      key = k;
    },
    insertChild(arg) {
      const newNode = isANodeThis(arg) ? arg : createNode(arg);
      return newNode.getKey() < this.getKey()
        ? setChild(this,'LEFT',newNode)
        : setChild(this,'RIGHT',newNode);
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  });
}

const isANodeThis = arg => {
  return typeof arg === 'object' && Node.isPrototypeOf(arg);
};

module.exports = {
  createNode,
  isANodeThis
};
