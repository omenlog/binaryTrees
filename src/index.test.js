'use strict'

describe('Test For index file',() => {
  it('should a function to create new binary search tree',() => {
    const {createBST} = require('./index');
    expect(createBST).toBeDefined();
  });

  it('should export a function to create a new Red Black Trees',() => {
    const {createRBT} = require('./index');
    expect(createRBT).toBeDefined();
  });
});
