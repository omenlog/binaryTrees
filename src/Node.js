const nodePrototype = {
  setChild(childSide,nodeValue){
    const child = (childSide === "LEFT")? "leftChild":"rightChild";
    this[child] = createNode(nodeValue);
    this[child].parentNode = this;
  },
  setLeftChild(nodeValue){
    this.setChild("LEFT",nodeValue);
  },
  setRightChild(nodeValue){
    this.setChild("RIGHT",nodeValue);
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
  return Object.assign(Object.create(nodePrototype), {
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
