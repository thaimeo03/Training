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
export const getPossibleComputerMoves = (board: Board) => {
  const map = board.getMap()

  if(board.getIsWhiteMoved()) {
    const whiteIndexes = board.getWhiteIndexes()
    const nextMoves = []
    // Change something...
    whiteIndexes.forEach((index) => {
      nextMoves.push(index - 3)
      nextMoves.push(index - 1)
      nextMoves.push(index + 1)
    })
    whiteIndexes.filter((item) => {
      return item >= 0 && item <= 8 && !whiteIndexes.includes(item)
    })
  }
}

export const computerMove = (map: number[]) => {
  // MiniMax strategy
  const rootBoard = new Board({ map: START, isWhiteMoved: true })
  
}