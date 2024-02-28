// Hàm hoán vị PC1
function permutedChoice1(key) {
    var PC1 = [
        57, 49, 41, 33, 25, 17, 9,
        1, 58, 50, 42, 34, 26, 18,
        10, 2, 59, 51, 43, 35, 27,
        19, 11, 3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,
        7, 62, 54, 46, 38, 30, 22,
        14, 6, 61, 53, 45, 37, 29,
        21, 13, 5, 28, 20, 12, 4
    ];
    var combined = "";
    for (var i = 0; i < PC1.length; i++) {
        combined += key.charAt(PC1[i] - 1);
    }
    var c0 = combined.substring(0, 28);
    var d0 = combined.substring(28);
    return [c0, d0];
}
// Hàm dịch vòng
function circularShift(c, d, n) {
    var shiftedC = c.substring(n) + c.substring(0, n);
    var shiftedD = d.substring(n) + d.substring(0, n);
    return [shiftedC, shiftedD];
}
// Hàm hoán vị PC2
function permutedChoice2(c, d) {
    var PC2 = [
        14, 17, 11, 24, 1, 5,
        3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8,
        16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
    ];
    var combined = c + d;
    var ki = "";
    for (var i = 0; i < PC2.length; i++) {
        ki += combined.charAt(PC2[i] - 1);
    }
    return ki;
}
// Hàm chính sinh khóa Ki từ khóa K
function generateRoundKeys(key) {
    var roundKeys = [];
    var shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    // Giai đoạn 1
    var _a = permutedChoice1(key), c0 = _a[0], d0 = _a[1];
    // roundKeys.push(c0 + d0);
    // Giai đoạn 2
    var _b = [c0, d0], ci = _b[0], di = _b[1];
    for (var i = 0; i < shifts.length; i++) {
        console.log("C".concat(i, ": ").concat(ci, ", D").concat(i, ": ").concat(di));
        var _c = circularShift(ci, di, shifts[i]), newCi = _c[0], newDi = _c[1];
        ci = newCi;
        di = newDi;
        roundKeys.push(permutedChoice2(ci, di));
    }
    return roundKeys;
}
// Hàm chuyển đổi hex sang binary
function hexToBinary(hex) {
    var binary = "";
    for (var i = 0; i < hex.length; i++) {
        var digit = parseInt(hex.charAt(i), 16).toString(2);
        // Đảm bảo mỗi ký tự hex được biểu diễn bằng 4 bits
        while (digit.length < 4) {
            digit = "0" + digit;
        }
        binary += digit;
    }
    return binary;
}
// Sử dụng ví dụ:
var key = "0f1571c947d9e859";
var binKey = hexToBinary(key);
var roundKeys = generateRoundKeys(binKey);
console.log("Round Keys:");
roundKeys.forEach(function (key, index) { return console.log("Round ".concat(index + 1, ": ").concat(key)); });
