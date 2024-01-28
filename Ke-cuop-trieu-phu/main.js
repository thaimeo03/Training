var T = [0, 0, 0];
var R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
var isActive = true;
var visit = {};
var getAdvantage = function (arr) {
    return arr.sort(function (a, b) { return (a[0] + a[1]) - (b[0] + b[1]); });
};
var bfs = function (u) {
    var L = [];
    var res = [];
    L.push(u);
    visit["".concat(u)] = true;
    console.log("List:");
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
        getAdvantage(v);
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
        if (L.length === 0) {
            isActive = false;
            return "break";
        }
        console.log(L);
    };
    while (L[0][0] !== T[0] || L[0][1] !== T[1] || L[0][2] !== T[2]) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    res.push(T);
    return res;
};
// const hillClimbing = (u: number[]) => {
//   let L1: number[][] = []
//   const L: number[][] = []
//   const res: number[][] = []
//   L1.push(u)
//   L.push(u)
//   visit[`${u}`] = true
//   console.log("List:");
//   while(L[0][0] !== T[0] || L[0][1] !== T[1] || L[0][2] !== T[2]) {
//     let v: number[][] = []
//     const temp = L.shift() as number[]
//     if(temp[2] === 1) {
//       R.forEach((r) => {
//         if(temp[0] >= r[0] && temp[1] >= r[1]) {
//           v.push([temp[0] - r[0], temp[1] - r[1], 0])
//         }
//       })
//     }
//     else {
//       R.forEach((r) => {
//         if(temp[0] + r[0] <= u[0] && temp[1] + r[1] <= u[1]) {
//           v.push([temp[0] + r[0], temp[1] + r[1], 1])
//         }
//       })
//     }
//     getAdvantage(v)
//     v.forEach((x) => {
//       L1.push(x)
//     })
//     let count = 0
//     for(const x of L1) {
//       const oppSide: number[] = [u[0] - x[0], u[1] - x[1]]  
//       if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x[0] >= x[1] || x[0] === 0 || x[0] === 3) && !visit[`${x}`]) {
//         L.push([x[0], x[1], x[2]])
//         visit[`${x}`] = true
//         count++
//       }
//     }
//     if(count > 0) {
//       res.push(temp)
//       count = 0
//     }
//     if(L.length === 0) {
//       isActive = false
//       break
//     }
//     L1 = []
//     console.log(L)
//   }
//   res.push(T)
//   return res
// }
// const dfs = (u: number[]) => {
//   const L: number[][] = []
//   const res: number[][] = []
//   L.push(u)
//   visit[`${u}`] = true
//   let lastIndex = L.length - 1
//   while(L[lastIndex][0] !== T[0] || L[lastIndex][1] !== T[1] || L[lastIndex][2] !== T[2]) {
//     const v: number[][] = []
//     const temp = L.pop() as number[]
//     if(temp[2] === 1) {
//       R.forEach((r) => {
//         if(temp[0] >= r[0] && temp[1] >= r[1]) {
//           v.push([temp[0] - r[0], temp[1] - r[1], 0])
//         }
//       })
//     }
//     else {
//       R.forEach((r) => {
//         if(temp[0] + r[0] <= u[0] && temp[1] + r[1] <= u[1]) {
//           v.push([temp[0] + r[0], temp[1] + r[1], 1])
//         }
//       })
//     }
//     getAdvantage(v)
//     let count = 0
//     for(const x of v) {
//       const oppSide: number[] = [u[0] - x[0], u[1] - x[1]]  
//       if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x[0] >= x[1] || x[0] === 0 || x[0] === 3) && !visit[`${x}`]) {
//         L.push([x[0], x[1], x[2]])
//         visit[`${x}`] = true
//         count++
//       }
//     }
//     if(count > 0) {
//       res.push(temp)
//       count = 0
//     }
//     if(L.length === 0) {
//       isActive = false
//       break
//     }
//     lastIndex = L.length - 1
//     console.log(L)
//   }
//   res.push(T)
//   return res
// }
var main = function () {
    var u = [3, 3, 1];
    var res = bfs(u);
    console.log("Step:");
    isActive === true ? (res.forEach(function (x) {
        console.log(x);
    })) : console.log("Not found");
};
main();
