'use strict';

describe('test for Red Black Tree Nodes',() => {
  const {createRBNode} = require('structures/RBNode');

  it('should export a function for allow the creation of new nodes',() => {
    expect(createRBNode).toBeDefined();
  });

  describe('tests for createRBNode function',() => {
    it('should create a new node with the color property private',() => {
      const newNode =  createRBNode(5);
      expect(newNode.hasOwnProperty('color')).toBeFalsy();
    });

    it('should create a new node with the color property equal to BLACK by default and this can be configured by the user',() => {
      const newNode = createRBNode(1);
      expect(newNode.getColor()).toBe('BLACK');

      newNode.setColor('RED');
      expect(newNode.getColor()).toBe('RED');

      const redNode = createRBNode(10,'RED');
      expect(redNode.getColor()).toBe('RED');

      const blackNode = createRBNode(12,'BLACK');
      expect(blackNode.getColor()).toBe('BLACK');
    });
  });

  describe('test for rotations of nodes',() => {
    test('every new node created must be capable to make a left rotation over it in the tree and the right rotation as well',() => {
      /* creating tree nodes*/

      const node26 = createRBNode(26, 'BLACK');
      const rootNode = node26;

      const node17 = createRBNode(17, 'RED');
      const node10 = createRBNode(10, 'RED');
      const node15 = createRBNode(15, 'RED');
      const node14 = createRBNode(14, 'BLACK');
      const node16 = createRBNode(16, 'BLACK');
      const node21 = createRBNode(21, 'BLACK');
      const node19 = createRBNode(19, 'BLACK');
      const node23 = createRBNode(23, 'BLACK');

      /* setup nodes links */
      rootNode.parentNode = undefined;
      rootNode.leftChild = node17;

      node17.parentNode  = rootNode;
      node17.leftChild = node14;
      node17.rightChild = node21;

      node14.parentNode = node17;
      node14.rightChild = node16;
      node14.leftChild = node10;

      node10.parentNode = node14;
      node16.parentNode = node14;

      node16.leftChild = node15;
      node15.parentNode = node16;

      node21.parentNode = node17;
      node21.leftChild = node19;
      node21.rightChild = node23;

      node19.parentNode = node21;
      node23.parentNode = node21;

      /* making the left rotation over node17 */
      node17.rotateToLeft();

      /* after the rotation */
      expect(node26.leftChild.getKey()).toBe(21);

      expect(node21.leftChild.getKey()).toBe(17);
      expect(node21.rightChild.getKey()).toBe(23);

      expect(node17.leftChild.getKey()).toBe(14);
      expect(node17.rightChild.getKey()).toBe(19);

      /* now making the right rotation over node17 */
      node21.rotateToRight();

      /* after the rotation */
      expect(node26.leftChild.getKey()).toBe(17);

      expect(node17.rightChild.getKey()).toBe(21);

      expect(node21.leftChild.getKey()).toBe(19);

      node16.rotateToRight();

      expect(node14.rightChild.getKey()).toBe(15);
      expect(node15.rightChild.getKey()).toBe(16);
      expect(node16.rightChild).toBeUndefined();
      expect(node16.leftChild).toBeUndefined();

      node15.rotateToLeft();

      expect(node14.rightChild.getKey()).toBe(16);

      /* creating another tree for tests purpose */
      const node2 = createRBNode(2, 'BLACK');
      const node1 = createRBNode(1, 'BLACK');
      const node3 = createRBNode(3, 'BLACK');

      /* setup node links */
      node2.leftChild = node1;
      node1.parentNode = node2;
      node2.rightChild = node3;
      node3.parentNode = node2;

      node2.rotateToLeft();

      expect(node3.parentNode).toBeUndefined();
      expect(node3.leftChild.getKey()).toBe(2);
      expect(node3.rightChild).toBeUndefined();

      expect(node2.parentNode.getKey()).toBe(3);
      expect(node2.rightChild).toBeUndefined();
      expect(node2.leftChild.getKey()).toBe(1);

      expect(node1.parentNode.getKey()).toBe(2);

      node3.rotateToRight();

      expect(node2.parentNode).toBeUndefined();
      expect(node2.rightChild.getKey()).toBe(3);
      expect(node3.parentNode.getKey()).toBe(2);

      node2.rotateToLeft();
      node2.rotateToRight();

      expect(node3.parentNode).toBeUndefined();
      expect(node3.leftChild.getKey()).toBe(1);
      expect(node1.rightChild.getKey()).toBe(2);
      expect(node2.parentNode.getKey()).toBe(1);
      expect(node2.leftChild).toBeUndefined();
      expect(node2.rightChild).toBeUndefined();
    });

    test('if one node cannot rotate to left because it has not right child then one exception must be throw',() => {
      const node1 = createRBNode(1, 'BLACK');
      const {unableToMakeLeftRotation} = require('structures/RBNode/errors');
      expect(() => node1.rotateToLeft()).toThrowError(unableToMakeLeftRotation);
    });

    test('if a node cannot rotate to the right because it has not left children then one exception must be throw',() => {
      const node = createRBNode(1,'BLACK');
      const {unableToMakeRightRotation} = require('structures/RBNode/errors');
      expect(unableToMakeRightRotation).toBeDefined();
      expect(() => node.rotateToRight()).toThrowError(unableToMakeRightRotation);
    });
  });
});
