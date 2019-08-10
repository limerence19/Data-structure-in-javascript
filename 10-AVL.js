class AVLTreeNode {
    constructor(key=null, value=null, left=null, right=null) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    getNode(node, key) {
        if (node == null) return null;
        if (key < node.key) {
            return this.getNode(node.left, key);
        } else if (key > node.key) {
            return this.getNode(node.right, key);
        } else if (key === node.key) {
            return node;
        } else {
            throw new Error('no result');
        }
    }

    getHeight(node) {
        if (node == null) {
            return 0
        }
        return node.height;
    }

    getBalanceFactor(node) {
        if (node == null) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    isBalanced() {
        return this.isBalancedNode(this.root);
    }

    isBalancedNode(node) {
        if (node == null) return true;
        let balanceFactor = this.getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1) return false;
        return this.isBalancedNode(node.left) && this.isBalancedNode(node.right);
    }

    isBST() {
        if (!this.root) return true;
        const keys = [];
        this.inOrder(this.root, keys);

        for (let i = 1; i < keys.length; i++) {
            if (keys[i - 1] > keys[i]) {
                return false;
            }
        }

        return true;
    }

    inOrder(node, keys) {
        if (node == null) return;
        this.inOrder(node.left, keys);
        keys.push(node.key);
        this.inOrder(node.right, keys);
    }

    insert(key, value) {
       this.root = this.insertNode(this.root, key, value); 
    }

    insertNode(node, key, value) {
        if (node == null) {
            this.size++;
            return new AVLTreeNode(key, value);
        }

        if (key < node.key) {
            node.left = this.insertNode(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key, value);
        } else {
            node.value = value;
        }

        //更新height
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balanceFactor = this.getBalanceFactor(node);

        // LL
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rightRotate(node);
        }
        // RR
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.leftRotate(node);
        }

        // LR
        if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // RL
        if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    remove(key) {
        let node = this.getNode(this.root, key);
        if (node != null) {
            this.root = this.removeNode(this.root, key);
            return node.value;
        }
        return null
    }

    removeNode(node, key) {
        if (node == null) {
            return null;
        }

        let retNode;

        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            retNode = node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            retNode = node;
        } else {
            // 待删除节点左子树为空
            if (node.left == null) {
                let rightNode = node.right;
                node.right = null;
                this.size--;
                retNode = rightNode;
            } else if (node.right == null) {
                // 待删除节点右子树为空
                let leftNode = node.left;
                node.left = null;
                this.size--;
                retNode = leftNode;
            } else {
                // 左右字树都不为空
                // 右子树中寻找最小值
                let successor = this.findMinNode(node.right);
                successor.right = this.removeNode(node.right, successor.key);
                successor.left = node.left;

                node.left = node.right = null;

                retNode = successor;
            }
        }

        if (retNode == null) {
            return null;
        }

        retNode.height = 1 + Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));
        let balanceFactor = this.getBalanceFactor(retNode);

        // LL
        if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) >= 0) {
            return this.rightRotate(retNode);
        }
        // RR
        if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) <= 0) {
            return this.leftRotate(retNode);
        }

        // LR
        if (balanceFactor > 1 && this.getBalanceFactor(retNode.left) < 0) {
            retNode.left = this.leftRotate(retNode.left);
            return this.rightRotate(retNode);
        }

        // RL
        if (balanceFactor < -1 && this.getBalanceFactor(retNode.right) > 0) {
            retNode.right = this.rightRotate(retNode.right);
            return this.leftRotate(retNode);
        }

        return retNode;
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

    rightRotate(y) {
        let x = y.left;
        let T3 = x.right;
        // 向右旋转
        x.right = y;
        y.left = T3;
        //更新height
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    leftRotate(y) {
        let x = y.right;
        let T2 = x.left;

        x.left = y;
        y.right = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }
}

const arr = [8, 3, 10, 1, 6, 14, 4, 7, 13];
let avl = new AVLTree();
arr.forEach((item) => {
    avl.insert(item, item);
})

console.log('is BST:' + avl.isBST());
console.log('is Balanced:' + avl.isBalanced());

avl.remove(14);
console.log('avl size:' + avl.getSize());
console.log('is BST:' + avl.isBST());
console.log('is Balanced:' + avl.isBalanced());