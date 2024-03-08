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
    const gcd = (a: number, b: number): number => {
      if(b === 0) {
        return a
      }
      return gcd(b, a % b)
    }

    const extendGcd = (a: number, b: number): [number, number, number] => {
      if(b === 0) {
        return [a, 0, 1]
      }
      else {
        const [d, x, y] = extendGcd(b, a % b)
        return [d, y - Math.floor(a / b) * x, x]
      }
    }

    const res = isExtendMod ? extendGcd(this.a, this.n) : gcd(this.a, this.n)

    return res
  }
}