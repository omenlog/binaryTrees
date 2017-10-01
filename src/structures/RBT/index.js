"use strict";

const prototypeRB = require("./prototype");

function createRBT(){
  return Object.assign(Object.create(prototypeRB),{
    rootNode: undefined
  });
}

module.exports = {
  createRBT
};
