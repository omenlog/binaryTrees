function addNode(value, treeNode) {
  return treeNode.getKey() > value
    ? treeNode.leftChild === undefined
      ? treeNode.insertChild(value)
      : addNode(value, treeNode.leftChild)
    : treeNode.rightChild === undefined
      ? treeNode.insertChild(value)
      : addNode(value, treeNode.rightChild);
}

function findNode(value, rootNode) {
  if (rootNode === undefined) {
    return undefined;
  } else {
    const nodeValue = rootNode.getKey();
    return nodeValue === value
      ? rootNode
      : nodeValue < value
        ? findNode(value, rootNode.rightChild)
        : findNode(value, rootNode.leftChild);
  }
}

function minOf(rootNode) {
  return rootNode.leftChild === undefined
    ? rootNode
    : minOf(rootNode.leftChild);
}

function removeFrom(tree, node) {
  if (!node.hasChildrens()) {
    replaceIn(tree, node, undefined);
  } else if (node.hasOneChild()) {
    const nodeChild =
      node.leftChild !== undefined ? node.leftChild : node.rightChild;
    replaceIn(tree, node, nodeChild);
  } else {
    const succesor = minOf(node.rightChild);
    tree.remove(succesor.getKey());
    node.setKey(succesor.getKey());
  }

  return tree;
}

function replaceIn(tree, oldNode, newNode) {
  const { parentNode } = oldNode;

  if (parentNode === undefined) {
    tree.rootNode = newNode;
  } else {
    const { leftChild } = parentNode;
    if (leftChild && leftChild.getKey() === oldNode.getKey()) {
      parentNode.leftChild = newNode;
    } else {
      parentNode.rightChild = newNode;
    }
  }

  if (newNode !== undefined) {
    newNode.parentNode = oldNode.parentNode;
  }
}

function insertListIn(tree,args){
  args.forEach(arg => tree.add(arg));
  return tree;
}

module.exports = {
  removeFrom,
  addNode,
  minOf,
  findNode,
  insertListIn
};
