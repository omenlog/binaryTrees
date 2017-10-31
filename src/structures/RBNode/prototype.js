"use strict";

const { launch } = require("../../utils/tools");
const {
  unableToMakeLeftRotation,
  unableToMakeRightRotation
} = require("./errors");

const rbNodePrototype = {
  hasChildrens(){
    return !this.leftChild.isALeaf() || !this.rightChild.isALeaf();
  },
  rotateToLeft() {
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
        const nodeSide = this.isALeftChild() ? "leftChild" : "rightChild";
        this.parentNode[nodeSide] = nodeRightChild;
      }

      nodeRightChild.parentNode = this.parentNode;

      nodeRightChild.leftChild = this;
      this.parentNode = nodeRightChild;
    }
  },
  rotateToRight() {
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
        const nodeSide = this.isALeftChild() ? "leftChild" : "rightChild";
        this.parentNode[nodeSide] = nodeLeftChild;
      }

      nodeLeftChild.rightChild = this;

      nodeLeftChild.parentNode = this.parentNode;
      this.parentNode = nodeLeftChild;
    }
  },
  fixTheTree() {
    let z = this;
    while (z.parentNode && z.parentNode.getColor() === "RED") {
      if (z.parentNode.isALeftChild()) {
        const y = z.parentNode.parentNode.rightChild;
        if (y && y.getColor() === "RED") {
          // case 1
          z.parentNode.setColor("BLACK"); // case 1
          y.setColor("BLACK"); // case 1
          z.parentNode.parentNode.setColor("RED"); // case 1
          z = z.parentNode.parentNode; // case 1
        } else {
          if (!z.isALeftChild()) {
            // case 2
            z = z.parentNode; // case 2
            z.rotateToLeft(); // case 2
          }

          z.parentNode.setColor("BLACK"); // case 3
          z.parentNode.parentNode.setColor("RED"); // case 3
          z.parentNode.parentNode.rotateToRight(); // case 3
        }
      } else {
        const y = z.parentNode.parentNode.leftChild;
        if (y && y.getColor() === "RED") {
          // case 1
          z.parentNode.setColor("BLACK"); // case 1
          y.setColor("BLACK"); // case 1
          z.parentNode.parentNode.setColor("RED"); // case 1
          z = z.parentNode.parentNode; // case 1
        } else {
          if (z.isALeftChild()) {
            // case 2
            z = z.parentNode; // case 2
            z.rotateToRight(); // case 2
          }
          z.parentNode.setColor("BLACK"); // case 3
          z.parentNode.parentNode.setColor("RED"); // case 3
          z.parentNode.parentNode.rotateToLeft(); // case 3
        }
      }
    }
  }
};

module.exports = rbNodePrototype;
