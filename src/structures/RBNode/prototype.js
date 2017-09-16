const rbNodePrototype = {
  rotateToLeft(){
    const nodeRightChild = this.rightChild;
    const nodeLeftGrandChild = nodeRightChild.leftChild;

    this.rightChild = nodeLeftGrandChild;

    if(nodeLeftGrandChild !== undefined)
      nodeLeftGrandChild.parentNode = this;

    const nodeSide = this.isALeftChild() ? 'leftChild':'rightChild';
    this.parentNode[nodeSide] = nodeRightChild;

    nodeRightChild.parentNode = this.parentNode;

    nodeRightChild.leftChild = this;
    this.parentNode = nodeRightChild;
  }
};

module.exports = rbNodePrototype;
