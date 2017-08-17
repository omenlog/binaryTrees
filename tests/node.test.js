describe("Node Tests", () => {
  const {createNode} = require('structures/Node');
  const {createTree} = require('structures/Tree');

  it("should export a createNode function", () => {
    expect(createNode).toBeDefined();
  });

  describe("createNode function", () => {

    it("should create a new node with leftChild,rightChild and parentNode equal to undefined",() => {
        const newNode = createNode();
        expect(newNode).toMatchObject({
          leftChild: undefined,
          rightChild: undefined,
          parentNode: undefined
        });
    });

    it("should create a new node with the 'key' property private",() => {
      const newNode = createNode();
      expect(newNode.hasOwnProperty('key')).toBeFalsy();
    });

    it("should setup the 'key' property equal to 0 by default",() => {
      const newNode = createNode();
      expect(newNode.getKey()).toBe(0);
    });

    it("should config getter and setter for the key property",() => {
      const newNode = createNode();
      newNode.setKey(10);
      expect(newNode.getKey()).toBe(10);
    });

    test("every node is capable of setup correctly its children without specific the child side",() => {
      const newNode = createNode(2);
      newNode.insertChild(1);
      newNode.insertChild(3);
      expect(newNode.leftChild.getKey()).toBe(1);
      expect(newNode.rightChild.getKey()).toBe(3);
    });

    test("every node is capable of tell if it has some children",() => {
      const newNode = createNode(10);
      expect(newNode.hasChildrens()).toBeFalsy();
      newNode.insertChild(20);
      expect(newNode.hasChildrens()).toBeTruthy();
    });

    test("every node is capable of return its childrens",() => {
      const newNode = createNode();
      expect(newNode.childrens()).toMatchObject({leftChild: undefined,rightChild: undefined});
    });

    test("every node is capable of take a value and setup this as one of its childrens",() => {
      const newNode =  createNode(10);
      newNode.insertChild(20);
      newNode.insertChild(5);
      expect(newNode.leftChild.getKey()).toBe(5);
      expect(newNode.rightChild.getKey()).toBe(20);
    });

    test("every node is capable of say if it have almost one child",() => {
      const newNode =  createNode(2).insertChild(1);
      expect(newNode.hasOneChild()).toBeTruthy();
      newNode.insertChild(3);
      expect(newNode.hasOneChild()).toBeFalsy();
      const anotherNode = createNode(1);
      expect(anotherNode.hasOneChild()).toBeFalsy();
    });

    test("every node is capable of return is succesor or undefined if it store the greater value in the tree",() => {
      const newTree = createTree(7,1,5,10,-3,4,9,0,8,3,2.5,2);

      const node5 = newTree.find(5);
      expect(node5.succesor().getKey()).toBe(7);

      const node0 = newTree.find(0);
      expect(node0.succesor().getKey()).toBe(1);

      const node1 = newTree.find(1);
      expect(node1.succesor().getKey()).toBe(2);

      const node10 = newTree.find(10);
      expect(node10.succesor()).toBeUndefined();
    });
  });
});
