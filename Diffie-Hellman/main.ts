import { ModDownGraded } from "./downgraded"
import { Euler } from "./euler";
import { ModInverse } from "./mod-inverse";

const main = () => {
  // Diffie-Hellman
  const {a, q, xA, xB} = {a: 5, q: 6947, xA: 395, xB: 338}

  const yA = new ModDownGraded({a, m: xA, n: q}).downgraded()
  const yB = new ModDownGraded({a, m: xB, n: q}).downgraded()

  const keyA = new ModDownGraded({a: yB, m: xA, n: q}).downgraded()
  const keyB = new ModDownGraded({a: yA, m: xB, n: q}).downgraded()

  console.log(`yA: ${yA}`)
  console.log(`yB: ${yB}`)
  console.log(`keyA: ${keyA}`)
  console.log(`keyB: ${keyB}`);
  

  // RSA
  // const {p, q, e} = {p: 43, q: 47, e: 67}
  // const M = 59 // used for cipher

  // const n = p*q;

  // const euler = new Euler({n, a: e})
  // const eulerValue = euler.eulerValue()

  // const modInverse = new ModInverse({a: e, n: eulerValue})
  // const d = modInverse.moduloInverseByExtendedEuclideanAlgorithm()

  // const cipherText = new ModDownGraded({a: M, m: e, n: n}).downgraded()
  // const plainText = new ModDownGraded({a: cipherText, m: d as number, n: n}).downgraded()
  
  // console.log(`PU ({e, n}): {${e}, ${n}}`)
  // console.log(`PR ({d, n}): {${d}, ${n}}`)
  // console.log(`C: ${cipherText}`);
  // console.log(`M: ${plainText}`);


  // ElGamal
  // const {a, q, xA} = {a: 10, q: 19, xA: 5}
  // const plainText = 17
  // const k=6 // random

  // const yA = new ModDownGraded({a, m: xA, n: q}).downgraded()

  // const K = new ModDownGraded({a: yA, m: k, n: q}).downgraded()
  // const C1 = new ModDownGraded({a, m: k, n: q}).downgraded()
  // const C2 = (K * plainText) % q
  
  // console.log(`PU ({q, a, yA}): {${q}, ${a}, ${yA}}`)
  // console.log(`PR (C1, C2): (${C1}, ${C2})`);
  
}

main()