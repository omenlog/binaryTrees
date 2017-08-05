const Node = {
  setChild(childSide, value) {
    const child = childSide === "LEFT" ? "leftChild" : "rightChild";
    this[child] = createNode(value);
    this[child].parentNode = this;
    return this;
  },
  setLeftChild(value) {
    return this.setChild("LEFT", value);
  },
  setRightChild(value) {
    return this.setChild("RIGHT", value);
  },
  insertChild(value) {
    return value < this.getKey()
      ? this.setLeftChild(value)
      : this.setRightChild(value);
  },
  hasChildrens() {
    return this.leftChild || this.rightChild;
  },
  childrens() {
    const { leftChild, rightChild } = this;
    return { leftChild, rightChild };
  }
};

function createNode(newKey = 0) {
  let key = newKey;
  return Object.assign(Object.create(Node), {
    getKey() {
      return key;
    },
    setKey(k) {
      key = k;
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  });
}

module.exports = {
  createNode
};
