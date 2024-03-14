import { GCDCalculator } from "../../gcd"

export class ModInverse {
  private a: number
  private n: number

  constructor({a, n}: {a: number, n: number}) {
    this.a = a
    this.n = n
  }

  // Inverse Modulo by definition
  moduloInverseByDefinition(){
  const isValid = this.checkModuloInverse({isExtendMod: false})
  if(isValid) {
    for(let i = 1; i < this.n; i++) {
      if(i * this.a % this.n === 1) {
        return i
      }
    }
  }
  return 'Inverse Modulo does not exist'
  }

  // Inverse Modulo by Extended Euclidean Algorithm
  moduloInverseByExtendedEuclideanAlgorithm() {
    const [d, _, y] = this.checkModuloInverse({isExtendMod: true}) as [number, number, number]
    if(d === 1) {
      return (y % this.n + this.n) % this.n
    }
    else {
      return 'Inverse Modulo does not exist'
    }
  }

  // Check inverse modulo exists (GCD)
  checkModuloInverse({isExtendMod}: {isExtendMod: boolean}) {
    const gcdCal = new GCDCalculator()
    const res = isExtendMod ? gcdCal.extendGcd(this.a, this.n) : gcdCal.gcd(this.a, this.n)

    return res
  }
}