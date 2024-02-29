export class Board {
  private map: number[]
  private whiteValues: number[] = [30, 35, 40, 15, 20, 25, 0,  5, 10]
  private blackValues: number[] = [-10, -25, -40, -5, -20, -35, 0, -15, -30]
  private children: Board[] = []
  private isWhiteMoved: boolean

  constructor({map, isWhiteMoved}: {map: number[], isWhiteMoved: boolean}) {
    this.map = map
    this.isWhiteMoved = isWhiteMoved
  }

  getChildren() {
    return this.children
  }

  getIsWhiteMoved() {
    return this.isWhiteMoved
  }

  getWhiteIndexes() {
    const indexes: number[] = []
    this.map.forEach((value, index) => {
      if(value === 1) {
        indexes.push(index)
      }
    })
    return indexes
  }

  getBlackIndexes() {
    const indexes: number[] = []
    this.map.forEach((value, index) => {
      if(value === -1) {
        indexes.push(index)
      }
    })
    return indexes
  }

  getMap() {
    return this.map
  }

  getWhiteValue(index: number) {
    return this.whiteValues[index]
  }

  getBlackValue(index: number) {
    return this.blackValues[index]
  }

  swapMap(index1: number, index2: number) {
    const newMap = [...this.map]
    const temp = newMap[index1]
    newMap[index1] = newMap[index2]
    newMap[index2] = temp

    return newMap
  }
}