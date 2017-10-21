"use strict";

describe("Null Nodes Tests", () => {
  const nullNode = require("./index");

  it("should export a nullNode object", () => {
    expect(nullNode).toBeDefined();
  });

  test("null Node has a black color", () => {
    expect(nullNode.getColor()).toBe("BLACK");
  });

  test("null Node has undefined as it's key", () => {
    expect(nullNode.getKey()).toBeUndefined();
  });

  test("null nodes hasn't children in any side", () => {
    expect(nullNode.leftChild).toBeUndefined();
    expect(nullNode.rightChild).toBeUndefined();
  });

  test("null nodes always is a leaf node", () => {
    expect(nullNode.isALeaf()).toBeTruthy();
  });
});
