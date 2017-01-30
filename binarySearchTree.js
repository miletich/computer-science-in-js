"use strict";

function binarySearchTree() {
  function node(key) {
    let left = null;
    let right = null;

    return { key, left, right };
  }

  let root = null;

  function insert(key) {
    const newNode = node(key);

    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }

    function insertNode(node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
          return true;
        } else {
          insertNode(node.left, newNode);
        }
      } else if (newNode.key > node.key) {
        if (node.right === null) {
          node.right = newNode;
          return true;
        } else {
          insertNode(node.right, newNode);
        }
      } else {
        return false;
      }
    }
  }

  function remove(key) {}

  function inOrderTraverse(callback, node = root) {
    if (node !== null) {
      inOrderTraverse(callback, node.left);
      callback(node);
      inOrderTraverse(callback, node.right);
    }
  }

  function preOrderTraverse(callback, node = root) {
    if (node !== null) {
      callback(node);
      preOrderTraverse(callback, node.left);
      preOrderTraverse(callback, node.right);
    }
  }

  function postOrderTraverse(callback, node = root) {
    if (node !== null) {
      postOrderTraverse(callback, node.left);
      postOrderTraverse(callback, node.right);
      callback(node);
    }
  }

  function min() {}

  function max() {}

  return { insert, remove, inOrderTraverse, preOrderTraverse, postOrderTraverse, min, max };
}

export default binarySearchTree;
