describe("Tree Tests",() => {
  const {createTree} = require('Tree');

  it("should export a createTree function",() => {
    expect(createTree).toBeDefined();
  });

  describe("createTree function",() => {

    it("should create a new tree with the rootNode property 'undefined'",() => {
      const newTree = createTree();
      expect(newTree).toMatchObject({rootNode: undefined});
    });

    test("the new tree must be able to add a new node",() => {
      const newTree = createTree();
      newTree.insert(4);
      expect(newTree.contain(4)).toBeTruthy();
    });
  });
});
