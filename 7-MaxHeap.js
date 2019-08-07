class MaxHeap {
    constructor(arr=[]) {
        this.data = arr.slice();
        this.size = this.data.length;
    }

    // add siftUp remove siftDown leftChild parent rightChild
    isEmpty() {
        return this.size === 0;
    }

    remove(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Remove failed, Index is illegal');
        }
        let ret = this.data[index];
        for (let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = data[i];
        }
        this.size--;
        return ret;
    }

    removeLast() {
        return this.remove(this.size - 1);
    }

    parent(index) {
        if(index === 0) {
            throw new Error("index-0 doesn't have parent")
        }
        return Math.floor((index - 1) / 2);
    }

    leftChild(index) {
        return index * 2 + 1;
    }

    rightChild(index) {
        return index * 2 + 2;
    }

    swap(i, j) {
        if (i < 0 || i >= this.size || j < 0 || j >= this.size) {
            throw new Error('illegal index')
        }
        let temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }

    siftUp(k) {
        // 父亲元素 < 当前元素比较，交换元素
        while (k > 0 && this.data[this.parent(k)] < this.data[k]) {
            this.swap(k, this.parent(k));
            k = this.parent(k);
        }
    }

    siftDown(k) {
        // 没有子节点
        while (this.leftChild(k) < this.size) {
            let j = this.leftChild(k);
            if (j + 1 < this.size && this.data[j + 1] > this.data[j]) {
                j = this.rightChild(k);
            }
            // this.data[j]是左右孩子节点的最大值
            if (this.data[k] >= this.data[j]) {
                break;
            }
            this.swap(k, j);
            k = j;
        }
    }

    findMax() {
        if (this.size === 0) {
            throw new Error('heap is empty')
        }
        return this.data[0];
    }

    extractMax() {
        let ret = this.findMax();
        this.swap(0, this.size - 1);
        this.removeLast();
        this.siftDown(0);
        return ret;
    }

    insert(item) {
        this.data[this.size++] = item;
        this.siftUp(this.size - 1);
    }

    heapify(arr) {
        // 先排除叶子节点，再对剩下的节点依次siftDown
        this.data = arr.slice();
        for (let i = this.parent(arr.length - 1); i >= 0; i--) {
            this.siftDown(i);
        }
    }
}

// PS: 不要使用数组push pop方法，统一使用size来维护数组长度

// Test
let heap = new MaxHeap();
heap.insert(5);
heap.insert(7);
heap.insert(3);
heap.insert(11);
heap.insert(33);
heap.insert(9);
heap.insert(21);
try {
    while (!heap.isEmpty()) {
        console.log(heap.extractMax())
    }
} catch (error) {
    console.log(err)
}