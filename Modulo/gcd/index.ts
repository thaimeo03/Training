export class GCDCalculator {
  gcd(a: number, b: number): number {
    if(b === 0) {
      return a
    }
    return this.gcd(b, a % b)
  }

  extendGcd(a: number, b: number): [number, number, number] {
    if(b === 0) {
      return [a, 0, 1]
    }
    else {
      const [d, x, y] = this.extendGcd(b, a % b)
      return [d, y - Math.floor(a / b) * x, x]
    }
  }
}