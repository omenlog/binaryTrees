describe("Main File Test",() => {
  it("should export createTree function",() => {
    const {createTree} = require('../index');
    expect(createTree).toBeDefined();
  });
});
