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

  it("shoudl create a new tree capable of remove nodes from it correctly",() => {
    const newRBTree = createRBT();
    newRBTree.insert(1,2,3,5);

    newRBTree.remove(3);
    expect(newRBTree.contain(3)).toBeFalsy();
    expect(newRBTree.find(5).getColor()).toBe("BLACK");

    const anotherTree = createRBT();
    anotherTree.insert(1,2,4,5,6,10).remove(4);
    expect(anotherTree.contain(4)).toBeFalsy();

    const treeWithTwoNodes = createRBT().insert(1,2);
    treeWithTwoNodes.remove(1);
    expect(treeWithTwoNodes.contain(1)).toBeFalsy();
    expect(treeWithTwoNodes.find(2).getColor()).toBe("BLACK");

    const testTree = createRBT().insert(6,10,32,21,8,9,34,20);

    testTree.remove(21);
    expect(testTree.find(20).getColor()).toBe("BLACK");

    testTree.remove(10);
    expect(testTree.rootNode.getKey()).toBe(20);
    expect(testTree.find(32).getColor()).toBe("BLACK");
    expect(testTree.find(32).leftChild.isALeaf()).toBeTruthy();
    expect(testTree.find(32).rightChild.getKey()).toBe(34);
    expect(testTree.find(34).getColor()).toBe("RED");

    const treeWithOneNode = createRBT().insert(16);
    treeWithOneNode.remove(16);
    expect(treeWithOneNode.rootNode).toBeUndefined();
    expect(treeWithOneNode.contain(16)).toBeFalsy();
  });
});
