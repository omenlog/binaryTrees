function setChild(parentNode, childrenSide, childrenNode) {
  const childSide = childrenSide === "LEFT" ? "leftChild" : "rightChild";
  childrenNode.parentNode = parentNode;
  parentNode[childSide] = childrenNode;
  return parentNode;
}

module.exports = {
  setChild
};
