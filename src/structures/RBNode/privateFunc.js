"use strict";

const rbNodePrototype = require("./prototype");
const {createNode} = require("../Node/index");

function buildNodePrototype(nodeKey){
  return Object.assign(createNode(nodeKey), rbNodePrototype);
}

module.exports = {
  buildNodePrototype
};
