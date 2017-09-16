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

      const redNode = createRBNode(10,'RED');
      expect(redNode.getColor()).toBe('RED');

      const blackNode = createRBNode(12,'BLACK');
      expect(blackNode.getColor()).toBe('BLACK');
    });

    test('every new node created must be capable to make a left rotation over it in the tree',() => {
      /* creating tree nodes*/

      const node26 = createRBNode(26, 'BLACK');
      const rootNode = node26;

      const node17 = createRBNode(17, 'RED');
      const node14 = createRBNode(14, 'BLACK');
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
    });
  });
});
