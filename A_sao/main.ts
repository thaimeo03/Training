interface IState {
  node: number[];
  cost: number;
  parent?: IState; // Thêm trường parent để lưu trữ trạng thái cha
}

const hFunction = (arr: IState[]) => {
  return arr.map(e => e.node[0] + e.node[1]);
};

const fFunction = (arr: IState[]) => {
  return arr.sort((a, b) => a.cost - b.cost);
};

const aStar = () => {
  const L: IState[] = [{
    node: [3, 3, 1],
    cost: 0
  }];
  const R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]];
  const visit: {[key: string]: boolean} = {};
  visit[`${L[0].node}`] = true;
  
  let goalState: IState | undefined;

  while(L.length > 0) {
    const v: IState[] = [];
    const u = L.shift();
    // console.log(u)

    if(!u) continue;

    if(u.node[0] === 0 && u.node[1] === 0 && u.node[2] === 0) {
      goalState = u; // Lưu trạng thái mục tiêu
      break;
    }

    // Find all possible moves and calculate cost
    if(u.node[2] === 1) {
      R.forEach((r) => {
        if(u.node[0] >= r[0] && u.node[1] >= r[1]) {
          const newNode = [u.node[0] - r[0], u.node[1] - r[1], 0];
          const newState = {
            node: newNode,
            cost: u.cost + 1,
            parent: u // Lưu trạng thái cha
          };
          v.push(newState);
        }
      });
    }
    else {
      R.forEach((r) => {
        if(u.node[0] + r[0] <= 3 && u.node[1] + r[1] <= 3) {
          const newNode = [u.node[0] + r[0], u.node[1] + r[1], 1];
          const newState = {
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

    
    for(const x of v) {
      const stateKey = x.node.join(',');
      if(!visit[stateKey]) {
        L.push(x);
        visit[stateKey] = true;
      }
    }

    // console.log(L)
  }

  // Tái tạo đường đi nếu có thể đạt được trạng thái mục tiêu
  if(goalState) {
    console.log("Win");
    const path: IState[] = [];
    let current: IState | undefined = goalState;
    while(current) {
      path.push(current);
      current = current.parent;
    }
    // In ra đường đi từ trạng thái ban đầu đến trạng thái mục tiêu
    for(let i = path.length - 1; i >= 0; i--) {
      console.log(path[i].node);
    }
  } else {
    console.log("No solution");
  }
};

const main = () => {
  aStar();
};

main();
