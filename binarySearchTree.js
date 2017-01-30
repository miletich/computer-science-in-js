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

  function remove(key) {
    root = removeNode(key);

    function removeNode(key, node = root) {
      if (node === null) {
        return null;
      }

      if (node.key > key) {
        node.left = removeNode(key, node.left);
        return node;
      } else if (node.key < key) {
        node.right = removeNode(key, node.right);
        return node;
      } else { //node.key === key
          // If leaf node
          if (node.left === null && node.right === null) {
            node = null;
            return node;
          }

          // If node with only one child
          if (node.left == null) {
            node = node.right;
            return node;
          } else if (node.right === null) {
            node = node.left;
            return node;
          }

          // If node with both children
          let aux = findMinNode(node.right);
          node.key = aux.key;
          removeNode(aux.key, node.right);
          return node;
      }
    }

    function findMinNode(node) {
      return node.left !== null
        ? findMinNode(node.left)
        : node;
    }
  }

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

  function min(node = root) {
    return node.left !== null
      ? min(node.left)
      : node.key;
  }

  function max(node = root) {
    return node.right !== null
      ? max(node.right)
      : node.key;
  }

  function search(value, node = root){
    if (node !== null) {
      if (node.key === value) {
        return true;
      } else if (node.key > value) {
        return search(value, node.left);
      } else if (node.key < value) {
        return search(value, node.right);
      }
    }
    return false;
  }

  return { insert, remove, inOrderTraverse, preOrderTraverse, postOrderTraverse, min, max, search };
}

export default binarySearchTree;
