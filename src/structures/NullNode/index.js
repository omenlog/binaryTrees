"use strict";

const nullNode = {
  getKey() {
    return undefined;
  },
  getColor() {
    return "BLACK";
  },
  isALeaf() {
    return true;
  }
};

module.exports = nullNode;
