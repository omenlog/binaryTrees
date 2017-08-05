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
    return false;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? true
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(value) {
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
