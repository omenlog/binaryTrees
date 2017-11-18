# Binary Search Tree(BST) and Red Black Tree(RBT) structures

This an implementation of BST and RBT using the theory explained in __Introduction to Algorithms__ relative to this structures. This first version of the package only support as value of tree nodes numeric values, in later version maybe this can be change and the values can be object ;)  

### Example

```js
  const {createRBT} = require('binaryTrees');

  const newRBT = createRBT();
  newRBT.insert(2);
  newRBT.insert([23,-1,4]); // the tree now has 2,23,-1,4

  newRBT.contain(2); // true
  newRBT.find(2); // Node Structure with 2 as key value

  newRBT.remove(2).insert(10);
  newRBT.contain(10); // true
  newRBT.contain(2); // false

  newRBT.contain(2,10); // false,only true if the tree contain all values

  newRBT.max() // 23
  newRBT.min() // -1
```

## API

The module exposes as main functions `createBST` for binary search trees creation and `createRBT` for red black trees as well, regardless of the type of tree created they have the same API.

### Tree Creation
```js
const {createRBT} = require('binaryTrees');

// create empty tree
const emptyTree = createRBT();

// init tree with some values
const treeWithValues = createRBT(3,2,14);

// values can be specified using array
const anotherTree = createRBT([3,2,5]);

// array and values can be mixed on tree creation
const newTree = createRBT(1,[4,5],2,0);
```
### Insertion

```js
  const {createRBT} = require('binaryTrees');
  const newTree = createRBT(4,3,6,10);

  newTree.insert(5); // new value inserted

  newTree.insert(2,4,8); // inserting more than one value

  newTree.insert([1,9]); // inserting more than one value using arrays

  newTree.insert(11);
  newTree.insert(11); // the 11 value is just inserted one time so the tree remain unchanged

  newTree.insert(20,[21,23],22); // here arrays and value can be missed as well

  newTree.insert([12,13]).insert(14).insert(15,16); // insert call can be chained
```
