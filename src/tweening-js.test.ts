import { tween, easeFunctions } from './tweening-js'

const step = (n: number) => console.log('draw: ' + n)

tween({ from: -200, to: -100, step, duration: 50, done: () => {
  console.log('complete1')
  promiseWay()
}})

const promiseWay = () => {
  tween({ from: 0, to: 100, step, duration: 50 }).promise().then( () => {
    console.log('----- complete2')
    asyncFunction()
  })
}

const asyncFunction = async () => {
  await tween({ from: 0, to: 100, step, duration: 50 }).promise()
  console.log('----- complete3')
  await tween({ from: 200, to: 300, step, duration: 50 }).promise()
  console.log('----- complete4')
  concurrent()
}

const concurrent = async () => {
  const stepA = (n: number) => console.log('drawA: ' + n)
  const stepB = (n: number) => console.log('drawB: ' + n)
  await Promise.all([
    tween({ from: 1000, to: 2000, step: stepA, duration: 50 }).promise(),
    tween({ from: -50, to: 50, step: stepB, duration: 100 }).promise(),
  ])
  console.log('----- complete5')
}
