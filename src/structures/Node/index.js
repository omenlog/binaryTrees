'use strict';

const Node = require('./prototype');
const { addChild } = require('./privateFunc');
const { missingNodeValue } = require('./errors');
const { launch } = require('../../utils/tools');

// TODO: Implement error handling in every node feature
// TODO: Allow insert child receive more than two arguments to insert the two childrens in one single call

function createNode(newKey = launch(missingNodeValue)) {
  let key = newKey;
  return Object.assign(Object.create(Node), {
    getValue() {
      return key;
    },
    setKey(k) {
      key = k;
    },
    insertChild(arg) {
      const newNode = isANodeThis(arg) ? arg : createNode(arg);
      return addChild(this, newNode);
    },
    insertChildrens(...args) {
      args.forEach(arg => this.insertChild(arg));
      return this;
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
