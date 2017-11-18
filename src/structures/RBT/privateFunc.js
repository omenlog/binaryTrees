'use strict';

const { replaceIn, minOf } = require('../../utils/tools');

function updateRootNode(posibleRoot) {
  return posibleRoot.parentNode === undefined
    ? posibleRoot
    : updateRootNode(posibleRoot.parentNode);
}

function updateRootOf(tree) {
  let newRootNode = updateRootNode(tree.rootNode);
  newRootNode.setColor('BLACK');
  tree.rootNode = newRootNode;
}

function addIn(tree, newRBNode) {
  /* calling the insert function of BST prototype object */
  Object.getPrototypeOf(tree.__proto__).insert.call(tree, newRBNode);
  newRBNode.fixTheTree();
  updateRootOf(tree);
  return tree;
}

function removeFrom(rbTree, node) {
  let x;
  let nodeOriginalColor = node.getColor();

  if (!node.hasChildrens()) {
    x = node.rightChild;
    replaceIn(rbTree, node, node.rightChild);
  } else if (node.leftChild.isALeaf() || node.rightChild.isALeaf()) {
    const nodeChild = node.leftChild.isALeaf()
      ? node.rightChild
      : node.leftChild;
    x = nodeChild;
    replaceIn(rbTree, node, nodeChild);
  } else {
    const succesor = minOf(node.rightChild);
    node.setKey(succesor.getValue());
    nodeOriginalColor = succesor.getColor();
    x = succesor.rightChild;
    replaceIn(rbTree, succesor, succesor.rightChild);
  }

  if (nodeOriginalColor === 'BLACK') {
    if (x.isALeaf() && x === rbTree.rootNode) {
      rbTree.rootNode = undefined;
    } else {
      deleteFixUp(rbTree, x);
    }
  }

  return rbTree;
}

function deleteFixUp(tree, x) {
  let node = x;
  let sibling;
  while (node.parentNode !== undefined && node.getColor() === 'BLACK') {
    let { parentNode } = node;

    if (node.isALeftChild()) {
      sibling = parentNode.rightChild;

      if (sibling.getColor() === 'RED') {
        sibling.setColor('BLACK'); // case 1
        parentNode.setColor('RED'); // case 1
        parentNode.rotateToLeft(); // case 1
        sibling = parentNode.rightChild; // case 1
      }

      // aqui cuando pregunte por los hijos si son negros puedo hacer una equivalancia
      // y preguntar al mismo tiempo si son undefined al final es lo mismo q si fueras negros
      // o sea para el arbol son vistos como nodos negros = solo seria annadir esto dentro d las
      // condiciones dentro de los if para q todo permanezca de la misma forma y no sea necesaria
      // una estructrua para representar a los NIL nodes

      if (
        sibling.leftChild.getColor() === 'BLACK' &&
        sibling.rightChild.getColor() === 'BLACK'
      ) {
        sibling.setColor('RED'); // case 2
        node = parentNode; // case 2
      } else {
        if (sibling.rightChild.getColor() === 'BLACK') {
          sibling.leftChild.setColor('BLACK'); // case 3
          sibling.setColor('RED'); // case 3
          sibling.rotateToRight(); // case 3
          sibling = parentNode.rightChild; // case 3
        }

        sibling.setColor(parentNode.getColor()); // case 4
        parentNode.setColor('BLACK'); // case 4
        sibling.rightChild.setColor('BLACK'); // case 4
        parentNode.rotateToLeft(); // case 4
        node = tree.rootNode; // case 4
      }
    } else {
      sibling = parentNode.leftChild;

      if (sibling.getColor() === 'RED') {
        sibling.setColor('BLACK');
        parentNode.setColor('RED');
        parentNode.rotateToRight()();
        sibling = parentNode.leftChild;
      }

      if (
        sibling.leftChild.getColor() === 'BLACK' &&
        sibling.rightChild.getColor() === 'BLACK'
      ) {
        sibling.setColor('RED');
        node = parentNode;
      } else {
        if (sibling.leftChild.getColor() === 'BLACK') {
          sibling.rightChild.setColor('BLACK');
          sibling.setColor('RED');
          sibling.rotateToLeft();
          sibling = parentNode.leftChild;
        }

        sibling.setColor(parentNode.getColor());
        parentNode.setColor('BLACK');
        sibling.leftChild.setColor('BLACK');
        parentNode.rotateToRight();
        node = tree.rootNode;
      }
    }
  }

  node.setColor('BLACK');
}

module.exports = {
  updateRootOf,
  addIn,
  removeFrom,
  deleteFixUp
};
