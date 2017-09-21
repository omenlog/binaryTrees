'use strict';

describe('Red Black Tree tests',() => {
  const {createRBT} = require('structures/RBT');

  it('should export a createRBT function',() => {
    expect(createRBT).toBeDefined();
  });
});
