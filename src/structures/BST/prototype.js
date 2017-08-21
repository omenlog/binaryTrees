const {
  findNode,
  insertListIn,
  removeFrom,
  minOf,
  maxOf
} = require("./privateFunc");
const { createNode } = require("../Node");
const { flat } = require("../../utils/tools");

const treePrototype = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    return insertListIn(this, flat(args));
  },
  contain(...args) {
    const nodes = flat(args).map(arg => findNode(arg, this.rootNode));
    const everyNodeIsFinded = nodes.every(node => node);
    return everyNodeIsFinded ? true : false;
  },
  find(nodeKey) {
    const node = findNode(nodeKey, this.rootNode);
    return node !== undefined ? node : undefined;
  },
  remove(arg) {
    const node = this.find(arg);
    return node !== undefined ? removeFrom(this, node) : this;
  },
  max() {
    const { rootNode } = this;
    return rootNode === undefined ? undefined : maxOf(rootNode);
  },
  min(){
    const { rootNode } = this;
    return rootNode === undefined ? undefined : minOf(rootNode);
  }
};

module.exports = treePrototype;
