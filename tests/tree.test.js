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

    test("the tree must be capable of add a new node or add varius nodes in one single call to insert function",() => {
      const newTree = createTree();

      newTree.insert(1);
      expect(newTree.contain(1)).not.toBeNull();

      newTree.insert(2,3);
      expect(newTree.contain(2)).not.toBeNull();
      expect(newTree.contain(3)).not.toBeNull();

      newTree.insert([4,5]);
      expect(newTree.contain(4)).not.toBeNull();
      expect(newTree.contain(5)).not.toBeNull();
    });

    // test("the tree must be capable of return the minimun value of one subtree",() => {
    //   const newTree = createTree();
    //   newTree.insert(3).insert(2).
    // });
  });
});
