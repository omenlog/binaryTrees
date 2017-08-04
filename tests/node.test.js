describe("Node Tests", () => {
  const {createNode} = require("node");

  it("should export a createNode function", () => {
    expect(createNode).toBeDefined();
  });

  describe("createNode function", () => {

    const newNode = createNode();

    it("should create a new node with leftChild,rightChild and parentNode equal to undefined",() => {
        expect(newNode).toMatchObject({
          leftChild: undefined,
          rightChild: undefined,
          parentNode: undefined
        });
    });

    it("should create a new node with the 'key' property private",() => {
      expect(newNode.hasOwnProperty('key')).toBeFalsy();

    });

    it("should setup the 'key' property equal to 0 by default",() => {
      expect(newNode.getKey()).toBe(0);
    });

    it("should config getter and setter for the key property",() => {
      expect(newNode.getKey).toBeDefined();
      expect(newNode.getKey).toBeInstanceOf(Function);
      expect(newNode.setKey).toBeDefined();
      expect(newNode.setKey).toBeInstanceOf(Function);
      newNode.setKey(10);
      expect(newNode.getKey()).toBe(10);
    });
  });
});
