'use strict';

function setChild(parentNode, childrenSide, childrenNode) {
  const childSide = childrenSide === 'LEFT' ? 'leftChild' : 'rightChild';
  childrenNode.parentNode = parentNode;
  parentNode[childSide] = childrenNode;
  return parentNode;
}

function addChild(parentNode,newNode) {
  return newNode.getKey() < parentNode.getKey()
    ? setChild(parentNode,'LEFT',newNode)
    : setChild(parentNode,'RIGHT',newNode);
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
  addChild,
  parentSuccesor,
  parentPredecesor
};
