
interface IState {
  node: number[]
  cost: number
}

const hFunction = (arr: IState[]) => {
  return arr.map(e => e.node[0] + e.node[1])
}

const fFunction = (arr: IState[]) => {
  const h = hFunction(arr)

  for(let i = 0; i < arr.length; i++) {
    arr[i].cost += h[i]
  }

  arr.sort((a, b) => a.cost - b.cost)
}

const aStar = () => {
  const L: IState[] = [{
    node: [3, 3, 1],
    cost: 0
  }]
  const R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]]
  const visit: {[key: string]: boolean} = {}
  visit[`${L[0].node}`] = true

  while(L.length) {
    const v: IState[] = []
    const u = L.shift()

    if(!u) continue

    if(u.node[0] === 0 && u.node[1] === 0 && u.node[2] === 0) {
      console.log("Win")
      break 
    }

    // Find all possible moves and calculate cost
    if(u.node[2] === 1) {
      R.forEach((r) => {
        if(u.node[0] >= r[0] && u.node[1] >= r[1]) {
          v.push({
            node: [u.node[0] - r[0], u.node[1] - r[1], 0],
            cost: u.cost + 1
          })
        }
      })
    }
    else {
      R.forEach((r) => {
        if(u.node[0] + r[0] <= u.node[0] && u.node[1] + r[1] <= u.node[1]) {
          v.push({
            node: [u.node[0] + r[0], u.node[1] + r[1], 1],
            cost: u.cost + 1
          })
        }
      })
    }

    fFunction(v)
    // console.log(v)

    for(const x of v) {
      const oppSide: number[] = [3 - x.node[0], 3 - x.node[1]]
      if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x.node[0] >= x.node[1] || x.node[0] === 0 || x.node[0] === 3) && !visit[`${x.node}`]) {
        L.push(x)
        visit[`${x.node}`] = true
      }
    }

    console.log(L)
  }
}

const main = () => {
  aStar()
}

main()