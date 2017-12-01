'use strict';

const { launch } = require('../../utils/tools');
const {
  unableToMakeLeftRotation,
  unableToMakeRightRotation
} = require('./errors');

const rbNodePrototype = {
  hasChildrens() {
    return !this.leftChild.isALeaf() || !this.rightChild.isALeaf();
  },
  rotateToLeft(tree) {
    if (this.rightChild.isALeaf()) {
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
      else{
        tree.rootNode = nodeRightChild;
      }

      nodeRightChild.parentNode = this.parentNode;

      nodeRightChild.leftChild = this;
      this.parentNode = nodeRightChild;
    }
  },
  rotateToRight(tree) {
    if (this.leftChild.isALeaf()) {
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
      else{
        tree.rootNode = nodeLeftChild;
      }

      nodeLeftChild.rightChild = this;

      nodeLeftChild.parentNode = this.parentNode;
      this.parentNode = nodeLeftChild;
    }
  },
  fixTheTree(tree) {
    let z = this;
    while (z.parentNode && z.parentNode.getColor() === 'RED') {
      if (z.parentNode.isALeftChild()) {
        const y = z.parentNode.parentNode.rightChild;

        if (y && y.getColor() === 'RED') {
          z.parentNode.setColor('BLACK');
          y.setColor('BLACK');
          z.parentNode.parentNode.setColor('RED');
          z = z.parentNode.parentNode;
        } else {
          if (!z.isALeftChild()) {
            z = z.parentNode;
            z.rotateToLeft(tree);
          }

          z.parentNode.setColor('BLACK');
          z.parentNode.parentNode.setColor('RED');
          z.parentNode.parentNode.rotateToRight(tree);
        }
      } else {
        const y = z.parentNode.parentNode.leftChild;

        if (y && y.getColor() === 'RED') {
          z.parentNode.setColor('BLACK');
          y.setColor('BLACK');
          z.parentNode.parentNode.setColor('RED');
          z = z.parentNode.parentNode;
        } else {
          if (z.isALeftChild()) {
            z = z.parentNode;
            z.rotateToRight(tree);
          }
          z.parentNode.setColor('BLACK');
          z.parentNode.parentNode.setColor('RED');
          z.parentNode.parentNode.rotateToLeft(tree);
        }
      }
    }
  }
};

module.exports = rbNodePrototype;
