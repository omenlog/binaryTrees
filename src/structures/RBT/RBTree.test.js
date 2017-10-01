"use strict";

describe("Red Black Tree tests", () => {
  const { createRBT } = require("structures/RBT");
  const {createRBNode} = require("structures/RBNode");

  it("should export a createRBT function", () => {
    expect(createRBT).toBeDefined();
  });

  it("should create a new tree with an own property rootNode equal to undefined", () => {
    const newRBTree = createRBT();
    expect(newRBTree.hasOwnProperty("rootNode")).toBeTruthy();
    expect(newRBTree.rootNode).toBeUndefined();
  });

  it("should create a new tree that allow introduce new nodes in the tree", () => {
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

  it("should create a new tree that allow insert various nodes in just one call", () => {
    const newRBTree = createRBT();
    newRBTree.insert(3, 1, 2);

    expect(newRBTree.contain(1)).toBeTruthy();
    expect(newRBTree.contain(2)).toBeTruthy();
    expect(newRBTree.contain(3)).toBeTruthy();
  });

  it("should create a new tree capable of insert new nodes taking from and array",() => {
    const newRBTree = createRBT();
    newRBTree.insert([2,3,1]);

    expect(newRBTree.contain(1)).toBeTruthy();
    expect(newRBTree.contain(2)).toBeTruthy();
    expect(newRBTree.contain(3)).toBeTruthy();
  });

  it("should create a new tree capable of insert new nodes object passed as argument to insert function",() => {
    const newRBTree = createRBT();
    const node1 = createRBNode(1,"RED");

    newRBTree.insert(node1);
    expect(newRBTree.rootNode.getKey()).toBe(1);
    expect(newRBTree.rootNode.getColor()).toBe("BLACK");
  });

  it("should create a new tree capable of insert nodes of different form in one single call",() => {
    const newRBTree = createRBT();

    const node4 = createRBNode(4,"RED");
    newRBTree.insert([2,1],node4,3);

    expect(newRBTree.contain(1)).toBeTruthy();
    expect(newRBTree.contain(2)).toBeTruthy();
    expect(newRBTree.contain(3)).toBeTruthy();
    expect(newRBTree.contain(4)).toBeTruthy();
  });
});
