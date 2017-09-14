const Node = require('./prototype');
const {setChild} = require('./privateFunc');
const {missingNodeValue} = require('./errors');
const {launch} = require('../../utils/tools');

// TODO: Implement error handling in every node feature

function createNode(newKey = launch(missingNodeValue)) {
  let key = newKey;
  return Object.assign(Object.create(Node), {
    getKey() {
      return key;
    },
    setKey(k) {
      key = k;
    },
    insertChild(value) {
      return value < this.getKey()
        ? setChild(this,'LEFT',createNode(value))
        : setChild(this,'RIGHT',createNode(value));
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  });
}

module.exports = {
  createNode
};
