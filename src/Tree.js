const { createNode } = require("Node");

function findParent(treeNode, value) {
  if (!treeNode.hasChildrens()) return treeNode;
  else {
    if (treeNode.getKey() > value) {
      return findParent(treeNode.leftChild, value);
    } else {
      return findParent(treeNode.rightChild, value);
    }
  }
}

function find(value, rootNode) {
  if (rootNode === undefined) {
    return false;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? true
      : nodeValue < value
        ? find(value, rootNode.rightChild)
        : find(value, rootNode.leftChild);
  }
}

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(value) {
    this.rootNode !== undefined
      ? findParent(this.rootNode, value).insertChild(value)
      : this.setRootNodeWith(value);
    return this;
  },
  contain(value) {
    return find(value, this.rootNode);
  }
};

function createTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

module.exports = {
  createTree
};
