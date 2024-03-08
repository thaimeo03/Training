import { ModEquation } from "./algorithms/chinese-remainder-theorem";
import { ModDownGraded } from "./algorithms/downgraded";
import { ModInverse } from "./algorithms/mod-inverse";

const main = () => {
  // ---------- 2. x = a^-1 (mod n) --------------
  // const {a, n} = {a: 1885, n: 6563}
  // const modInverse = new ModInverse({a, n})
  // console.log(modInverse.moduloInverseByDefinition());
  // console.log("Modulo Inverse by Extended Euclidean Algorithm:", modInverse.moduloInverseByExtendedEuclideanAlgorithm());

  // Chinese Remainder Theorem
  // const {m1, m2, m3, a1, a2, a3} = {m1: 17, m2: 19, m3: 11, a1: 5, a2: 16, a3: 3}
  // const modEquation = new ModEquation({m1, m2, m3, a1, a2, a3})

  // console.log("Chinese Remainder Theorem:", modEquation.chineseRemainderTheorem());


  // Downgraded
  const {a, m, n} = {a: 367, m: 6329, n: 6329}
  const modDowngraded = new ModDownGraded({a, m, n})
  console.log("Downgraded:", modDowngraded.downgraded());
}

main()