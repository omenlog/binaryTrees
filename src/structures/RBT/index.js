'use strict';

const prototypeRB = require('./prototype');

function createRBT(){
  return Object.assign(Object.create(prototypeRB),{});
}

module.exports = {
  createRBT
};
