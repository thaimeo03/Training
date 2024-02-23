// interface IState {
//   node: number[];
//   cost: number;
//   parent?: IState; // Thêm trường parent để lưu trữ trạng thái cha
// }
// const hFunction = (arr: IState[]) => {
//   return arr.map(e => e.node[0] + e.node[1]);
// };
// const fFunction = (arr: IState[]) => {
//   const h = hFunction(arr);
//   for(let i = 0; i < arr.length; i++) {
//     arr[i].cost += h[i];
//   }
//   // h.forEach(e => console.log(e))
//   // arr.forEach(e => console.log(e.cost))
//   return arr.sort((a, b) => a.cost - b.cost);
// };
// const aStar = () => {
//   const L: IState[] = [{
//     node: [3, 3, 1],
//     cost: 0
//   }];
//   const R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
//   const visit: {[key: string]: boolean} = {};
//   visit[`${L[0].node}`] = true;
//   let goalState: IState | undefined;
//   while(L.length > 0) {
//     const v: IState[] = [];
//     const u = L.shift();
//     // console.log(u)
//     if(!u) continue;
//     if(u.node[0] === 0 && u.node[1] === 0 && u.node[2] === 0) {
//       goalState = u; // Lưu trạng thái mục tiêu
//       break;
//     }
//     // Find all possible moves and calculate cost
//     if(u.node[2] === 1) {
//       R.forEach((r) => {
//         if(u.node[0] >= r[0] && u.node[1] >= r[1]) {
//           const newNode = [u.node[0] - r[0], u.node[1] - r[1], 0];
//           const newState = {
//             node: newNode,
//             cost: u.cost + 1, // c(v) = c(u) + 1
//             parent: u // Lưu trạng thái cha
//           };
//           // console.log(newState.cost);
//           v.push(newState);
//         }
//       });
//     }
//     else {
//       R.forEach((r) => {
//         if(u.node[0] + r[0] <= 3 && u.node[1] + r[1] <= 3) {
//           const newNode = [u.node[0] + r[0], u.node[1] + r[1], 1];
//           const newState = {
//             node: newNode,
//             cost: u.cost + 1, // c(v) = c(u) + 1
//             parent: u // Lưu trạng thái cha
//           };
//           // console.log(newState.cost);
//           v.push(newState);
//         }
//       });
//     }
//     fFunction(v);
//     // console.log(v.map(e => e.node))
//     for(const x of v) {
//       const oppSide: number[] = [3 - x.node[0], 3 - x.node[1]]
//       if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x.node[0] >= x.node[1] || x.node[0] === 0 || x.node[0] === 3) && !visit[`${x.node}`]) {
//         L.push(x)
//         visit[`${x.node}`] = true
//       }
//     }
//     console.log(L.map(e => {
//       return {
//         node: e.node,
//         // cost: e.cost
//       }
//     }));
//   }
//   // Tái tạo đường đi nếu có thể đạt được trạng thái mục tiêu
//   if(goalState) {
//     console.log("Win");
//     const path: IState[] = [];
//     let current: IState | undefined = goalState;
//     while(current) {
//       path.push(current);
//       current = current.parent;
//     }
//     // In ra đường đi từ trạng thái ban đầu đến trạng thái mục tiêu
//     for(let i = path.length - 1; i >= 0; i--) {
//       console.log(path[i].node);
//     }
//   } else {
//     console.log("No solution");
//   }
// };
// const main = () => {
//   aStar();
// };
// main();
var BoatNode = /** @class */ (function () {
    function BoatNode(value, cost, parent) {
        this.value = value;
        this.cost = cost;
        this.parent = parent;
    }
    return BoatNode;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.L = [new BoatNode([3, 3, 1], 0)];
        this.step = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
        this.visit = {}; // Can use map or dictionary (i used dictionary instead)
        this.visit["".concat(this.L[0].value)] = true;
    }
    Game.prototype.generatePossibleMoves = function (u) {
        var v = [];
        if (u.value[2] === 1) {
            this.step.forEach(function (r) {
                if (u.value[0] >= r[0] && u.value[1] >= r[1]) {
                    var newNode = [u.value[0] - r[0], u.value[1] - r[1], 0];
                    var newState = new BoatNode(newNode, u.cost + 1, u);
                    v.push(newState);
                }
            });
        }
        else {
            this.step.forEach(function (r) {
                if (u.value[0] + r[0] <= 3 && u.value[1] + r[1] <= 3) {
                    var newNode = [u.value[0] + r[0], u.value[1] + r[1], 1];
                    var newState = new BoatNode(newNode, u.cost + 1, u);
                    v.push(newState);
                }
            });
        }
        return this.handleF(v);
    };
    Game.prototype.handleH = function (boatNodes) {
        return boatNodes.map(function (boatNode) { return boatNode.value[0] + boatNode.value[1]; });
    };
    Game.prototype.handleF = function (boatNodes) {
        var h = this.handleH(boatNodes);
        for (var i = 0; i < boatNodes.length; i++) {
            boatNodes[i].cost += h[i];
        }
        // h.forEach(e => console.log(e))
        // arr.forEach(e => console.log(e.cost))
        return boatNodes.sort(function (a, b) { return a.cost - b.cost; });
    };
    Game.prototype.updateQueue = function (v) {
        for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
            var x = v_1[_i];
            var oppSide = [3 - x.value[0], 3 - x.value[1]];
            if ((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x.value[0] >= x.value[1] || x.value[0] === 0 || x.value[0] === 3) && !this.visit["".concat(x.value)]) {
                this.L.push(x);
                this.visit["".concat(x.value)] = true;
            }
        }
        console.log(this.L.map(function (boatNode) { return boatNode.value; }));
    };
    Game.prototype.reconstructPath = function (goalState) {
        if (goalState) {
            console.log("Win");
            var path = [];
            var current = goalState;
            while (current) {
                path.push(current);
                current = current.parent;
            }
            for (var i = path.length - 1; i >= 0; i--) {
                console.log(path[i].value);
            }
        }
        else {
            console.log("No solution");
        }
    };
    Game.prototype.aStar = function () {
        while (this.L.length > 0) {
            var u = this.L.shift();
            if (!u)
                continue;
            if (u.value[0] === 0 && u.value[1] === 0 && u.value[2] === 0) {
                this.goalState = u;
                break;
            }
            var v = this.generatePossibleMoves(u);
            this.updateQueue(v);
        }
        this.reconstructPath(this.goalState);
    };
    return Game;
}());
var game = new Game();
game.aStar();
