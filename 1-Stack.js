class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
    }

    push(ele) {
        this.dataStore.push(ele);
        this.top++;
    }

    pop() {
        return this.dataStore[--this.top];
    }

    peek() {
        return this.dataStore[this.top - 1];
    }

    length() {
        return this.top;
    }

    isEmpty() {
        return this.top === 0;
    }
}

module.exports = {
    Stack
}

// Test

// 回文字符串
function isPalindrome(word) {
    let s = new Stack();
    for (let i = 0; i < word.length; i++) {
        s.push(word[i]);
    }
    let rword = '';
    while (s.length() > 0) {
        rword += s.pop();
    }

    return word === rword ? true : false;
}

let word1 = 'hello', word2 = 'racecar';

// console.log(isPalindrome(word1))
// console.log(isPalindrome(word2))

// 模拟递归
function fact(n) {
    let s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    let product = 1;
    while (s.length() > 0) {
        product *= s.pop();
    }
    return product;
}

// console.log(fact(5))

// 括号匹配
function validParenthese(string) {
    let s = new Stack();
    for (let i = 0; i < string.length; i++) {
        let str = string[i];
        if (str === '(' || str === '[' || str === '{') {
            s.push(str);
        } else {
            if (s.isEmpty()) return false;

            let topChar = s.pop();
            if (str === ')' && topChar !== '(') {
                return false
            }
            if (str === ']' && topChar !== '[') {
                return false;
            }
            if (str === '}' && topChar !== '{') {
                return false;
            }
        }
    }

    return s.isEmpty();
}

console.log(validParenthese('([{}])'))
console.log(validParenthese('([{]})'))