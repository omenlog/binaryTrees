describe("Main File Test",() => {
  it("should export createTree function",() => {
    const {createTree} = require('../index');
    expect(createTree).toBeDefined();
  });

  describe("createTree function",() => {
    const {createTree} = require('../index');
    const {treePrototype} = require('tree');
    const newTree = createTree();

    it("should return a new object using as prototype the treePrototype object",() => {
      const newTreePrototype = Object.getPrototypeOf(newTree);
      expect(newTreePrototype).toBe(treePrototype);
    });

    it("should return a new object with the rootNode property set to undefined",() => {
      expect(newTree).toMatchObject({'rootNode': undefined});
    });
  });
});
