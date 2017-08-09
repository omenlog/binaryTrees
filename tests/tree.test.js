describe("Tree Tests",() => {
  const {createTree} = require('Tree');

  it("should export a createTree function",() => {
    expect(createTree).toBeDefined();
  });

  describe("createTree function",() => {

    it("should create a new tree and empty tree with the rootNode property 'undefined' when no argument is passed to factory function",() => {
      const newTree = createTree();
      expect(newTree).toMatchObject({rootNode: undefined});
    });

    it("should create a new tree with nodes initialized if values are pased as argument to factory function", () => {
      const newTree = createTree(1);
      expect(newTree.contain(1)).not.toBeNull();

      const anotherTree = createTree(2,3);
      expect(anotherTree.contain(2)).not.toBeNull();
      expect(anotherTree.contain(3)).not.toBeNull();

      const treeInitWithArray = createTree([4,5]);
      expect(treeInitWithArray.contain(4)).not.toBeNull();
      expect(treeInitWithArray.contain(5)).not.toBeNull();
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
