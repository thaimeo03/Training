import { ModInverse } from "../mod-inverse"

export class ModEquation {
  private m1: number
  private m2: number
  private m3: number

  private a1: number
  private a2: number
  private a3: number

  constructor({m1, m2, m3, a1, a2, a3}: {m1: number, m2: number, m3: number, a1: number, a2: number, a3: number}) {
    this.m1 = m1
    this.m2 = m2
    this.m3 = m3

    this.a1 = a1
    this.a2 = a2
    this.a3 = a3

  }

  chineseRemainderTheorem() {
    const m = this.m1 * this.m2 * this.m3
    const M1 = this.m2 * this.m3
    const M2 = this.m1 * this.m3
    const M3 = this.m1 * this.m2

    // yi = Mi^-1 mod mi
    const y1 = new ModInverse({a: M1, n: this.m1}).moduloInverseByExtendedEuclideanAlgorithm() as number
    const y2 = new ModInverse({a: M2, n: this.m2}).moduloInverseByExtendedEuclideanAlgorithm() as number
    const y3 = new ModInverse({a: M3, n: this.m3}).moduloInverseByExtendedEuclideanAlgorithm() as number
    
    const x = (M1 * y1 * this.a1 + M2 * y2 * this.a2 + M3 * y3 * this.a3) % m
    return x
  }
}