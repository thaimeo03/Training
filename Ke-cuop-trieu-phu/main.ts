const T = [0, 0, 0]
const R = [[0, 1], [1, 0], [1, 1], [0, 2], [2, 0]]
let isActive = true

const visit: { [key: string]: boolean } = {}

const hFunction = (arr: number[][]) => {
  return arr.map(e => e[0] + e[1])
}

const bfs = (u: number[]) => {
  const L: number[][] = []
  const res: number[][] = []
  
  L.push(u)
  visit[`${u}`] = true
  
  console.log("List:");
  
  while(L[0][0] !== T[0] || L[0][1] !== T[1] || L[0][2] !== T[2]) {
    let v: number[][] = []
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

    const hArr = hFunction(v)

    let count = 0
    for(const x of v) {
      const oppSide: number[] = [u[0] - x[0], u[1] - x[1]]  
      if((oppSide[0] >= oppSide[1] || oppSide[0] === 0 || oppSide[0] === 3) && (x[0] >= x[1] || x[0] === 0 || x[0] === 3) && !visit[`${x}`]) {
        L.push([x[0], x[1], x[2]])
        visit[`${x}`] = true
        count++
      }
    }

    if(count > 0) {
      res.push(temp)
      count = 0
    }

    if(L.length === 0) {
      isActive = false
      break
    }
    console.log(L)
  }

  res.push(T)
  return res
}

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

const main = () => {
  const u = [3, 3, 1]
  const res = bfs(u)

  console.log("Step:")

  isActive === true ? (
    res.forEach((x) => {
    console.log(x)
  })) : console.log("Not found")
}

main()