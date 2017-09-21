'use strict';

const Node = require('./prototype');
const {setChild} = require('./privateFunc');
const {missingNodeValue} = require('./errors');
const {launch} = require('../../utils/tools');

// TODO: Implement error handling in every node feature
// TODO: Change insertChild feature to be receive a new node Object as a new child

function createNode(newKey = launch(missingNodeValue)) {
  let key = newKey;
  return Object.assign(Object.create(Node), {
    getKey() {
      return key;
    },
    setKey(k) {
      key = k;
    },
    insertChild(nodeChild) {
      let newNode;
      if(nodeChild.getKey === undefined){
        newNode = createNode(nodeChild);
      }
      else{
        newNode = nodeChild;
      }

      return newNode.getKey() < this.getKey()
        ? setChild(this,'LEFT',newNode)
        : setChild(this,'RIGHT',newNode);
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  });
}

module.exports = {
  createNode
};
