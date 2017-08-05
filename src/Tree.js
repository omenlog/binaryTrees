const {createNode} = require('Node');

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

function find(rootNode, value) {
  if (rootNode === undefined) {
    return false;
  } else {
    const nodeValue = rootNode.getKey();
    if (nodeValue === value) {
      return true;
    } else if (nodeValue < value) {
      return find(rootNode.rightChild, value);
    } else {
      return find(rootNode.leftChild, value);
    }
  }
}

/* Declaring tree prototype */
const Tree = {
  setRootNodeWith(value){
    this.rootNode = createNode(value);
  },
  insert(value) {
    (this.rootNode !== undefined)
      ? findParent(this.rootNode, value).insertChild()
      : this.setRootNodeWith(value);
    return this;
  },
  contain(value) {
    return find(this.rootNode, value);
  }
};

function createTree() {
  return Object.assign(Object.create(Tree), { rootNode: undefined });
}

module.exports = {
  createTree
};
