export class ModDownGraded {
  private a: number
  private m: number
  private n: number

  constructor({a, m, n}: {a: number, m: number, n: number}) {
    this.a = a
    this.m = m
    this.n = n
  }
  
  recursive(m: number): number {
    if(m === 1) return this.a % this.n
    if(m % 2 === 0) return (this.recursive(m / 2) ** 2) % this.n
    else return (this.recursive(m - 1) * this.a) % this.n
  }

  downgraded() {
    return this.recursive(this.m)
  }
}