describe("Tree Tools Tests",() => {
  it("should export a minOf function capable of return the minimun node of one subtree",() => {
    const {createTree} = require("Tree");
    const {minOf} = require("utils/treeTools");
    const newTree = createTree(10,2,3,8,4,7,1);
    expect(minOf(newTree.rootNode.leftChild).getKey()).toBe(1);
  });
});
