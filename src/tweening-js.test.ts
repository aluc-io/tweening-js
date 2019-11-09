import { tween, easeFunctions } from './tweening-js'
import sinon from 'sinon'

const { inQuad, inOutQuad } = easeFunctions

const sumEachGap = (arr1: number[], arr2: number[]) => {
  if (arr1.length !== arr2.length) throw new Error('length of arr1 and arr2 should be the equal')

  const distance = (a: number, b: number) => Math.sqrt(Math.pow(a - b, 2))
  return arr1.reduce( (p, _, i) => p + distance(arr1[i],arr2[i]), 0)
}

const last = (arr: any[]) => arr[arr.length-1]

test("sumEachGap", () => {
  expect(sumEachGap([1,2,3], [1,2,3])).toBe(0)
  expect(sumEachGap([1,2,3], [2,3,4])).toBe(3)
  expect(sumEachGap([1,2,3], [3,4,1])).toBe(6)
})

test("tween number", (doneTest) => {
  let target: number
  const realStep = (p: number) => { target = p }
  const step = sinon.fake((p: number) => realStep(p))
  const from = 0, to = 100, duration = 100
  tween({ from, to, step, duration, done: () => {
    expect(target).toBe(to)
    expect(step.callCount).toBeGreaterThan(5)
    doneTest()
  }})
})

test("tween object", (doneTest) => {
  let target: number
  const realStep = (p: number) => { target = p }
  const step = sinon.fake((p: number) => realStep(p))
  const from = { x: 0, y: -100, z: 100 }
  const to = { x: 50, y: 100, z: -50 }
  const duration = 100
  tween({ from, to, step, duration, done: () => {
    expect(target).toStrictEqual(to)
    expect(step.callCount).toBeGreaterThan(5)
    doneTest()
  }})
})

test("promise interface", (doneTest) => {
  let target: number
  const realStep = (p: number) => { target = p }
  const step = sinon.fake((p: number) => realStep(p))
  const from = 0, to = 100, duration = 100
  tween({ from, to, step, duration }).promise().then( () => {
    expect(target).toBe(to)
    expect(step.callCount).toBeGreaterThan(5)
    doneTest()
  })
})

test("async/await interface", async () => {
  let target: number
  const realStep = (p: number) => { target = p }
  const step1 = sinon.fake((p: number) => realStep(p))
  const step2 = sinon.fake((p: number) => realStep(p))
  const duration = 100

  const start1 = Date.now()
  await tween({ from: 0, to: 100, step: step1, duration }).promise()
  expect(target).toBe(100)
  expect(step1.callCount).toBeGreaterThan(5)

  const start2 = Date.now()
  await tween({ from: -50, to: 50, step: step2, duration }).promise()
  expect(start2 - start1).toBeGreaterThan(duration)
  expect(target).toBe(50)
  expect(step2.callCount).toBeGreaterThan(5)
})

test("async/await interface - 2", async () => {
  let target1: number
  let target2: number
  const realStep1 = (p: number) => { target1 = p }
  const realStep2 = (p: number) => { target2 = p }
  const step1 = sinon.fake((p: number) => realStep1(p))
  const step2 = sinon.fake((p: number) => realStep2(p))
  await Promise.all([
    tween({ from: 1000, to: 2000, step: step1, duration: 60 }).promise(),
    tween({ from: -50, to: 50, step: step2, duration: 100 }).promise(),
  ])

  expect(target1).toBe(2000)
  expect(step1.callCount).toBeGreaterThan(3)

  expect(target2).toBe(50)
  expect(step2.callCount).toBeGreaterThan(5)
})

test("easeFunctions", async () => {
  let historyArr1: number[] = []
  let historyArr2: number[] = []
  let historyArr3: number[] = []
  const realStep1 = (p: number) => { historyArr1.push(p) }
  const realStep2 = (p: number) => { historyArr2.push(p) }
  const realStep3 = (p: number) => { historyArr3.push(p) }
  const step1 = sinon.fake((p: number) => realStep1(p))
  const step2 = sinon.fake((p: number) => realStep2(p))
  const step3 = sinon.fake((p: number) => realStep3(p))

  const from = 0, to = 100, duration = 100

  await Promise.all([
    tween({ from, to, step: step1, duration, easeFunction: inQuad }).promise(),
    tween({ from, to, step: step2, duration, easeFunction: inQuad }).promise(),
    tween({ from, to, step: step3, duration, easeFunction: inOutQuad }).promise(),
  ])

  expect(historyArr1.length).toBe(historyArr2.length)
  expect(historyArr1.length).toBe(historyArr3.length)

  expect(sumEachGap(historyArr1, historyArr3))
    .toBeGreaterThan(sumEachGap(historyArr1, historyArr2))

  expect(last(historyArr1)).toBe(to)
  expect(last(historyArr2)).toBe(to)
  expect(last(historyArr3)).toBe(to)

  expect(step1.callCount).toBeGreaterThan(5)
  expect(step2.callCount).toBeGreaterThan(5)
  expect(step2.callCount).toBeGreaterThan(5)
})
