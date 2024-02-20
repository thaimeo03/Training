var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
    return TreeNode;
}());
var bfs = function (tree) {
    var queue = [tree];
    while (queue.length) {
        var node = queue.shift();
        console.log((!node || node.val === null) ? 'null' : node.val);
        if (node === null || node === void 0 ? void 0 : node.left) {
            queue.push(node.left);
        }
        if (node === null || node === void 0 ? void 0 : node.right) {
            queue.push(node.right);
        }
    }
};
function isBalanced(root) {
    var count = 0;
    var min = 0;
    var queue = [root];
    while (queue.length) {
        var len = queue.length;
        count++;
        for (var i = 0; i < len; i++) {
            var node = queue.shift();
            if (!(node === null || node === void 0 ? void 0 : node.left) && !(node === null || node === void 0 ? void 0 : node.right)) {
                min = count;
            }
            if (node === null || node === void 0 ? void 0 : node.left) {
                queue.push(node.left);
            }
            if (node === null || node === void 0 ? void 0 : node.right) {
                queue.push(node.right);
            }
        }
        if (count - min > 1) {
            return false;
        }
    }
    return true;
}
var main = function () {
    // [1,2,3,4,5,6,null,8] -> to tree node
    var res = isBalanced(new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, new TreeNode(6), new TreeNode(8))));
    console.log(res);
    // bfs(res)
};
main();
