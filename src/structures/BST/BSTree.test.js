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

    test('if the value that being inserted are in the tree then the tree are unmodified',() => {
      const newTree = createBST(1,2,3);
      newTree.insert(3);
      newTree.remove(3);
      expect(newTree.contain(3)).toBeFalsy();
    });

    test('if the value being deleted if not present in the tree then this remain unchanged',() => {
      const newBST = createBST().insert(2,3,4);

      newBST.remove(10);
      newBST.remove(23);
      newBST.remove(20);

      expect(newBST.contain(2)).toBeTruthy();
      expect(newBST.contain(3)).toBeTruthy();
      expect(newBST.contain(4)).toBeTruthy();

      expect(newBST.rootNode.getValue()).toBe(2);
    });

    test('the tree is capable of check if one or several nodes are present or not, if the query is for many nodes the function return false just is one node is missing in the tree', () => {
      const newTree = createBST();
      newTree.insert(1, 2, 3, 4, 5, 6);

      expect(newTree.contain(1)).toBeTruthy();
      expect(newTree.contain(2, 3, 4)).toBeTruthy();
      expect(newTree.contain([5, 6])).toBeTruthy();
      expect(newTree.contain(10)).toBeFalsy();
      expect(newTree.contain(2,11)).toBeFalsy();
    });

    it('should throw an error when the contain function is call without any argument',() => {
      const {missingArgInContain} = require('./errors');
      const newTree = createBST();
      newTree.insert(1,2,3,4);
      expect(() => newTree.contain()).toThrowError(missingArgInContain);
    });

    it('should throw an error when the find function is call without any argument',() => {
      const {missingArgInFind} = require('./errors');
      const newTree = createBST();
      newTree.insert(1,2,3,4);
      expect(() => newTree.find()).toThrowError(missingArgInFind);
    });

    test('the tree is capable of find a node and return the node data or undefined if the node is not present', () => {
      const newTree = createBST(2, 1, 3, -14, 2.5, 6, 5, 10);

      const node3 = newTree.find(3);
      expect(node3.getValue()).toBe(3);
      expect(node3.leftChild.getValue()).toBe(2.5);
      expect(node3.rightChild.getValue()).toBe(6);

      const node9 = newTree.find(9);
      expect(node9).toBeUndefined();
    });

    test('the tree is capable of find several nodes in one single call the value not present in the tree are ignored',() => {
      const newTree = createBST(1,3,5,2,4,6);
      const treeValues = newTree.find(1,10,2,20,3,30);

      expect(treeValues).toHaveLength(3);
      expect(treeValues[0].getValue()).toBe(1);
      expect(treeValues[1].getValue()).toBe(2);
      expect(treeValues[2].getValue()).toBe(3);

      const anotherValues = newTree.find([4,5,6]);
      expect(anotherValues[0].getValue()).toBe(4);
      expect(anotherValues[1].getValue()).toBe(5);
      expect(anotherValues[2].getValue()).toBe(6);

      const combiningValues = newTree.find(1,[2,3],4,[100]);
      expect(combiningValues).toHaveLength(4);

      const emptyValues = newTree.find(100,101,102,103);
      expect(emptyValues).toHaveLength(0);
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
      expect(tree2.rootNode.rightChild.getValue()).toBe(4);

      const tree3 = createBST().insert(2, 1, 3, 2.5, 6, 5);
      tree3.remove(6);
      expect(tree3.contain(6)).toBeFalsy();
      expect(tree3.rootNode.rightChild.rightChild.getValue()).toBe(5);

      expect(tree3.remove(234)).toEqual(tree3);

      const tree4 = createBST().insert(1, 4, 3, 5);
      tree4.remove(1);
      expect(tree4.contain(1)).toBeFalsy();
      expect(tree4.rootNode.getValue()).toBe(4);

      /* test cases when the node remove has two child */

      const tree5 = createBST().insert(2, 1, 3, 2.5, 6, 5);

      tree5.remove(3);
      expect(tree5.contain(3)).toBeFalsy();
      expect(tree5.rootNode.rightChild.getValue()).toBe(5);
      expect(tree5.rootNode.rightChild.leftChild.getValue()).toBe(2.5);
      expect(tree5.rootNode.rightChild.rightChild.getValue()).toBe(6);

      tree5.remove(5);
      expect(tree5.contain(5)).toBeFalsy();
      expect(tree5.rootNode.leftChild.getValue()).toBe(1);
      expect(tree5.rootNode.rightChild.getValue()).toBe(6);
      expect(tree5.rootNode.rightChild.leftChild.getValue()).toBe(2.5);
      expect(tree5.rootNode.rightChild.rightChild).toBeUndefined();

      tree5.remove(2);
      expect(tree5.contain(2)).toBeFalsy();
      expect(tree5.rootNode.getValue()).toBe(2.5);
    });

    test('the tree must be capable of return the node with the max value in the tree or undefined if it\'s and empty tree', () => {
      const newTree = createBST();
      expect(newTree.max()).toBeUndefined();

      newTree.insert(12.3, 23, 1, 4, -23, 34, 1000, 7, 0, 43);
      expect(newTree.max().getValue()).toBe(1000);
    });

    // test('the tree is capable of return and array with a specified number of major values in the',() => {
    //   const newTree = createBST(1,3,2,4);
    //   const twoMajorsValues = newTree.maxValues(2);
    //
    //   expect(twoMajorsValues).toHaveLength(2);
    //   expect(twoMajorsValues[0]).toBe(4);
    //   expect(twoMajorsValues[1]).toBe(3);
    //
    //   const majorValues = newTree.maxValues(10);
    //   expect(majorValues).toHaveLength(4);
    //   expect(majorValues[0]).toBe(4);
    //   expect(majorValues[1]).toBe(3);
    //   expect(majorValues[2]).toBe(2);
    //   expect(majorValues[3]).toBe(1);
    // });

    test('the tree must be capable of return the max value that it store',() => {
      const newTree = createBST(1,3,5,7,9,2,4,6,8,10);
      expect(newTree.minValue()).toBe(1);
      expect(newTree.maxValue()).toBe(10);

      const emptyTree = createBST();
      expect(emptyTree.maxValue()).toBeUndefined();
    });

    test('the must be capable of remove more than one node in one single call to remove function',() => {
      const newTree = createBST(1,3,5,2,4);

      newTree.remove(2,3);
      expect(newTree.contain(2)).toBeFalsy();
      expect(newTree.contain(3)).toBeFalsy();

      newTree.remove([4,5]);
      expect(newTree.contain(4)).toBeFalsy();
      expect(newTree.contain(5)).toBeFalsy();
    });

    test('the tree must be capable of return the node with the min value in the tree or undefined if it\'s and empty tree', () => {
      const newTree = createBST();
      expect(newTree.min()).toBeUndefined();

      newTree.insert(12.3, 23, 1, 4, -23, 34, 1000, 7, 0, 43);
      expect(newTree.min().getValue()).toBe(-23);
    });

    test('the tree can create an iterator to iterate over the entire tree using inorder tree walk', () => {
      const newTree = createBST(3, 2, 5, 1, 4);

      const it = newTree.iterator();

      expect(it.next().value).toBe(1);
      expect(it.next().value).toBe(2);
      expect(it.next().value).toBe(3);
      expect(it.next().value).toBe(4);
      expect(it.next().value).toBe(5);

      expect(it.next()).toMatchObject({ value: undefined, done: true });
      expect(it.next()).toMatchObject({ value: undefined, done: true });

      let i = 1;
      for (let value of newTree) {
        expect(value).toBe(i++);
      }

      const emptyIterator = createBST().iterator();
      expect(emptyIterator.next()).toMatchObject({value: undefined,done: true});
    });

    test('the tree iterator must be end when the return method of iterator is called',() => {
      const it = createBST(3, 2, 5, 1, 4).iterator();

      expect(it.next().value).toBe(1);
      expect(it.return()).toMatchObject({value: undefined,done: true});
      expect(it.next()).toMatchObject({value: undefined,done:true});
      expect(it.return(10)).toMatchObject({value:10,done:true});
    });

    test('the tree have a reduce method that allow reduce the tree to a single value, the tree is recorred using in order process',() => {
      const newTree = createBST(4,1,2,5,3);

      const sumTotal = newTree.reduce((acc,value) => {
        return acc + value;
      });

      const productTotal = newTree.reduce((acc,value) => {
        return acc*value;
      });

      const nodeString = newTree.reduce((acc,value) => {
        return acc + value.toString();
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

    test('the tree have a filter method that allow filter tree nodes that not satisfied some restriction',() => {
      const newTree = createBST(4,1,2,7,6);
      newTree.filter(v => v%2 === 0);

      expect(newTree.contain(1)).toBeFalsy();
      expect(newTree.contain(7)).toBeFalsy();
      expect(newTree.contain(2)).toBeTruthy();
      expect(newTree.contain(4)).toBeTruthy();
      expect(newTree.contain(6)).toBeTruthy();
    });
  });
});
