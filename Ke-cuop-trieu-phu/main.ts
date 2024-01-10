const T = [0, 0, 0]
const R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]]

const visit: { [key: string]: boolean } = {}

const bfs = (u: number[]) => {
  const L: number[][] = []
  const res: number[][] = []
  
  L.push(u)
  visit[`${u}`] = true
  
  while(L[0][0] !== T[0] || L[0][1] !== T[1] || L[0][2] !== T[2]) {
    const v: number[][] = []
    const temp = L.shift() as number[]
  
    if(temp[2] === 1) {
      R.forEach((r) => {
        if(temp[0] >= r[0] && temp[1] >= r[1]) {
          v.push([temp[0] - r[0], temp[1] - r[1], 0])
        }
      })
    }
    else {
      R.forEach((r) => {
        if(temp[0] + r[0] <= u[0] && temp[1] + r[1] <= u[1]) {
          v.push([temp[0] + r[0], temp[1] + r[1], 1])
        }
      })
    }

    let count = 0
    for(const x of v) {
      if((x[0] >= x[1] || x[0] == 0 || x[1] == 0) && !visit[`${x}`]) {
        L.push([x[0], x[1], x[2]])
        visit[`${x}`] = true
        count++
      }
    }

    if(count > 0) {
      res.push(temp)
      count = 0
    }
    console.log(L)
  }

  res.push(T)
  return res
}

const main = () => {
  const u = [3, 3, 1]
  const res = bfs(u)

  res.forEach((x) => {
    console.log(x)
  })
}

main()