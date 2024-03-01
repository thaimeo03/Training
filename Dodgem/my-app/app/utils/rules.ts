import { START } from "../constants/start"
import { ISelected, IStartSelected } from "../page"
import { Board } from "./board"

export const canMoveWhite = ({
  startSelected,
  endSelected,
  map,
  index,
}: {
  startSelected: IStartSelected,
  endSelected: ISelected,
  map: number[],
  index: number
}) => {
  return !startSelected.isSelected && !endSelected.isSelected && (map[index] === 1 && startSelected.isWhiteMoved || map[index] === -1 && !startSelected.isWhiteMoved)
}

export const canSelectEnd = ({
  startSelected,
  index: nextIndex,
}: {
  startSelected: IStartSelected,
  index: number
}) => {
  const nextIndexMoves = []
  const nextIndex_1 = (startSelected.index as number) + 1
  const nextIndex_2 = startSelected.isWhiteMoved ? (startSelected.index as number) - 1 : -1
  const nextIndex_3 = !startSelected.isWhiteMoved ? (startSelected.index as number) + 3 : -1
  const nextIndex_4 = (startSelected.index as number) - 3
  nextIndexMoves.push(nextIndex_1, nextIndex_2, nextIndex_3, nextIndex_4)

  nextIndexMoves.filter((item) => {
    return item >= 0 && item <= 8
  })

  return startSelected.isSelected && nextIndex !== startSelected.index && nextIndex !== startSelected.index && nextIndexMoves.includes(nextIndex)
}

export const checkWinner = ({countBlack, countWhite}: {countBlack: number, countWhite: number}) => {
  let winner = ""
  if(countBlack === 2) {
    winner = "Black"
  }
  else if(countWhite === 2) {
    winner = "White"
  }
  return winner
}

// Computer
export const generateBoardNodesComputerMoves = (board: Board): Board[] => {
  const nextBoards: Board[] = []

  if(board.getIsWhiteMoved()) {
    const whiteIndexes = board.getWhiteIndexes()

    whiteIndexes.forEach((index) => {
      const tempNextMoves = []
      tempNextMoves.push(index + 1)
      tempNextMoves.push(index - 1)
      tempNextMoves.push(index - 3)

      const tempFilteredMoves =  tempNextMoves.filter((item) => {
        return item >= 0 && item <= 8 && !whiteIndexes.includes(item)
      })

      // Create next boards
      tempFilteredMoves.forEach((item) => {
        const newBoard = new Board({
          map: board.swapMap(index, item),
          isWhiteMoved: false // Definitely white -> black
        })
        nextBoards.push(newBoard)
      })
    })
  }
  else {
    const blackIndexes = board.getBlackIndexes()
    
    blackIndexes.forEach((index) => {
      const tempNextMoves = []
      tempNextMoves.push(index + 1)
      tempNextMoves.push(index + 3)
      tempNextMoves.push(index - 3)

      const tempFilteredMoves =  tempNextMoves.filter((item) => {
        return item >= 0 && item <= 8 && !blackIndexes.includes(item)
      })

      tempFilteredMoves.forEach((item) => {
        const newBoard = new Board({
          map: board.swapMap(index, item),
          isWhiteMoved: true // Definitely black -> white
        })
        nextBoards.push(newBoard)
      })
    })
  }

  return nextBoards
}

export const generateTreeNodes = (rootBoard: Board) => { // Use BFS
  const queue = [rootBoard]

  while(queue.length) {
    const temp = queue.shift()
    
    if(!temp) break;

    const nextBoards = generateBoardNodesComputerMoves(temp)
    nextBoards.forEach(nextBoard => {
      queue.push(nextBoard) // Something...
    })
  }
}

export const computerMove = (map: number[]) => {
  // MiniMax strategy
  const rootBoard = new Board({ map: START, isWhiteMoved: true })
}