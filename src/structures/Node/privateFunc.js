function setChild(parentNode, childrenSide, childrenNode) {
  const childSide = childrenSide === 'LEFT' ? 'leftChild' : 'rightChild'; 
  childrenNode.parentNode = parentNode;
  parentNode[childSide] = childrenNode;
  return parentNode;
}

function parentSuccesor(nodeParent, node) {
  return nodeParent !== undefined && nodeParent.rightChild === node
    ? parentSuccesor(nodeParent.parentNode, nodeParent)
    : nodeParent;
}

function parentPredecesor(nodeParent, node) {
  return nodeParent !== undefined && nodeParent.leftChild === node
    ? parentPredecesor(nodeParent.parentNode, nodeParent)
    : nodeParent;
}

module.exports = {
  setChild,
  parentSuccesor,
  parentPredecesor
};
