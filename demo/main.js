var mod = function (_a) {
    var a = _a.a, b = _a.b;
    var c = 0;
    for (var i = 1; i < b; i++) {
        if (a * i % b === 1) {
            c = i;
        }
    }
    return c;
};
var main = function () {
    console.log("Result: ".concat(mod({ a: 42, b: 2431 })));
};
main();
