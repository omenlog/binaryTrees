'use strict';

describe('Tree Tests', () => {
  const { createBST } = require('structures/BST');
  const {createNode} = require('structures/Node');

  it('should export a createBST function', () => {
    expect(createBST).toBeDefined();
  });

  describe('createBST function', () => {
    it('should create a new tree and empty tree with the rootNode property \'undefined\' when no argument is passed to factory function', () => {
      const newTree = createBST();
      expect(newTree).toMatchObject({ rootNode: undefined });
    });

    it('should create a new tree with nodes initialized if values are pased as argument to factory function', () => {
      const newTree = createBST(1);
      expect(newTree.contain(1)).not.toBeNull();

      const anotherTree = createBST(2, 3);
      expect(anotherTree.contain(2, 3)).not.toBeNull();

      const treeInitWithArray = createBST([4, 5]);
      expect(treeInitWithArray.contain([4, 5])).not.toBeFalsy();
    });

    it('should create a new tree with nodes inside passed as array of values',() => {
      const newTree = createBST([2,1,3]);
      expect(newTree.contain(1,2,3)).not.toBeFalsy();
    });

    test('the tree must be capable of add a new node or add several nodes in one single call to insert function', () => {
      const newTree = createBST();

      newTree.insert(3);
      expect(newTree.contain(3)).toBeTruthy();

      newTree.insert(2, 4);
      expect(newTree.contain([2, 4])).toBeTruthy();

      newTree.insert([1, 5]);
      expect(newTree.contain(1, 5)).toBeTruthy();
    });

    test('the tree must be able to add a new node passing as parameter to insert function',() => {
      const newTree = createBST(3,5,18,6);
      const newNode = createNode(10);

      expect(newTree.contain(10)).toBeFalsy();
      newTree.insert(newNode);
      expect(newTree.contain(10)).toBeTruthy();
    });

    test('the tree is capable to insert new values and node objects in the same call',() => {
      const newTree = createBST();
      const node10 = createNode(10);
      const node5 = createNode(5);
      newTree.insert(node5,3,node10,1);

      expect(newTree.contain(1)).toBeTruthy();
      expect(newTree.contain(10)).toBeTruthy();
      expect(newTree.contain(3)).toBeTruthy();
      expect(newTree.contain(5)).toBeTruthy();
    });

    test('the tree is capable of check if one or several nodes are present or not, if the query is for many nodes the function return false just is one node is missing in the tree', () => {
      const newTree = createBST();
      newTree.insert(1, 2, 3, 4, 5, 6);

      expect(newTree.contain(1)).toBeTruthy();
      expect(newTree.contain(2, 3, 4)).toBeTruthy();
      expect(newTree.contain([5, 6])).toBeTruthy();
      expect(newTree.contain(10)).toBeFalsy();
    });

    test('the tree is capable of find a node and return the node data or undefined if the node is not present', () => {
      const newTree = createBST(2, 1, 3, -14, 2.5, 6, 5, 10);

      const node3 = newTree.find(3);
      expect(node3.getKey()).toBe(3);
      expect(node3.leftChild.getKey()).toBe(2.5);
      expect(node3.rightChild.getKey()).toBe(6);

      const node9 = newTree.find(9);
      expect(node9).toBeUndefined();
    });

    test('the tree must be able to remove some node', () => {
      /* test case when the node deleted has 0 child */

      const tree1 = createBST(2, 3, 1);

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

      const tree2 = createBST().insert(2, 3, 1, 4);
      tree2.remove(3);
      expect(tree2.contain(3)).toBeFalsy();
      expect(tree2.rootNode.rightChild.getKey()).toBe(4);

      const tree3 = createBST().insert(2, 1, 3, 2.5, 6, 5);
      tree3.remove(6);
      expect(tree3.contain(6)).toBeFalsy();
      expect(tree3.rootNode.rightChild.rightChild.getKey()).toBe(5);

      expect(tree3.remove(234)).toEqual(tree3);

      const tree4 = createBST().insert(1, 4, 3, 5);
      tree4.remove(1);
      expect(tree4.contain(1)).toBeFalsy();
      expect(tree4.rootNode.getKey()).toBe(4);

      /* test cases when the node remove has two child */

      const tree5 = createBST().insert(2, 1, 3, 2.5, 6, 5);

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

    test('the tree must be capable of return the node with the max value in the tree or undefined if it\'s and empty tree', () => {
      const newTree = createBST();
      expect(newTree.max()).toBeUndefined();

      newTree.insert(12.3, 23, 1, 4, -23, 34, 1000, 7, 0, 43);
      expect(newTree.max().getKey()).toBe(1000);
    });

    test('the tree must be capable of return the node with the mmin value in the tree or undefined if it\'s and empty tree', () => {
      const newTree = createBST();
      expect(newTree.min()).toBeUndefined();

      newTree.insert(12.3, 23, 1, 4, -23, 34, 1000, 7, 0, 43);
      expect(newTree.min().getKey()).toBe(-23);
    });

    test('the tree can create an iterator to iterate over the entire tree using inorder tree walk', () => {
      const newTree = createBST(3, 2, 5, 1, 4);

      const it = newTree.iterator();

      expect(it.next().value.getKey()).toBe(1);
      expect(it.next().value.getKey()).toBe(2);
      expect(it.next().value.getKey()).toBe(3);
      expect(it.next().value.getKey()).toBe(4);
      expect(it.next().value.getKey()).toBe(5);

      expect(it.next()).toMatchObject({ value: undefined, done: true });
      expect(it.next()).toMatchObject({ value: undefined, done: true });

      let i = 1;
      for (let node of newTree) {
        expect(node.getKey()).toBe(i++);
      }

      const emptyIterator = createBST().iterator();
      expect(emptyIterator.next()).toMatchObject({value: undefined,done: true});
    });

    test('the tree iterator must be end when the return method of iterator is called',() => {
      const it = createBST(3, 2, 5, 1, 4).iterator();

      expect(it.next().value.getKey()).toBe(1);
      expect(it.return()).toMatchObject({value: undefined,done: true});
      expect(it.next()).toMatchObject({value: undefined,done:true});
      expect(it.return(10)).toMatchObject({value:10,done:true});
    });

    test('the tree have a reduce method that allow reduce the tree to a single value, the tree is recorred using in order process',() => {
      const newTree = createBST(4,1,2,5,3);

      const sumTotal = newTree.reduce((acc,node) => {
        return acc + node.getKey();
      });

      const productTotal = newTree.reduce((acc,node) => {
        return acc*node.getKey();
      });

      const nodeString = newTree.reduce((acc,node) => {
        return acc + node.getKey().toString();
      });

      expect(sumTotal).toBe(15);
      expect(nodeString).toBe('12345');
      expect(productTotal).toBe(120);

      const emptyTree = createBST();

      const finalValue = emptyTree.reduce((acc,val) => val);
      const initialAcc = emptyTree.reduce((acc,val) => val,10);

      expect(finalValue).toBeUndefined();
      expect(initialAcc).toBe(10);
    });
  });
});
