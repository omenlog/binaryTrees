# Binary Search Tree(BST) and Red Black Tree(RBT) structures

This an implementation of BST and RBT using the theory explained in
**Introduction to Algorithms** relative to this structures. This first version
of the package only support as value of tree nodes numeric values, in later
version maybe this can be change and the values can be object ;)

### Example

```js
const { createRBT } = require('binaryTrees');

const newRBT = createRBT();
newRBT.insert(2);
newRBT.insert([23, -1, 4]); // the tree now has 2,23,-1,4

newRBT.contain(2); // true
newRBT.find(2); // Node Structure with 2 as key value

newRBT.remove(2).insert(10);
newRBT.contain(10); // true
newRBT.contain(2); // false

newRBT.contain(2, 10); // false,only true if the tree contain all values

newRBT.max(); // 23
newRBT.min(); // -1
```

## API

The module exposes as main functions `createBST` for binary search trees
creation and `createRBT` for red black trees as well, regardless of the type of
tree created they have the same API.

### Tree Creation

```js
const { createRBT } = require('binaryTrees');

// create empty tree
const emptyTree = createRBT();

// init tree with some values
const treeWithValues = createRBT(3, 2, 14);

// values can be specified using array
const anotherTree = createRBT([3, 2, 5]);

// array and values can be mixed on tree creation
const newTree = createRBT(1, [4, 5], 2, 0);
```

### Insertion

```js
const newTree = createRBT(4, 3, 6, 10);

newTree.insert(5); // new value inserted

newTree.insert(2, 4, 8); // inserting more than one value

newTree.insert([1, 9]); // inserting more than one value using arrays

newTree.insert(11);
newTree.insert(11); // the 11 value is just inserted one time so the tree remain unchanged

newTree.insert(20, [21, 23], 22); // here arrays and value can be missed as well

newTree
  .insert([12, 13])
  .insert(14)
  .insert(15, 16); // insert call can be chained
```

### Deletion

```js
const newTree = createRBT(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

newTree.remove(3); // 3 value remove from the tree;

newTree.remove(100); // nothing occur the tree remain without any change

newTree.remove(2, 4, 5); // removing various elements in one single call

newTree.remove([7, 8]); // removing various elements using array as argument

newTree
  .remove(9)
  .remove(10)
  .insert(11); // remove call can be chained
```

### Searching

Sometimes when a search is did against the tree we receive as result a node and
to get the node value we must call the `getValue` function to esxtract correctly
the value.Search in the tree can be done using the following functions
`contain`,`find`,the first return a boolean to tell if the tree contain he value
and the latter return the node with the value specified or `undefined` if the
tree not contain the value, if any of this functions is called without any
argument then and error is throw.Examples:

```js
const newTree = createBST(1, 3, 5, 7, 9, 2, 4, 6, 8, 10);

// asking if the value are in the tree

newTree.contain(3); // true
newTree.contain(100); // false

// using contain with several values only return true if all values are in the tree

newTree.contain(3, 5, 7); // true

newTree.contain(1, 2, 3, 100); // false

// retrieving nodes,check the use of getValue function

newTree.find(3).getValue(); // 3
newTree.find(100); // undefined;

//retrieving various nodes in one single call

newTree.find(1, 2, 3); // [Node(1),Node(2),Node(3)]

newTree.find(1, 35); // [Node(1)] not present values are ignored

newTree.find([4, 5]); // [Node(4),Node(5)]

newTree.find(1, [2, 3], 4, [10], 25); // [Node(1),Node(2),Node(3),Node(4)]
```

### Max and Min values

We can know at any time the node with the max value in the tree or the node that
contain the min value,if the node it not the desired result then we can know
only the maximum or minimum value

```js
const newRBT = createRBT(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

newRBT.max(); // Node 10
newRBT.min(); // Node 1

console.log(newRBT.maxValue()); // print 10
console.log(newRBT.minValue()); // print 1
```

### Iteration

Every tree has a function `iterator` that can be used to build a iterator from
the tree, when this new iterator is consumed the tree values are returned in
order

```js
const newTree = createRBT(1, 2, 3);
const iterator = newTree.iterator();

console.log(iterator.next()); // {value: 1,done: false};
console.log(iterator.next()); // {value: 2,done: false};
console.log(iterator.next()); // {value: 3,done: false};
console.log(iterator.next()); // {value: undefined,done: true};

// if we call next again when the iterator has finished the same object is returned
console.log(iterator.next()); // {value: undefined,done: true};
```

The tree also implement the especial `Symbol.iterator` so it can be used with any of the standard consumer that used this symbol

```js
 const newTree = createRBT(1,2,3);

 // the following for print the tree values in order
 for(let value of newTree){
   console.log(value);
 }
```

### Array like methods

#### Reduce

We can use reduce over one tree created just like we do with standard arrays

```js
  const newTree = createRBT(1,2,3,4,5);

  const sum = (acc,val) => acc + val;
  const product = (acc,val) => acc * val;

  const treeTotal = newTree.reduce(sum);
  const treeFactorial = newTree.reduce(product);

  console.log(treeTotal); // 15
  console.log(treeFactorial); // 120
```
