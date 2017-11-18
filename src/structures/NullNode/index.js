'use strict';

const nullNode = {
  getValue() {
    return undefined;
  },
  getColor() {
    return 'BLACK';
  },
  isALeaf() {
    return true;
  },
  isALeftChild(){
    return this.parentNode.leftChild === this;
  }
};

module.exports = nullNode;
