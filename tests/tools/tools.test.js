const { flat } = require("utils/tools");

describe("Generic Tools Tests", () => {
  it("should export a flat function that flat and array passed as argument", () => {
    const flattenOut = flat([1, [2, 3], 4]);
    expect(flattenOut).toEqual([1, 2, 3, 4]);

    const anotherOut = flat([[1,2],3,4,[5,[6,[7,[8,[[[9,10]]]]]]]]);
    expect(anotherOut).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });
});
