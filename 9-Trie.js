class TrieNode {
    constructor(char, isWord=false) {
        this.char = char;
        this.isWord = isWord;
        this.next = new Map();
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode();
        this.size = 0;
    }

    getSize() {
        return this.size;
    }
    // 向 Trie 中添加一个新的单词 word
    add(word) {
        let curr = this.root;
        for (let c of word) {
            if (!curr.next.has(c)) {
                curr.next.set(c, new TrieNode(c))
            }
            // 切换到下一个字符节点
            curr = curr.next.get(c);
        }

        if (!curr.isWord) {
            curr.isWord = true;
            this.size++;
        }
    }

    contains(word) {
        let curr = this.root;
        for (let c of word) {
            if (!curr.next.has(c)) return false;
            curr = curr.next.get(c);
        }
        return curr.isWord;
    }

    isPrefix(prefix) {
        let curr = this.root;
        for (let c of prefix) {
            if (!curr.next.has(c)) return false;
            curr = curr.next.get(c);
        }
        return true;
    }
}

// Test
let trie = new Trie();
trie.add('what');
trie.add('why');
trie.add('where');
trie.add('when');
console.log(trie.contains('why'));