var hFunction = function (arr) {
    return arr.map(function (e) { return e.node[0] + e.node[1]; });
};
var fFunction = function (arr) {
    var h = hFunction(arr);
    for (var i = 0; i < arr.length; i++) {
        arr[i].cost += h[i];
    }
    arr.sort(function (a, b) { return a.cost - b.cost; });
};
var aStar = function () {
    var L = [{
            node: [3, 3, 1],
            cost: 0
        }];
    var R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
    var visit = {};
    visit["".concat(L[0].node)] = true;
    var _loop_1 = function () {
        var v = [];
        var u = L.shift();
        if (!u)
            return "continue";
        if (u.node[0] === 0 && u.node[1] === 0 && u.node[2] === 0) {
            console.log("Win");
            return "break";
        }
        // Find all possible moves and calculate cost
        if (u.node[2] === 1) {
            R.forEach(function (r) {
                if (u.node[0] >= r[0] && u.node[1] >= r[1]) {
                    v.push({
                        node: [u.node[0] - r[0], u.node[1] - r[1], 0],
                        cost: u.cost + 1
                    });
                }
            });
        }
        else {
            R.forEach(function (r) {
                if (u.node[0] + r[0] <= u.node[0] && u.node[1] + r[1] <= u.node[1]) {
                    v.push({
                        node: [u.node[0] + r[0], u.node[1] + r[1], 1],
                        cost: u.cost + 1
                    });
                }
            });
        }
        fFunction(v);
        // console.log(v)
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var x = v_1[_i];
            var oppSide = [3 - x.node[0], 3 - x.node[1]];
            if ((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x.node[0] >= x.node[1] || x.node[0] === 0 || x.node[0] === 3) && !visit["".concat(x.node)]) {
                L.push(x);
                visit["".concat(x.node)] = true;
            }
        }
        console.log(L);
    };
    while (L.length) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
};
var main = function () {
    aStar();
};
main();
