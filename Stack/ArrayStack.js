const ARRAYSTACK = Symbol('arraystack');
class ArrayStack {
    constructor() {
        this[ARRAYSTACK] = [];
        this.length = 0;
    }
    push (item) {
        this[ARRAYSTACK].push(item);
        this.length++;
    }
    pop () {
        if (this.length === 0) return true;
        const deleteItem = this[ARRAYSTACK].splice(this.length - 1, 1);
        this.length--;
        return deleteItem;
    }
    forEach (fn) {
        this[ARRAYSTACK].forEach(fn);
    }
}