class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node('head');
    }

    find(item) {
        let currNode = this.head;
        while (currNode.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    findPrevious(item) {
        let currNode = this.head;
        while (currNode.next != null && currNode.next.element !== item) {
            currNode = currNode.next;
        }
        return currNode;
    }

    update(item, element) {
        let currNode = this.find(item);
        currNode && (currNode.element = element);
    }

    insert(newElement, item) {
        let newNode = new Node(newElement);
        let current = this.find(item);
        newNode.next = current.next;
        current.next = newNode;
    }

    remove(item) {
        let prevNode = this.findPrevious(item);
        // 删除多个元素，需要使用循环
        if (prevNode.next != null) {
            prevNode.next = prevNode.next.next;
        }
    }

    display() {
        let currNode = this.head;
        let s = ''
        while (currNode != null) {
            s += currNode.element + '->';
            console.log(s)
            currNode = currNode.next;
        }
        s += 'null';
        console.log(s, 'final');

    }
}

module.exports = {
    LinkedList
}

// Test

let cities = new LinkedList();
cities.insert('beijing', 'head');
cities.insert('shanghai', 'beijing');
cities.insert('guangzhou', 'shanghai');
cities.insert('tianjin', 'guangzhou');
cities.display();
cities.remove('guangzhou');
cities.display();
cities.update('shanghai', '魔都');
cities.display();