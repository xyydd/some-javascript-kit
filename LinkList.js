class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = new ListNode('head');
    }
    find (value) {
        let current = this.head;
        while (current.value !== value) {
            if (current.next) {
                current = current.next;
            } else {
                return -1;
            }
        }
        return current;
    }
    insert (newValue, value = null) {
        let newNode = new ListNode(newValue);
        if (value !== null) {
            let node = this.find(value);
            if (node) {
                newNode.next = node.next;
                node.next = newNode;
            } else {
                new Error('not found the value:' + value);
                return false
            }
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    forEach (fn) {
        let current = this.head;
        let i = 0
        while (current.next !== null) {
            current = current.next;
            fn(current, i);
            i++;
        }
    }
    remove (value) {
        let prev = this.head;
        let current = this.head.next;
        while (current.value !== value && current !== null) {
            prev = current;
            current = current.next;
        }
        if (current) {
            prev.next = current.next;
            return current;
        } else {
            new Error('not found the value:' + value);
            return false;
        }
    }

    get length () {
        let length = 0;
        let current = this.head
        while (current.next) {
            current = current.next;
            length++;
        }
        return length;
    }
}
module.exports = LinkList;