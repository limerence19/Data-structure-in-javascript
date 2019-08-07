class Set {
    constructor() {
        this.dataStore = [];
    }

    add(item) {
        if (this.dataStore.indexOf(item) < 0) {
            this.dataStore.push(item);
            return true
        } else {
            return false;
        }
    }

    remove(item) {
        let pos = this.dataStore.indexOf(item);
        if (pos > -1) {
            this.dataStore.splice(pos, 1);
            return true;
        } else {
            return false;
        }
    }

    size() {
        return this.dataStore.length;
    }

    contains(item) {
        if (this.dataStore.indexOf(item) > -1) {
            return true;
        } else {
            return false;
        }
    }

    union(set) {
        let tempSet = new Set();
        for (let i = 0; i < this.dataStore.length; i++) {
            tempSet.add(this.dataStore[i]);
        }
        for (let i = 0; i < set.dataStore.length; i++) {
            if (!tempSet.contains(set.dataStore[i])) {
                tempSet.dataStore.push(set.dataStore[i]);
            }
        }
        return tempSet;
    }

    intersect(set) {
        let tempSet = new Set();
        for (let i = 0; i < this.dataStore.length; i++) {
            if (set.contains(this.dataStore[i])) {
                tempSet.add(this.dataStore[i]);
            }
        }
        return tempSet;
    }

    subset(set) {
        if (this.size() < set.size()) {
            return false;
        } else {
            for (let i = 0; i < this.dataStore.length; i++) {
                if (!set.contains(this.dataStore[i])) {
                    return false;
                }
            }
            return true;
        }
    }

    difference(set) {
        let tempSet = new Set();
        for (let i = 0; i < this.dataStore.length; i++) {
            if (!set.contains(this.dataStore[i])) {
                tempSet.add(this.dataStore[i]);
            }
        }
        return tempSet;
    }

    show() {
        for (let i = 0; i < this.dataStore.length; i++) {
            console.log(this.dataStore[i]);
        }
    }
}

// Test
const names1 = ['allen', 'bob', 'cindy', 'david', 'evas', 'frank'];
const names2 = ['allen','bob'];

let set1 = new Set();
let set2 = new Set();

names1.forEach((item) => {
    set1.add(item);
});

names2.forEach((item) => {
    set2.add(item);
});

set2.intersect(set1) ? console.log(true) : console.log(false);
