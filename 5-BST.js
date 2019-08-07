import Queue from './2-Queue';

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

export default class BST {
    constructor() {
        this.rootNode = null;
        this.size = 0;
    }

    size() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    insert(key) {
        let newNode = new Node(key);
        if (this.rootNode == null) {
            this.rootNode = newNode;
        } else {
            this.insertNode(this.rootNode, newNode);
        }

        this.size++;
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left == null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right == null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    inOrder(callback) {
        this.inOrderNode(this.rootNode, callback);
    }

    inOrderNode(node, callback) {
        if (node != null) {
            this.inOrderNode(node.left, callback);
            callback(node.key);
            this.inOrderNode(node.right, callback);
        }
    }

    preOrder(callback) {
        this.preOrderNode(this.rootNode, callback);
    }

    preOrderNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderNode(node.left, callback);
            this.preOrderNode(node.right, callback);
        }
    }

    postOrder(callback) {
        this.postOrderNode(this.rootNode, callback);
    }

    postOrderNode(node, callback) {
        if (node != null) {
            this.postOrderNode(node.left, callback);
            this.postOrderNode(node.right, callback);
            callback(node.key);
        }
    }

    // 层序遍历 广度优先 队列
    levelOrder(callback) {
        let q = new Queue();
        q.enqueue(this.rootNode);
        while (!q.isEmpty()) {
            let curr = q.dequeue();
            callback(curr.key);
            
            if (curr.left != null) {
                q.enqueue(curr.left);
            }

            if (curr.right != null) {
                q.enqueue(curr.right);
            }
        }
    }

    min() {
        return this.minNode(this.rootNode);
    }

    minNode(node) {
        if (node) {
            while (node && node.left != null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    max() {
        return this.maxNode(this.rootNode);
    }

    maxNode(node) {
        if (node) {
            while (node && node.right != null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    findMinNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }

            return node;
        }
        return null;
    }

    search(key) {
        return this.searchNode(this.rootNode, key)
    }

    searchNode(node, key) {
        if (node === null) return false;

        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    remove(key) {
        this.rootNode = this.removeNode(this.rootNode, key);
        this.size--;
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
        } else {
            // 叶子节点
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // 只有右子树
            if (node.left === null) {
                node = node.right;
                return node;
            } else {
                // 只有左子树
                node = node.left;
                return node;
            }

            // 有左右子树
            // 右子树中寻找最小值
            let minNode = this.findMinNode(node.right);
            // 最小值赋给要删除的节点
            node.key = minNode.key;
            // 把最小值从树中删除
            node.right = this.removeNode(node.right, minNode.key);
            // 返回新节点
            return node;
        }
    }
}

// Test
const nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];
const bst = new BST();
nodes.forEach((key) => {
    bst.insert(key);
})

// inOrder
// bst.inOrder((key) => {
//     console.log(key);
// })

// bst.preOrder((key) => {
//     console.log(key);
// })

// bst.postOrder((key) => {
//     console.log(key);
// })

// let minNode = bst.min();
// console.log(minNode)

// let maxNode = bst.max();
// console.log(maxNode);

// console.log(bst.search(7))
// console.log(bst.search(9))

// bst.remove(1);
// bst.inOrder((key) => {
//     console.log(key);
// })

// bst.levelOrder((key) => {
//     console.log(key);
// })
