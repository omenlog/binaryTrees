'use strict';

const prototypeRB = require('./prototype');

function createEmptyRBT() {
  return Object.assign(Object.create(prototypeRB), {
    rootNode: undefined
  });
}

function createNewTreeWith(args) {
  return createEmptyRBT().insert(args);
}

function createRBT(...args) {
  return args.length === 0 ? createEmptyRBT() : createNewTreeWith(args);
}

module.exports = {
  createRBT
};
