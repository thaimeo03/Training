var hFunction = function (arr) {
    return arr.map(function (e) { return e.node[0] + e.node[1]; });
};
var fFunction = function (arr) {
    return arr.sort(function (a, b) { return a.cost - b.cost; });
};
var aStar = function () {
    var L = [{
            node: [3, 3, 1],
            cost: 0
        }];
    var R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
    var visit = {};
    visit["".concat(L[0].node)] = true;
    var goalState;
    var _loop_1 = function () {
        var v = [];
        var u = L.shift();
        // console.log(u)
        if (!u)
            return "continue";
        if (u.node[0] === 0 && u.node[1] === 0 && u.node[2] === 0) {
            goalState = u; // Lưu trạng thái mục tiêu
            return "break";
        }
        // Find all possible moves and calculate cost
        if (u.node[2] === 1) {
            R.forEach(function (r) {
                if (u.node[0] >= r[0] && u.node[1] >= r[1]) {
                    var newNode = [u.node[0] - r[0], u.node[1] - r[1], 0];
                    var newState = {
                        node: newNode,
                        cost: u.cost + 1,
                        parent: u // Lưu trạng thái cha
                    };
                    v.push(newState);
                }
            });
        }
        else {
            R.forEach(function (r) {
                if (u.node[0] + r[0] <= 3 && u.node[1] + r[1] <= 3) {
                    var newNode = [u.node[0] + r[0], u.node[1] + r[1], 1];
                    var newState = {
                        node: newNode,
                        cost: u.cost + 1,
                        parent: u // Lưu trạng thái cha
                    };
                    v.push(newState);
                }
            });
        }
        fFunction(v);
        // console.log(v)
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var x = v_1[_i];
            var stateKey = x.node.join(',');
            if (!visit[stateKey]) {
                L.push(x);
                visit[stateKey] = true;
            }
        }
    };
    while (L.length > 0) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    // Tái tạo đường đi nếu có thể đạt được trạng thái mục tiêu
    if (goalState) {
        console.log("Win");
        var path = [];
        var current = goalState;
        while (current) {
            path.push(current);
            current = current.parent;
        }
        // In ra đường đi từ trạng thái ban đầu đến trạng thái mục tiêu
        for (var i = path.length - 1; i >= 0; i--) {
            console.log(path[i].node);
        }
    }
    else {
        console.log("No solution");
    }
};
var main = function () {
    aStar();
};
main();
