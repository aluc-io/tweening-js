import { pnow, requestAnimationFrame, cancelAnimationFrame } from 'request-animation-frame-polyfill'
import _easeFunctions, { outQuad } from './ease-functions'
export const easeFunctions = _easeFunctions

const defaultOptions = {
  duration: 400,
  easeFunction: outQuad,
  done: () => {},
}

type TNumberObj = { [key: string]: number }
type TFromToAsNumbers = [number, number]
type TFromToAsNumberObjs = [TNumberObj, TNumberObj]

interface IOptions {
  step: Function
  done?: Function
  from: number | object
  to: number | object
  duration?: number
  easeFunction?: (n: number) => number
}

interface IFullOptions {
  step: Function
  done: Function
  from: number | object
  to: number | object
  duration: number
  easeFunction: (n: number) => number
}

const isFromToNumber = (n:any): n is number => typeof n === 'number' && !isNaN(n)
const isFromToNumberObj = (obj: any): obj is TNumberObj => {
  if (typeof obj !== 'object') return false
  return Object.keys(obj).every(key => isFromToNumber(obj[key]))
}

const isFromToAsNumbers = (arr: any[]): arr is TFromToAsNumbers => {
  return arr.length === 2 && arr.every(isFromToNumber)
}

const isFromToAsNumberObjs = (arr: any[]): arr is TFromToAsNumberObjs => {
  if (arr.length !== 2) return false
  if (!arr.every(isFromToNumberObj)) return false

  const [from, to] = arr
  if (Object.keys(from).join(':') !== Object.keys(to).join(':')) return false

  return true
}

const isFullOptions = (options: any): options is IFullOptions => {
  if (typeof options !== 'object') return false

  const { step, done, from, to, duration, easeFunction } = options
  if (typeof step !== 'function') return false
  if (typeof done !== 'function') return false
  if (typeof duration !== 'number') return false
  if (typeof easeFunction !== 'function') return false
  if (typeof from !== typeof to) return false
  if (typeof from !== 'number' && typeof from !== 'object') return false

  return true
}

const getPromise = (done: Function) => {
  let modifiedDone: Function = () => {}
  const promise = new Promise<void>((resolve) => {
    modifiedDone = () => {
      resolve()
      done()
    }
  })
  return { promise, modifiedDone }
}

interface IReturn {
  cancel: () => void
  promise: () => Promise<void>
}

type TTween = {
  (from: number, to: number, step: Function, durtaion?: number, easeFunction?: (n: number) => number, done?: Function): IReturn
  (options: IOptions): IReturn
}

export const tween: TTween = (...args: any[]) => {
  const options = (isFromToNumberObj(args[0]) || typeof args[0] === 'number')
    ? {
      from: args[0],
      to: args[1],
      step: args[2],
      duration: args[3] || defaultOptions.duration,
      easeFunction: args[4] || defaultOptions.easeFunction,
      done: args[5] || defaultOptions.done,
    } :
    { ...defaultOptions, ...args[0] }

  if (!isFullOptions(options)) throw new Error('Wrong options: ' + JSON.stringify(options))

  return core(options)
}

const core = (options: IFullOptions) => {
  const { duration, easeFunction, from, to, step, done } = options
  const fromTo = [from, to]
  if (!isFromToAsNumberObjs(fromTo) && !isFromToAsNumbers(fromTo)) {
    throw new Error(`Wrong '[from,to]' ${JSON.stringify(fromTo)}`)
  }

  const { modifiedDone, promise } = getPromise(done)
  const startTime = pnow()

  let id: number
  const tick = () => {
    // ease function 의 x,y 는 0 ~ 1 의 값이다
    // 현재시각:duration = x:1 ==> 현재시각/duration = x
    const x = Math.min((pnow() - startTime) / duration, 1)
    const y = easeFunction(x)
    step(updateState(fromTo, y))

    if (x === 1) return modifiedDone()

    id = requestAnimationFrame(tick)
  }
  id = requestAnimationFrame(tick)

  return {
    cancel: () => cancelAnimationFrame(id),
    promise: () => promise,
  }
}

type TGetRealY = (from: number, to: number, y: number) => number
const getRealY: TGetRealY = (from, to, y) => from + (to - from) * y

const updateState = (fromTo: TFromToAsNumbers | TFromToAsNumberObjs,  y: number) => {
  if (isFromToAsNumbers(fromTo)) return getRealY(fromTo[0], fromTo[1], y)

  const [from, to] = fromTo
  const reducer = (prev: object, k: string) => ({ ...prev, [k]: getRealY(from[k], to[k], y) })
  return Object.keys(from).reduce(reducer, {})
}

declare const window: any;

const tweeningJS = { easeFunctions, tween }

// Browser export as a global
if(typeof window === 'object') {
  window.tweeningJS = tweeningJS
}
