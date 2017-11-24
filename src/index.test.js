'use strict'

const binaryTrees = require('.');

describe('Test For index file',() => {
  it('should a function to create new binary search tree',() => {
    expect(binaryTrees.createBST).toBeDefined();
  });

  it('should export a function to create a new Red Black Trees',() => {
    expect(binaryTrees.createRBT).toBeDefined();
  });
});
