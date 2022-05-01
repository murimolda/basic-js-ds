const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.treeRoot = null
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    if (data === undefined) {
      return null
    }

    this.treeRoot = addElement(this.treeRoot, data);

    function addElement(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        node.left = addElement(node.left, data);
      } else {
        node.right = addElement(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    return searchElement(this.treeRoot, data);

    function searchElement(node, data) {
      if (!node) {
        return false;
      }
      if (node.data === data) {
        return true;
      }
      if (data < node.data) {
        return searchElement(node.left, data);
      } else {
        return searchElement(node.right, data);
      }
    }
  }

  find(data) {
    return findElement(this.treeRoot, data)

    function findElement(node, data) {
      if (node === null) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (data < node.data) {
        return findElement(node.left, data)
      } else if (data > node.data) {
        return findElement(node.right, data)
      }
    }
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightElement = node.right;
        while (minRightElement.left) {
          minRightElement = minRightElement.left;
        }
        node.data = minRightElement.data;

        node.right = removeNode(node.right, minRightElement.data);

        return node;
      }
    }
  }

  min() {
    if (!this.treeRoot) {
      return undefined;
    }
    let node = this.treeRoot;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.treeRoot) {
      return undefined;
    }
    let node = this.treeRoot;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

const tree = new BinarySearchTree();

module.exports = {
  BinarySearchTree
};