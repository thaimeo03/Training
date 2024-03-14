import { ModDownGraded } from "../downgraded"
import { Euler } from "../euler"

export class PrimitiveRootMo {
  private a: number
  private n: number

  constructor({a, n}: {a: number, n: number}) {
    this.a = a
    this.n = n
  }

  subMultiply() {
    const eulerValue = new Euler({n: this.n}).eulerValue()
    const subs: number[] = []

    for(let i = 1; i <= Math.round(eulerValue / 2); i++) {
      if(eulerValue % i === 0) {
        subs.push(i)
      }
    }

    return subs
  }

  isPrimitiveRoot() {
    const subs = this.subMultiply()

    for(const sub of subs) {
      const modDowngraded = new ModDownGraded({a: this.a, m: sub, n: this.n})
      if(modDowngraded.downgraded() === 1) {
        return false
      }
    }

    return true
  }
}