const winBoard = [
  [1, 2, 3],
  [8, 0, 4],  
  [7, 6, 5]
]
const visit: {[key: string]: boolean} = {}

class Board {
  private instance: number[][]

  constructor(instance: number[][]) {
    this.instance = instance
  }

  checkMove(emptyCellPos: { x: number, y: number }) {
    const canMove = {
      left: emptyCellPos.y !== 0,
      right: emptyCellPos.y !== 2,
      up: emptyCellPos.x !== 0,
      down: emptyCellPos.x !== 2
    }

    return canMove
  }

  leftMove() {
    const emptyCellPos = this.getEmptyCellPosition()
    const temp = this.instance[emptyCellPos.x][emptyCellPos.y]
    this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x][emptyCellPos.y - 1]
    this.instance[emptyCellPos.x][emptyCellPos.y - 1] = temp
  }

  rightMove() {
    const emptyCellPos = this.getEmptyCellPosition()
    const temp = this.instance[emptyCellPos.x][emptyCellPos.y]
    this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x][emptyCellPos.y + 1]
    this.instance[emptyCellPos.x][emptyCellPos.y + 1] = temp
  }

  upMove() {
    const emptyCellPos = this.getEmptyCellPosition()
    const temp = this.instance[emptyCellPos.x][emptyCellPos.y]
    this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x - 1][emptyCellPos.y]
    this.instance[emptyCellPos.x - 1][emptyCellPos.y] = temp
  }

  downMove() {
    const emptyCellPos = this.getEmptyCellPosition()
    const temp = this.instance[emptyCellPos.x][emptyCellPos.y]
    this.instance[emptyCellPos.x][emptyCellPos.y] = this.instance[emptyCellPos.x + 1][emptyCellPos.y]
    this.instance[emptyCellPos.x + 1][emptyCellPos.y] = temp
  }

  getEmptyCellPosition() {
    let xPosition: number = 0
    let yPosition: number = 0

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(this.instance[i][j] === 0) {
          xPosition = i
          yPosition = j
        }
      }
    }

    return { x: xPosition, y: yPosition }
  }

  isWin() {
    let count = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(this.instance[i][j] === winBoard[i][j]) {
          count++
        }
      }
    }
    
    return count === 9
  }

  showBoard() {
    this.instance.forEach(row => {
      console.log(row)
    })
    console.log("\n");
  }

  getInstance() {
    return this.instance
  }

  toString() {
    return `${this.instance}`
  }
}

const bfs = (board: Board) => {
  const queue: Board[] = []

  queue.push(board)
  visit[`${board.toString()}`]

  while(queue.length > 0) {
    const tempBoard = queue.shift() as Board
    if(tempBoard.isWin()) {
      // tempBoard.showBoard()
      break
    }
    const canMove = tempBoard.checkMove(tempBoard.getEmptyCellPosition())
    const nextBoards: Board[] = []

    if(canMove.left) {
      const nextBoard = new Board(tempBoard.getInstance())
      nextBoard.leftMove()
      nextBoards.push(nextBoard)
    }

    if(canMove.right) {
      const nextBoard = new Board(tempBoard.getInstance())
      nextBoard.rightMove()
      nextBoards.push(nextBoard)
    }

    if(canMove.up) {
      const nextBoard = new Board(tempBoard.getInstance())
      nextBoard.upMove()
      nextBoards.push(nextBoard)
    }

    if(canMove.down) {
      const nextBoard = new Board(tempBoard.getInstance())
      nextBoard.downMove()
      nextBoards.push(nextBoard)
    }

    nextBoards.forEach(board => {
      board.showBoard()
    })
    
    for(const nextBoard of nextBoards) {
      if(!visit[`${nextBoard.toString()}`]) {
        queue.push(nextBoard)
        visit[`${nextBoard.toString()}`] = true
      }
    }
    // console.log(visit)
  }

}

const main = () => {
  const board = new Board([
    [2, 8, 3],
    [1, 6, 4],  
    [7, 0, 5]
  ])

  bfs(board)
}

main()