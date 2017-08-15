const {addNode,findNode,insertListIn,removeFrom} = require('./privateFunc');
const {createNode} = require('../Node');
const {flat} = require('../../utils/tools');

const treePrototype = {
  setRootNodeWith(value) {
    this.rootNode = createNode(value);
  },
  insert(...args) {
    return insertListIn(this,flat(args));
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
    return everyNodeIsFinded ? nodes : false;
  },
  remove(arg) {
    const nodes = this.contain(arg);
    return nodes !== false ? removeFrom(this, nodes[0]) : this;
  }
};

module.exports = treePrototype;
