const nodePrototype = {
  hasChildrens() {
    return this.leftChild || this.rightChild;
  },
  hasOneChild() {
    return (
      (this.leftChild && !this.rightChild) ||
      (!this.leftChild && this.rightChild)
    );
  },
  childrens() {
    const { leftChild, rightChild } = this;
    return { leftChild, rightChild };
  }
};

module.exports = nodePrototype;
