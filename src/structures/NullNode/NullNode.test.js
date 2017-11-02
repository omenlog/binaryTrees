'use strict';

const nullNode = require('./index');
const {createNode} = require('../Node');

describe('Null Nodes Tests', () => {
  it('should export a nullNode object', () => {
    expect(nullNode).toBeDefined();
  });

  test('null Node has a black color', () => {
    expect(nullNode.getColor()).toBe('BLACK');
  });

  test('null Node has undefined as it\'s key', () => {
    expect(nullNode.getKey()).toBeUndefined();
  });

  test('null nodes hasn\'t children in any side', () => {
    expect(nullNode.leftChild).toBeUndefined();
    expect(nullNode.rightChild).toBeUndefined();
  });

  test('null nodes always is a leaf node', () => {
    expect(nullNode.isALeaf()).toBeTruthy();
  });

  test('null node can say if it are left or right child',() => {
    const newNode = createNode(1);
    newNode.leftChild = nullNode;
    nullNode.parentNode = newNode;
    expect(nullNode.isALeftChild()).toBeTruthy();

    const anotherNode = createNode(2);
    anotherNode.rightChild = nullNode;
    nullNode.parentNode = anotherNode;
    expect(nullNode.isALeftChild()).toBeFalsy();
  });
});
