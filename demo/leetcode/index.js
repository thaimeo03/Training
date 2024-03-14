"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leetCode = void 0;
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
function minDepth(root) {
    if (!root)
        return 0;
    var queue = [root];
    var minDepth = 0;
    while (queue.length) {
        var len = queue.length;
        minDepth++;
        for (var i = 0; i < len; i++) {
            var node = queue.shift();
            if (node) {
                if (!node.left && !node.right)
                    return minDepth;
                if (node.left)
                    queue.push(node.left);
                if (node.right)
                    queue.push(node.right);
            }
        }
    }
    return minDepth;
}
var leetCode = function () {
    // [2,null,3,null,4,null,5,null,6] -> to tree node
    var res = minDepth(new TreeNode(2, new TreeNode(3), new TreeNode(4, new TreeNode(5), new TreeNode(6))));
    console.log(res);
    // bfs(res)
};
exports.leetCode = leetCode;
