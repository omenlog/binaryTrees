describe("Tree Tests",() => {
  const {createTree} = require('structures/Tree');

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
      expect(anotherTree.contain(2,3)).not.toBeNull();

      const treeInitWithArray = createTree([4,5]);
      expect(treeInitWithArray.contain([4,5])).not.toBeFalsy();
    });

    test("the tree must be capable of add a new node or add several nodes in one single call to insert function",() => {
      const newTree = createTree();

      newTree.insert(3);
      expect(newTree.contain(3)).not.toBeNull();

      newTree.insert(2,4);
      expect(newTree.contain([2,4])).not.toBeNull();

      newTree.insert([1,5]);
      expect(newTree.contain(1,5)).not.toBeNull();
    });

    test("the tree is capable of check if one or several nodes are present or not, if the query is for many nodes the function return false just is one node is missing in the tree",() => {
      const newTree = createTree();
      newTree.insert(1,2,3,4,5,6);

      expect(newTree.contain(1)).not.toBeFalsy();
      expect(newTree.contain(2,3,4)).not.toBeFalsy();
      expect(newTree.contain([5,6])).not.toBeFalsy();
    });

    test("the tree is capable of find a node and return the node data or undefined if the node is not present",() => {
      const newTree = createTree(2,1,3,-14,2.5,6,5,10);

      const node3 = newTree.find(3);
      expect(node3.getKey()).toBe(3);
      expect(node3.leftChild.getKey()).toBe(2.5);
      expect(node3.rightChild.getKey()).toBe(6);

      const node9 = newTree.find(9);
      expect(node9).toBeUndefined();
    });

    test("the tree must be able to remove some node",() => {

      /* test case when the node deleted has 0 child */

      const tree1 = createTree(2,3,1);

      tree1.remove(1);
      expect(tree1.contain(1)).toBeFalsy();
      expect(tree1.rootNode.leftChild).toBeUndefined();

      tree1.remove(3);
      expect(tree1.contain(3)).toBeFalsy();
      expect(tree1.rootNode.rightChild).toBeUndefined();

      tree1.remove(2);
      expect(tree1.contain(2)).toBeFalsy();
      expect(tree1.rootNode).toBeUndefined();

      /* test case when the node removed has only one child */

      const tree2 = createTree().insert(2,3,1,4)
      tree2.remove(3);
      expect(tree2.contain(3)).toBeFalsy();
      expect(tree2.rootNode.rightChild.getKey()).toBe(4);

      const tree3 = createTree().insert(2,1,3,2.5,6,5)
      tree3.remove(6);
      expect(tree3.contain(6)).toBeFalsy();
      expect(tree3.rootNode.rightChild.rightChild.getKey()).toBe(5);

      expect(tree3.remove(234)).toEqual(tree3);

      const tree4 = createTree().insert(1,4,3,5);
      tree4.remove(1);
      expect(tree4.contain(1)).toBeFalsy();
      expect(tree4.rootNode.getKey()).toBe(4);

      /* test cases when the node remove has two child */

      const tree5 = createTree().insert(2,1,3,2.5,6,5);

      tree5.remove(3);
      expect(tree5.contain(3)).toBeFalsy();
      expect(tree5.rootNode.rightChild.getKey()).toBe(5);
      expect(tree5.rootNode.rightChild.leftChild.getKey()).toBe(2.5);
      expect(tree5.rootNode.rightChild.rightChild.getKey()).toBe(6);

      tree5.remove(5);
      expect(tree5.contain(5)).toBeFalsy();
      expect(tree5.rootNode.leftChild.getKey()).toBe(1);
      expect(tree5.rootNode.rightChild.getKey()).toBe(6);
      expect(tree5.rootNode.rightChild.leftChild.getKey()).toBe(2.5);
      expect(tree5.rootNode.rightChild.rightChild).toBeUndefined();

      tree5.remove(2);
      expect(tree5.contain(2)).toBeFalsy();
      expect(tree5.rootNode.getKey()).toBe(2.5);
    });
  });
});
