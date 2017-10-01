"use strict";

const prototypeBST = require("../BST/prototype");
const {createRBNode} = require("../RBNode");
const {updateRootOf} = require("./privateFunc");

const prototypeRB = Object.assign(Object.create(prototypeBST),{
  insert(newKey){
    const newRBNode = createRBNode(newKey,"RED");
    /* calling the insert function of BST prototype object */
    Object.getPrototypeOf(this.__proto__).insert.call(this,newRBNode);
    newRBNode.fixTheTree();
    updateRootOf(this);
    return this;
  }
});

module.exports = prototypeRB;
