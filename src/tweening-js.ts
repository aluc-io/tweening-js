import { pnow, requestAnimationFrame, cancelAnimationFrame } from 'request-animation-frame-polyfill'
import _easeFunctions, { outQuad } from './ease-functions'
export const easeFunctions = _easeFunctions

const defaultOptions = {
  duration: 400,
  easeFunction: outQuad,
  done: () => {},
}

interface INumbers {
  [key: string]: number
}

type TValue = INumbers | number

interface IOptions {
  step: Function
  done?: Function
  from: TValue
  to: TValue
  duration?: number
  easeFunction?: (n: number) => number
}

const isValidNumber = (n:any): n is number => typeof n === 'number' && !isNaN(n)
const isValue = (value: any): value is TValue => {
  if (typeof value === 'number') return true
  if (typeof value !== 'object') return false

  return Object.keys(value).every(key => isValidNumber(value[key]))
}

const isOptions = (options: any): options is IOptions => {
  if (typeof options !== 'object') return false

  const { step, done, from, to, duration, easeFunction } = options
  if (typeof step !== 'function') return false
  if (typeof done !== 'function') return false
  if (!isValue(from)) return false
  if (!isValue(to)) return false
  if (typeof duration !== 'number') return false
  if (typeof easeFunction !== 'function') return false
  if (typeof from !== typeof to) return false

  return true
}

const getPromise = (done: Function) => {
  let modifiedDone: Function = () => {}
  const promise = new Promise((resolve) => {
    modifiedDone = () => {
      resolve()
      done()
    }
  })
  return { promise, modifiedDone }
}

export const tween = (_options: IOptions) => {
  const options = { ...defaultOptions, ..._options }
  if (!isOptions(options)) throw new Error('Wrong options: ' + JSON.stringify(options))

  const { duration, easeFunction, from, to, step, done } = options
  const { modifiedDone, promise } = getPromise(done)
  const startTime = pnow()

  let id: number
  const tick = () => {
    // ease function 의 x,y 는 0 ~ 1 의 값이다
    // 현재시각:duration = x:1 ==> 현재시각/duration = x
    const x = Math.min((pnow() - startTime) / duration, 1)
    const y = easeFunction(x)
    step(updateState(from, to, y))

    if (x === 1) return modifiedDone()

    id = requestAnimationFrame(tick)
  }
  id = requestAnimationFrame(tick)

  return {
    cancel: () => cancelAnimationFrame(id),
    promise: () => promise,
  }
}

type TUpdateNumber = (from: number, to: number, y: number) => number
const updateNumber: TUpdateNumber = (from, to, y) => from + (to - from) * y

const updateState = ( from: TValue, to: TValue, y: number) => {
  if(isValidNumber(from) && isValidNumber(to)) return updateNumber(from, to, y)

  if (typeof from !== 'object' || typeof to !== 'object') {
    throw new TypeError("Wrong 'from' or 'to'")
  }

  const newState = { ...from }
  Object.keys(newState).forEach( k => {
    newState[k] = updateNumber(from[k], to[k], y)
  })
  return newState
}

declare const window: any;

const tweeningJS = { easeFunctions, tween }

// Browser export as a global
if(typeof window === 'object') {
  window.tweeningJS = tweeningJS
}

// Node Export
if (typeof module !== "undefined" && module.exports) {
  module.exports = tweeningJS
}
