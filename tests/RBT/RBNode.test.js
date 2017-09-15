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
  });
});
