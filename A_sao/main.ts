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


class BoatNode {
  value: number[];
  cost: number;
  parent?: BoatNode;

  constructor(value: number[], cost: number, parent?: BoatNode) {
    this.value = value;
    this.cost = cost;
    this.parent = parent;
  }
}

class Game {
  private L: BoatNode[] = [new BoatNode([3, 3, 1], 0)];
  private step = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
  private visit: {[key: string]: boolean} = {}; // Can use map or dictionary (i used dictionary instead)
  private goalState: BoatNode | undefined;

  constructor() {
    this.visit[`${this.L[0].value}`] = true;
  }

  private generatePossibleMoves(u: BoatNode): BoatNode[] {
    const v: BoatNode[] = [];
    if(u.value[2] === 1) {
      this.step.forEach((r) => {
        if(u.value[0] >= r[0] && u.value[1] >= r[1]) {
          const newNode = [u.value[0] - r[0], u.value[1] - r[1], 0];
          const newState = new BoatNode(newNode, u.cost + 1, u);
          v.push(newState);
        }
      });
    }
    else {
      this.step.forEach((r) => {
        if(u.value[0] + r[0] <= 3 && u.value[1] + r[1] <= 3) {
          const newNode = [u.value[0] + r[0], u.value[1] + r[1], 1];
          const newState = new BoatNode(newNode, u.cost + 1, u);
          v.push(newState);
        }
      });
    }
    return this.handleF(v);
  }

  private handleH(boatNodes: BoatNode[]): number[] {
    return boatNodes.map(boatNode => boatNode.value[0] + boatNode.value[1])
  }

  private handleF(boatNodes: BoatNode[]): BoatNode[] {
    const h = this.handleH(boatNodes);
    for(let i = 0; i < boatNodes.length; i++) {
      boatNodes[i].cost += h[i];
    }
    // h.forEach(e => console.log(e))
    // arr.forEach(e => console.log(e.cost))
    return boatNodes.sort((a, b) => a.cost - b.cost);
  }

  private updateQueue(v: BoatNode[]): void {
    for(const x of v) {
      const oppSide: number[] = [3 - x.value[0], 3 - x.value[1]]
      if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x.value[0] >= x.value[1] || x.value[0] === 0 || x.value[0] === 3) && !this.visit[`${x.value}`]) {
        this.L.push(x)
        this.visit[`${x.value}`] = true
      }
    }
    console.log(this.L.map(boatNode => boatNode.value))
  }

  private reconstructPath(goalState: BoatNode | undefined): void {
    if(goalState) {
      console.log("Win");
      const path: BoatNode[] = [];
      let current: BoatNode | undefined = goalState;
      while(current) {
        path.push(current);
        current = current.parent;
      }
      for(let i = path.length - 1; i >= 0; i--) {
        console.log(path[i].value);
      }
    } else {
      console.log("No solution");
    }
  }

  public aStar(): void {
    while(this.L.length > 0) {
      const u = this.L.shift();
      if(!u) continue;
      if(u.value[0] === 0 && u.value[1] === 0 && u.value[2] === 0) {
        this.goalState = u;
        break;
      }
      const v = this.generatePossibleMoves(u);
      this.updateQueue(v);
    }
    this.reconstructPath(this.goalState);
  }
}

const game = new Game();
game.aStar();