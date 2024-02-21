const winBoard = [
  [1, 2, 3],
  [8, 0, 4],  
  [7, 6, 5]
]
const visit: {[key: string]: boolean} = {}

class NodeBFS {
  node: {
    board: number[][],
    parent: NodeBFS | null
  }
  constructor(board: number[][], parent: NodeBFS | null) {
    this.node = {
      board,
      parent
    }
  }

  findPath (path: number[][][], nodeBfs: NodeBFS | null) {
    if(nodeBfs === null || nodeBfs.node.parent === null) {
      return path
    }
    return this.findPath([...path, nodeBfs.node.board], nodeBfs.node.parent)
  }
}

const getEmptyCellPosition = (board: number[][]) => {
  let xPosition: number = 0
  let yPosition: number = 0

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if(board[i][j] === 0) {
        xPosition = i
        yPosition = j
      }
    }
  }

  return { x: xPosition, y: yPosition }
}

const checkMove = (emptyCellPos: { x: number, y: number }) => {
  const canMove = {
    left: emptyCellPos.y !== 0,
    right: emptyCellPos.y !== 2,
    up: emptyCellPos.x !== 0,
    down: emptyCellPos.x !== 2
  }

  return canMove
}

const leftMove = (board: number[][]) => {
  const tempBoard = copyBoard(board)
  
  const emptyCellPos = getEmptyCellPosition(tempBoard)
  const temp = tempBoard[emptyCellPos.x][emptyCellPos.y]
  tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x][emptyCellPos.y - 1]
  tempBoard[emptyCellPos.x][emptyCellPos.y - 1] = temp
  return tempBoard
}

const rightMove = (board: number[][]) => {
  const tempBoard = copyBoard(board)
  const emptyCellPos = getEmptyCellPosition(tempBoard)
  const temp = tempBoard[emptyCellPos.x][emptyCellPos.y]
  tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x][emptyCellPos.y + 1]
  tempBoard[emptyCellPos.x][emptyCellPos.y + 1] = temp
  return tempBoard
}

const upMove = (board: number[][]) => {
    const tempBoard = copyBoard(board)
    const emptyCellPos = getEmptyCellPosition(tempBoard)
    const temp = tempBoard[emptyCellPos.x][emptyCellPos.y]
    tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x - 1][emptyCellPos.y]
    tempBoard[emptyCellPos.x - 1][emptyCellPos.y] = temp
    return tempBoard
}

const downMove = (board: number[][]) => {
  const tempBoard = copyBoard(board)
  const emptyCellPos = getEmptyCellPosition(tempBoard)
  const temp = tempBoard[emptyCellPos.x][emptyCellPos.y]
  tempBoard[emptyCellPos.x][emptyCellPos.y] = tempBoard[emptyCellPos.x + 1][emptyCellPos.y]
  tempBoard[emptyCellPos.x + 1][emptyCellPos.y] = temp
  return tempBoard
}

const move = (board: number[][]) => {
  const nextBoards: number[][][] = []
  const canMove = checkMove(getEmptyCellPosition(board))

  if(canMove.left) {
    const nextBoard = leftMove(board)
    nextBoards.push(nextBoard)
  } 

  if(canMove.right) {
    const nextBoard = rightMove(board)
    nextBoards.push(nextBoard)
  }
  
  if(canMove.up) {
    const nextBoard = upMove(board)
    nextBoards.push(nextBoard)
  }
  
  if(canMove.down) {
    const nextBoard = downMove(board)
    nextBoards.push(nextBoard)
  }

  return nextBoards
}

const copyBoard = (board: number[][]) => {
  const newBoard: number[][] = []
  for(let i = 0; i < 3; i++) {
    newBoard[i] = []
    for(let j = 0; j < 3; j++) {
      newBoard[i][j] = board[i][j]
    }
  }
  return newBoard
}

const showBoard = (board: number[][]) => {
  for(let i = 0; i < 3; i++) {
    let rowString = ""
    for(let j = 0; j < 3; j++) {
      rowString += board[i][j] + " "
    }
    console.log(rowString)
  }

  console.log("\n");
}

const isWin = (board: number[][]) => {
  let count = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if(board[i][j] === winBoard[i][j]) {
        count++
      }
    }
  }
  
  return count === 9
}

const bfs = (board: number[][]) => {
  const queue: number[][][] = []

  queue.push(board)
  visit[JSON.stringify(board)] = true
  const nodeBfs = new NodeBFS(board, null)
    
  while(queue.length > 0) {
    const tempBoard = queue.shift() as number[][]
    const newBoards = move(tempBoard)

    const parent = new NodeBFS(tempBoard, null)
    if(isWin(tempBoard)) {
      return parent.findPath([], nodeBfs)
    }
    
    for(const board of newBoards) {
      const boardString = JSON.stringify(board)
      if(!visit[boardString]) {
        queue.push(board)
        nodeBfs.node.parent = new NodeBFS(board, parent)
        visit[boardString] = true
      }
    }
  }
}

const main = () => {
  const board = [
    [2, 8, 3],
    [1, 6, 4],  
    [7, 0, 5]
  ]

  const path = bfs(board)
  for(const board of path) {
    showBoard(board)
  }
  
  // const res = bfs(board)
  // for(const board of res) {
  //   showBoard(board)
  // }
}

main()