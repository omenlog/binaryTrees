function createNode(newKey = 0){
  let key = newKey;
  return{
    getKey(){
      return key;
    },
    setKey(k){
      key = k;
    },
    leftChild: undefined,
    rightChild: undefined,
    parentNode: undefined
  };
}

module.exports = {
  createNode
};
