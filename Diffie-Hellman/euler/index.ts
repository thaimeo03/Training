import { GCDCalculator } from "../gcd"
import { ModDownGraded } from "../downgraded"

export class Euler {
  private a: number | undefined
  private m: number | undefined
  private n: number

  constructor({a, m, n}: {a?: number, m?: number, n: number}) {
    this.a = a
    this.m = m
    this.n = n
  }

  eulerValue() {
    const visited: {[key: number]: number} = {}
    let temp = this.n

    for(let i = 2; i <= this.n; i++) {
      while(temp % i === 0) {
        temp = temp / i
        visited[i] = visited[i] ? visited[i] + 1 : 1
      }
    }

    let value = 1
    Object.keys(visited).forEach(key => {
      value *= Math.pow(+key, visited[key]) - Math.pow(+key, visited[key] - 1)
    })
    
    return value
  }

  isActive() {
    if(!this.a || !this.m) {
      throw new Error('a and m are required')
    }

    const gcdCal = new GCDCalculator()
    return gcdCal.gcd(this.a, this.n) === 1
  }

  eulerPower() {
    if(!this.a || !this.m) {
      throw new Error('a and m are required')
    }
  
    if(!this.isActive()) {
      throw new Error('Can not calculate power if a and n are not co-prime')
    }

    const eulerValue = this.eulerValue()

    const newPower = this.m % eulerValue
    const downgraded = new ModDownGraded({a: this.a, m: newPower, n: this.n})

    return downgraded.downgraded()
  }
}