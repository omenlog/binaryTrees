'use strict';

const { minOf, maxOf } = require('../BST/privateFunc');
const { parentSuccesor, parentPredecesor } = require('./privateFunc');

const nodePrototype = {
  hasChildrens() {
    return this.leftChild || this.rightChild;
  },
  isALeaf(){
    return false;
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
  predecesor() {
    return this.leftChild
      ? maxOf(this.leftChild)
      : parentPredecesor(this.parentNode, this);
  },
  childrens() {
    const { leftChild, rightChild } = this;
    return { leftChild, rightChild };
  },
  isALeftChild() {
    return this.parentNode.leftChild === this;
  }
};

module.exports = nodePrototype;
