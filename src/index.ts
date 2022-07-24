const b = 15
console.log(b)

const c = 15
const d = c + 3

function func (a: number, b: number): number {
  return a + b
}

console.log(func(c, d))

const a = 15

const p = new Promise((resolve) => {
  if (a > 15) resolve('OK')
  else throw new Error('error')
})

p.then(r => { console.log(r) }).catch(err => { console.log(err) })
