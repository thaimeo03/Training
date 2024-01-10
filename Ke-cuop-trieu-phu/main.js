var T = [0, 0, 0];
var R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
var visit = {};
var bfs = function (u) {
    var L = [];
    var res = [];
    L.push(u);
    visit["".concat(u)] = true;
    var _loop_1 = function () {
        var v = [];
        var temp = L.shift();
        if (temp[2] === 1) {
            R.forEach(function (r) {
                if (temp[0] >= r[0] && temp[1] >= r[1]) {
                    v.push([temp[0] - r[0], temp[1] - r[1], 0]);
                }
            });
        }
        else {
            R.forEach(function (r) {
                if (temp[0] + r[0] <= u[0] && temp[1] + r[1] <= u[1]) {
                    v.push([temp[0] + r[0], temp[1] + r[1], 1]);
                }
            });
        }
        var count = 0;
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var x = v_1[_i];
            var oppSide = [u[0] - x[0], u[1] - x[1]];
            if ((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x[0] >= x[1] || x[0] === 0 || x[0] === 3) && !visit["".concat(x)]) {
                L.push([x[0], x[1], x[2]]);
                visit["".concat(x)] = true;
                count++;
            }
        }
        if (count > 0) {
            res.push(temp);
            count = 0;
        }
        console.log(L);
    };
    while (L[0][0] !== T[0] || L[0][1] !== T[1] || L[0][2] !== T[2]) {
        _loop_1();
    }
    res.push(T);
    return res;
};
var main = function () {
    var u = [3, 3, 1];
    var res = bfs(u);
    res.forEach(function (x) {
        console.log(x);
    });
};
main();
