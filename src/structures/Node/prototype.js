const { minOf } = require("../Tree/privateFunc");
const {parentSuccesor} = require('.privateFunc');

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
  succesor() {
    return this.rightChild
      ? minOf(this.rightChild)
      : parentSuccesor(this.parentNode, this);
  },
  childrens() {
    const { leftChild, rightChild } = this;
    return { leftChild, rightChild };
  }
};

module.exports = nodePrototype;
