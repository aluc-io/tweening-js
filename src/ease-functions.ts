
export const linear = (n: number) => {
  return n
}

export const inQuad = (n: number) => {
  return n * n
}

export const outQuad = (n: number) => {
  return n * (2 - n)
}

export const inOutQuad = (n: number) => {
  n *= 2
  if (n < 1) return 0.5 * n * n
  return - 0.5 * (--n * (n - 2) - 1)
}

export const inCube = (n: number) => {
  return n * n * n
}

export const outCube = (n: number) => {
  return --n * n * n + 1
}

export const inOutCube = (n: number) => {
  n *= 2
  if (n < 1) return 0.5 * n * n * n
  return 0.5 * ((n -= 2 ) * n * n + 2)
}

export const inQuart = (n: number) => {
  return n * n * n * n
}

export const outQuart = (n: number) => {
  return 1 - (--n * n * n * n)
}

export const inOutQuart = (n: number) => {
  n *= 2
  if (n < 1) return 0.5 * n * n * n * n
  return -0.5 * ((n -= 2) * n * n * n - 2)
}

export const inQuint = (n: number) => {
  return n * n * n * n * n
}

export const outQuint = (n: number) => {
  return --n * n * n * n * n + 1
}

export const inOutQuint = (n: number) => {
  n *= 2
  if (n < 1) return 0.5 * n * n * n * n * n
  return 0.5 * ((n -= 2) * n * n * n * n + 2)
}

export const inSine = (n: number) => {
  return 1 - Math.cos(n * Math.PI / 2 )
}

export const outSine = (n: number) => {
  return Math.sin(n * Math.PI / 2)
}

export const inOutSine = (n: number) => {
  return .5 * (1 - Math.cos(Math.PI * n))
}

export const inExpo = (n: number) => {
  return 0 == n ? 0 : Math.pow(1024, n - 1)
}

export const outExpo = (n: number) => {
  return 1 == n ? n : 1 - Math.pow(2, -10 * n)
}

export const inOutExpo = (n: number) => {
  if (0 == n) return 0
  if (1 == n) return 1
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1)
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2)
}

export const inCirc = (n: number) => {
  return 1 - Math.sqrt(1 - n * n)
}

export const outCirc = (n: number) => {
  return Math.sqrt(1 - (--n * n))
}

export const inOutCirc = (n: number) => {
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1)
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
}

export const inBack = (n: number) => {
  var s = 1.70158
  return n * n * (( s + 1 ) * n - s)
}

export const outBack = (n: number) => {
  var s = 1.70158
  return --n * n * ((s + 1) * n + s) + 1
}

export const inOutBack = (n: number) => {
  var s = 1.70158 * 1.525
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) )
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 )
}

export const inBounce = (n: number) => {
  return 1 - outBounce(1 - n)
}

export const outBounce = (n: number) => {
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375
  }
}

export const inOutBounce = (n: number) => {
  if (n < .5) return inBounce(n * 2) * .5
  return outBounce(n * 2 - 1) * .5 + .5
}

export default {
  linear,
  inQuad,
  outQuad,
  inOutQuad,
  inCube,
  outCube,
  inOutCube,
  inQuart,
  outQuart,
  inOutQuart,
  inQuint,
  outQuint,
  inOutQuint,
  inSine,
  outSine,
  inOutSine,
  inExpo,
  outExpo,
  inOutExpo,
  inCirc,
  outCirc,
  inOutCirc,
  inBack,
  outBack,
  inOutBack,
  inBounce,
  outBounce,
  inOutBounce,
}
