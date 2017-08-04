describe("Node Tests", () => {
  const {createNode} = require("Node");

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

    test("every node is capable of setup correctly its children using setter function",() => {
      const newNode = createNode();
      newNode.setLeftChild(1);
      expect(newNode.leftChild.getKey()).toBe(1);
      newNode.setRightChild(2);
      expect(newNode.rightChild.getKey()).toBe(2);
    });

    test("every node is capable of tell if it have children using hasChildren() function",() => {
      const newNode = createNode(10);
      expect(newNode.hasChildrens()).toBeFalsy();
      newNode.setRightChild(20);
      expect(newNode.hasChildrens()).toBeTruthy();
    });

    test("every node is capable of return its childrens",() => {
      const newNode = createNode();
      expect(newNode.childrens()).toMatchObject({leftChild: undefined,rightChild: undefined});
    });
  });
});
