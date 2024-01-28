const mod = ({a, b}: {a: number; b: number}) => {
  let c = 0
  for(let i = 1; i < b; i++) {
    if(a * i % b === 1) {
      c = i
    }
  }

  return c
}

const main = () => {
  console.log(`Result: ${mod({a: 42, b: 2431})}`);
}

main()