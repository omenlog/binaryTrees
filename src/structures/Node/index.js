const Node = require("./prototype");
const {setChild} = require('./privateFunc');

// TODO: allow node apply one function using map to node values

function createNode(newKey = 0) {
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
        ? setChild(this,"LEFT",createNode(value))
        : setChild(this,"RIGHT",createNode(value));
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  });
}

module.exports = {
  createNode
};
