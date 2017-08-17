const {
  addNode,
  findNode,
  insertListIn,
  removeFrom
} = require("./privateFunc");
const { createNode } = require("../Node");
const { flat } = require("../../utils/tools");

// CHANGED: Remove add function from tree prototype the user always must use insert function to add a new node

const treePrototype = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    return insertListIn(this, flat(args));
  },
  add(value) {
    const { rootNode } = this;
    rootNode === undefined
      ? this.setRootNodeWith(value)
      : addNode(value, rootNode);

    return this;
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
  }
};

module.exports = treePrototype;
