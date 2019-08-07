class SegmentTree {
    constructor(arr) {
        this.data = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            this.data[i] = arr[i];
        }

        this.tree = new Array(4 * this.data.length);

        this.buildSegmentTree(0, 0, this.data.length - 1);
    }

    getSize() {
        return this.data.length;
    }

    get(index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error('index is illegal');
        }
        return this.data[index];
    }

    leftChild(index) {
        return 2 * index + 1;
    }

    rightChild(index) {
        return 2 * index + 2;
    }

    merge(treeA, treeB) {
        return treeA + treeB;
    }

    // 在treeIndex的位置创建表示区间[l...r]的线段树
    buildSegmentTree(treeIndex, l, r) {
        // 递归结束
        if (l === r) {
            this.tree[treeIndex] = this.data[l];
            return;
        }

        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        let mid = Math.floor(l + (r - l) / 2);

        this.buildSegmentTree(leftTreeIndex, l, mid);
        this.buildSegmentTree(rightTreeIndex, mid + 1, r);

        this.tree[treeIndex] = this.merge(
            this.tree[leftTreeIndex],
            this.tree[rightTreeIndex]
        )
    }

    // 查询，返回区间[queryL, queryR]的值
    query(queryL, queryR) {
        if (queryL < 0 || queryL >= this.data.length || queryR < 0 || queryR >= this.data.length || queryL > queryR) {
            throw new Error('Index is illegal');
        }

        return this.recursiveQuery(0, 0, this.data.length - 1, queryL, queryR);
    }
    // 在以treeIndex为根的线段树中[l...r]的范围里，搜索区间[queryL...queryR]的值
    recursiveQuery(treeIndex, l, r, queryL, queryR) {
        if (l === queryL && r === queryR) {
            return this.tree[treeIndex];
        }

        let mid = Math.floor(l + (r - l) / 2);
        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);

        if (queryL >= mid + 1) {
            return this.recursiveQuery(rightTreeIndex, mid + 1, r, queryL, queryR);
        } else if (queryR <= mid) {
            return this.recursiveQuery(leftTreeIndex, l, mid, queryL, queryR);
        } else {
            let leftResult = this.recursiveQuery(leftTreeIndex, l, mid, queryL, mid);
            let rightResult = this.recursiveQuery(rightTreeIndex, mid + 1, r, mid + 1, queryR);
            return this.merge(leftResult, rightResult);
        }

    }
    // 将 index 位置更新为 val
    update(index, val) {
        if (index < 0 || index > this.data.length) {
            throw new Error('Index is illegal');
        }
        this.data[index] = val;
        this.recursiveUpdate(0, 0, this.data.length - 1, index, val);
    }

    recursiveUpdate(treeIndex, l, r, index, val) {
        if (l === r) {
            this.tree[treeIndex] = val;
            return;
        }

        let mid = Math.floor( l + (r - l) / 2);
        let leftTreeIndex = this.leftChild(treeIndex);
        let rightTreeIndex = this.rightChild(treeIndex);
        if (index >= mid + 1) {
            this.recursiveUpdate(rightTreeIndex, mid + 1, r, index, val);
        } else {
            this.recursiveUpdate(leftTreeIndex, l, mid, index, val);
        }

        // 更新整个tree
        this.tree[treeIndex] = this.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex]);
    }
}

// Test
const nums = [-2, 0, 3, -5, 2, -1];
let segment = new SegmentTree(nums);
console.log(segment.query(1,3));
segment.update(2, 11);
console.log(segment.query(1,3));