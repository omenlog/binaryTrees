'use strict';

describe('Node Tests', () => {
  const { createNode } = require('structures/Node');
  const { createBST } = require('structures/BST');

  it('should export a createNode function', () => {
    expect(createNode).toBeDefined();
  })

  describe('createNode function', () => {
    it('should create a new node with leftChild,rightChild and parentNode equal to undefined', () => {
      const newNode = createNode(1);
      expect(newNode).toMatchObject({
        leftChild: undefined,
        rightChild: undefined,
        parentNode: undefined
      });
    });

    it('should create a new node with the key property private', () => {
      const newNode = createNode(10);
      expect(newNode.hasOwnProperty('key')).toBeFalsy();
    });

    it('should throw a new exception when no parameter are passed to createNode',() => {
      const {missingNodeValue} = require('structures/Node/errors');
      expect(createNode).toThrowError(missingNodeValue);
    });

    it('should config getter and setter for the key property', () => {
      const newNode = createNode(5);
      newNode.setKey(10);
      expect(newNode.getKey()).toBe(10);
    });

    test('every node is capable of setup correctly its children without specific the child side', () => {
      const newNode = createNode(2);
      newNode.insertChild(1);
      newNode.insertChild(3);
      expect(newNode.leftChild.getKey()).toBe(1);
      expect(newNode.rightChild.getKey()).toBe(3);
    });

    test('every node is capable of tell if it has some children', () => {
      const newNode = createNode(10);
      expect(newNode.hasChildrens()).toBeFalsy();
      newNode.insertChild(20);
      expect(newNode.hasChildrens()).toBeTruthy();
    });

    test('every node is capable of return its childrens', () => {
      const newNode = createNode(12);
      expect(newNode.childrens()).toMatchObject({
        leftChild: undefined,
        rightChild: undefined
      });
    });

    test('every node is capable of take a value and setup this as one of its childrens', () => {
      const newNode = createNode(10);
      newNode.insertChild(20);
      newNode.insertChild(5);
      expect(newNode.leftChild.getKey()).toBe(5);
      expect(newNode.rightChild.getKey()).toBe(20);
    });

    test('every node is capable of insert its two child correctly in one single call to insertChilds function',() => {
      const newNode = createNode(2);
      newNode.insertChildrens(3,1);
      expect(newNode.leftChild.getKey()).toBe(1);
      expect(newNode.rightChild.getKey()).toBe(3);
    });

    test('every node is capable of say if it have almost one child', () => {
      const newNode = createNode(2).insertChild(1);
      expect(newNode.hasOneChild()).toBeTruthy();
      newNode.insertChild(3);
      expect(newNode.hasOneChild()).toBeFalsy();
      const anotherNode = createNode(1);
      expect(anotherNode.hasOneChild()).toBeFalsy();
    });

    test('every node is capable of return is succesor or undefined if it store the greater value in the tree', () => {
      const newTree = createBST(7, 1, 5, 10, -3, 4, 9, 0, 8, 3, 2.5, 2);

      const node5 = newTree.find(5);
      expect(node5.succesor().getKey()).toBe(7);

      const node0 = newTree.find(0);
      expect(node0.succesor().getKey()).toBe(1);

      const node1 = newTree.find(1);
      expect(node1.succesor().getKey()).toBe(2);

      const node10 = newTree.find(10);
      expect(node10.succesor()).toBeUndefined();
    });

    test('every node is capable of return is predecesor or undefined if it store the minimun value in the tree', () => {
      const newTree = createBST(7, 1, 5, 10, -3, 4, 9, 0, 8, 3, 2.5, 2);

      const node5 = newTree.find(5);
      expect(node5.predecesor().getKey()).toBe(4);

      const node0 = newTree.find(0);
      expect(node0.predecesor().getKey()).toBe(-3);

      const node1 = newTree.find(1);
      expect(node1.predecesor().getKey()).toBe(0);

      const node10 = newTree.find(-3);
      expect(node10.predecesor()).toBeUndefined();
    });

    test('every node is capable to tell if it is a leftChild',() => {
      const newTree = createBST(7,1,10);

      const node1 = newTree.find(1);
      const node10 = newTree.find(10);

      expect(node1.isALeftChild()).toBe(true);
      expect(node10.isALeftChild()).toBe(false);
    });
  });
});
