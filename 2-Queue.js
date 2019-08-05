class Queue {
    constructor() {
        this.dataStore = [];
    }

    enqueue(ele) {
        this.dataStore.push(ele);
    }

    dequeue() {
        return this.dataStore.shift();
    }

    getFront() {
        return this.dataStore[0];
    }

    getSize() {
        return this.dataStore.length;
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }
}

module.exports = {
    Queue
}

