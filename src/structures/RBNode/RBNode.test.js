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

    it('should create a new node with two black leafs as children',() => {
      const newNode = createRBNode(1, 'RED');
      expect(newNode.leftChild.getColor()).toBe('BLACK');
      expect(newNode.leftChild.getValue()).toBeUndefined();
      expect(newNode.rightChild.getValue()).toBeUndefined();
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
        rootNode.insertChild(node17);
        node17.insertChildrens(node14,node21);
        node14.insertChildrens(node10,node16);
        node16.insertChild(node15);
        node21.insertChildrens(node19,node23);

        /* making the left rotation over node17 */
        node17.rotateToLeft({rootNode});

        /* after the rotation */
        expect(node26.leftChild.getValue()).toBe(21);

        expect(node21.leftChild.getValue()).toBe(17);
        expect(node21.rightChild.getValue()).toBe(23);

        expect(node17.leftChild.getValue()).toBe(14);
        expect(node17.rightChild.getValue()).toBe(19);

        /* now making the right rotation over node17 */
        node21.rotateToRight({rootNode});

        /* after the rotation */
        expect(node26.leftChild.getValue()).toBe(17);

        expect(node17.rightChild.getValue()).toBe(21);

        expect(node21.leftChild.getValue()).toBe(19);

        node16.rotateToRight({rootNode});

        expect(node14.rightChild.getValue()).toBe(15);
        expect(node15.rightChild.getValue()).toBe(16);
        expect(node16.rightChild.getValue()).toBeUndefined();
        expect(node16.leftChild.getValue()).toBeUndefined();

        node15.rotateToLeft({rootNode});

        expect(node14.rightChild.getValue()).toBe(16);

        /* creating another tree for tests purpose */
        const node2 = createRBNode(2, 'BLACK');
        const node1 = createRBNode(1, 'BLACK');
        const node3 = createRBNode(3, 'BLACK');

        /* setup node links */
        node2.insertChildrens(node1,node3);

        node2.rotateToLeft({rootNode});

        expect(node3.parentNode).toBeUndefined();
        expect(node3.leftChild.getValue()).toBe(2);
        expect(node3.rightChild.getValue()).toBeUndefined();

        expect(node2.parentNode.getValue()).toBe(3);
        expect(node2.rightChild.getValue()).toBeUndefined();
        expect(node2.leftChild.getValue()).toBe(1);

        expect(node1.parentNode.getValue()).toBe(2);

        node3.rotateToRight({rootNode});

        expect(node2.parentNode).toBeUndefined();
        expect(node2.rightChild.getValue()).toBe(3);
        expect(node3.parentNode.getValue()).toBe(2);

        node2.rotateToLeft({rootNode});
        node2.rotateToRight({rootNode});

        expect(node3.parentNode).toBeUndefined();
        expect(node3.leftChild.getValue()).toBe(1);
        expect(node1.rightChild.getValue()).toBe(2);
        expect(node2.parentNode.getValue()).toBe(1);
        expect(node2.leftChild.getValue()).toBeUndefined();
        expect(node2.rightChild.getValue()).toBeUndefined();
      });

      test('if a node cannot rotate to left because it has not right child then one exception must be throw',() => {
        const node1 = createRBNode(1, 'BLACK');
        const {unableToMakeLeftRotation} = require('structures/RBNode/errors');
        expect(() => node1.rotateToLeft()).toThrowError(unableToMakeLeftRotation);
      });

      test('if a node cannot rotate to right because it has not left children then one exception must be throw',() => {
        const node = createRBNode(1,'BLACK');
        const {unableToMakeRightRotation} = require('structures/RBNode/errors');
        expect(unableToMakeRightRotation).toBeDefined();
        expect(() => node.rotateToRight()).toThrowError(unableToMakeRightRotation);
      });
    });

    test('every node must be capable of begining from it modify the tree structure to reach the 5 constraints of red blac trees',() => {
      const node11 = createRBNode(11, 'BLACK');
      const node14 = createRBNode(14,'BLACK');
      const node1 = createRBNode(1,'BLACK');
      const node7 = createRBNode(7,'BLACK');
      const node2 = createRBNode(2, 'RED');
      const node4 = createRBNode(4, 'RED');
      const node5 = createRBNode(5, 'RED');
      const node8 = createRBNode(8, 'RED');
      const node15 = createRBNode(15, 'RED');

      node11.parentNode = undefined;
      node11.insertChildrens(node2,node14);
      node2.insertChildrens(node1,node7);
      node7.insertChildrens(node5,node8);
      node5.insertChild(node4);
      node14.insertChild(node15);

      node4.insertFixUp({rootNode: node11});

      expect(node7.parentNode).toBeUndefined();
      expect(node7.leftChild.getValue()).toBe(2);
      expect(node7.rightChild.getValue()).toBe(11);

      expect(node11.getColor()).toBe('RED');
      expect(node11.leftChild.getValue()).toBe(8);
      expect(node8.getColor()).toBe('BLACK');

      expect(node2.rightChild.getValue()).toBe(5);
      expect(node5.getColor()).toBe('BLACK');

      /* small test */
      const node6 = createRBNode(6, 'BLACK');
      const node3 = createRBNode(3, 'RED');
      const node0 = createRBNode(0, 'RED');

      node6.insertChild(node0);
      node0.insertChild(node3);
      node3.insertFixUp({rootNode: node6});
    });

    test('small tests for test different case of fixup proccess done after and insertion is finished on the tree',() => {

      // case 1 z uncle y is a red node
      const node3 = createRBNode(3, 'BLACK');
      node3.parentNode = undefined;
      const node4 = createRBNode(4, 'RED');
      const node2 = createRBNode(2, 'RED');
      const node1 = createRBNode(1, 'RED');

      node3.insertChildrens(node2,node4);
      node2.insertChild(node1);

      node1.insertFixUp({rootNode: node3});

      expect(node2.getColor()).toBe('BLACK');
      expect(node4.getColor()).toBe('BLACK');
      expect(node3.getColor()).toBe('RED');

      //case 2 z uncle y is a black node or not exist and z is a right child of a node that is a left child, this case in the proccess going trough the case 3

      const node7 = createRBNode(7, 'BLACK');
      node7.parentNode = undefined;
      const node6 = createRBNode(6, 'RED');
      const node5 = createRBNode(5, 'RED');

      node7.insertChild(node5);
      node5.insertChild(node6);

      node6.insertFixUp({rootNode: node7});

      expect(node7.getColor()).toBe('RED');
      expect(node5.getColor()).toBe('RED');
      expect(node6.getColor()).toBe('BLACK');
      expect(node6.leftChild.getValue()).toBe(5);
      expect(node6.rightChild.getValue()).toBe(7);

      //case 1 with the parent of z node being a rightChild

      const node13 = createRBNode(13, 'RED');
      const node14 = createRBNode(14, 'BLACK');
      const node15 = createRBNode(15, 'RED');
      const node16 = createRBNode(16, 'RED');

      node14.parentNode = undefined;
      node14.insertChildrens(node13,node16);
      node16.insertChild(node15);

      node15.insertFixUp({rootNode: node14});

      expect(node14.getColor()).toBe('RED');
      expect(node13.getColor()).toBe('BLACK');
      expect(node16.getColor()).toBe('BLACK');

      // case 2 and 3 with the parent of z node being a right child

      const node10 = createRBNode(10,'BLACK');
      const node11 = createRBNode(11,'RED');
      const node12 = createRBNode(12,'RED');

      node10.parentNode = undefined;
      node10.insertChild(node12);
      node12.insertChild(node11);

      node11.insertFixUp({rootNode: node10});

      expect(node11.parentNode).toBeUndefined();
      expect(node11.leftChild.getValue()).toBe(10);
      expect(node11.rightChild.getValue()).toBe(12);

      expect(node11.getColor()).toBe('BLACK');
      expect(node10.getColor()).toBe('RED');
    });
  });
});
