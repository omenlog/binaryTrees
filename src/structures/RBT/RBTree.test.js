"use strict";

describe("Red Black Tree tests",() => {
  const {createRBT} = require("structures/RBT");

  it("should export a createRBT function",() => {
    expect(createRBT).toBeDefined();
  });

  it("should create a new tree that allow introduce new nodes in the tree",() => {
    const newRBTree = createRBT();
    newRBTree.insert(1);
    newRBTree.insert(3);
    newRBTree.insert(2);

    expect(newRBTree.rootNode.getKey()).toBe(2);
    expect(newRBTree.rootNode.getColor()).toBe("BLACK");
    expect(newRBTree.rootNode.leftChild.getKey()).toBe(1);
    expect(newRBTree.rootNode.rightChild.getKey()).toBe(3);
    expect(newRBTree.rootNode.leftChild.getColor()).toBe("RED");
    expect(newRBTree.rootNode.rightChild.getColor()).toBe("RED");
  });
});
