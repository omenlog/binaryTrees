const { createNode } = require("Node");

function addNode(value, treeNode) {
  return !treeNode.hasChildrens()
    ? treeNode.insertChild(value)
    : treeNode.getKey() > value
      ? addNode(value, treeNode.leftChild)
      : addNode(value, treeNode.rightChild);
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return null;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? nodeValue
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

const isAListThis = Array.isArray;

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    args.forEach(arg => {
      isAListThis(arg) ? this.insertList(arg) : this.add(arg);
    });
  },
  insertList(values) {
    values.forEach(v => this.add(v));
  },
  add(value) {
    const { rootNode } = this;
    rootNode === undefined
      ? this.setRootNodeWith(value)
      : addNode(value, rootNode);

    return this;
  },
  contain(value) {
    return findNode(value, this.rootNode);
  }
};

function createTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

module.exports = {
  createTree
};
