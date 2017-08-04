describe("Main File Test",() => {
  it("should export createTree function",() => {
    const {createTree} = require('../index');
    expect(createTree).toBeDefined();
  });

  describe("createTree function",() => {
    it("should return a new object using as prototype treePrototype",() => {
      const {createTree} = require('../index');
      const {treePrototype} = require('tree');
      const newTreePrototype = Object.getPrototypeOf(createTree());
      expect(newTreePrototype).toBe(treePrototype);
    });
  });
});
