const LinkList = require('../LinkList');

describe('LinkList', function () {
    it("LinkList have a head", function () {
        const linkList = new LinkList()
        expect(linkList.head.value).toEqual('head');
    })
    it("LinkList insert a node and find it", function () {
        const linkList = new LinkList()
        linkList.insert('test');
        expect(linkList.find('test').value).toEqual('test');
    })
    it("LinkList forEach", function () {
        const linkList = new LinkList()
        const arr = ['test', 'test1', 'test2', 'test3', 'test4'];
        linkList.insert('test');
        linkList.insert('test1');
        linkList.insert('test2');
        linkList.insert('test3');
        linkList.insert('test4');
        linkList.forEach(function (node, i) {
            expect(node.value).toEqual(arr[i])
        })
    })
    it("LinkList remove", function () {
        const linkList = new LinkList()
        const arr = ['test', 'test2'];
        linkList.insert('test');
        linkList.insert('test1');
        linkList.insert('test2');
        linkList.remove('test1');
        linkList.forEach(function (node, i) {
            expect(node.value).toEqual(arr[i])
        })
    })
    it("LinkList's length 0", function () {
        const linkList = new LinkList();
        expect(linkList.length).toEqual(0)
    })
    it("LinkList's length", function () {
        const linkList = new LinkList()
        linkList.insert('test');
        linkList.insert('test1');
        linkList.insert('test2');
        linkList.insert('test3');
        linkList.insert('test4');
        expect(linkList.length).toEqual(5)
    })
})
