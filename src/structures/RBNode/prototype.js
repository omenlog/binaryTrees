'use strict';

const { launch } = require('../../utils/tools');
const {
  unableToMakeLeftRotation,
  unableToMakeRightRotation
} = require('./errors');

const rbNodePrototype = {
  rotateToLeft() {
    if (this.rightChild === undefined) {
      launch(unableToMakeLeftRotation);
    } else {
      const nodeRightChild = this.rightChild;
      const nodeLeftGrandChild = nodeRightChild.leftChild;

      this.rightChild = nodeLeftGrandChild;

      if (nodeLeftGrandChild !== undefined) {
        nodeLeftGrandChild.parentNode = this;
      }

      if (this.parentNode !== undefined) {
        const nodeSide = this.isALeftChild() ? 'leftChild' : 'rightChild';
        this.parentNode[nodeSide] = nodeRightChild;
      }

      nodeRightChild.parentNode = this.parentNode;

      nodeRightChild.leftChild = this;
      this.parentNode = nodeRightChild;
    }
  },
  rotateToRight() {
    if (this.leftChild === undefined) {
      launch(unableToMakeRightRotation);
    } else {
      const nodeLeftChild = this.leftChild;
      const nodeRightGrandChild = nodeLeftChild.rightChild;

      this.leftChild = nodeRightGrandChild;

      if (nodeRightGrandChild !== undefined) {
        nodeRightGrandChild.parentNode = this;
      }

      if (this.parentNode !== undefined) {
        const nodeSide = this.isALeftChild() ? 'leftChild' : 'rightChild';
        this.parentNode[nodeSide] = nodeLeftChild;
      }

      nodeLeftChild.rightChild = this;

      nodeLeftChild.parentNode = this.parentNode;
      this.parentNode = nodeLeftChild;
    }
  }
};

module.exports = rbNodePrototype;
