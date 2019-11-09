# tweening-js

[![CircleCI](https://circleci.com/gh/aluc-io/tweening-js/tree/master.svg?style=svg)](https://circleci.com/gh/aluc-io/tweening-js/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/aluc-io/tweening-js/badge.svg?branch=master)](https://coveralls.io/github/aluc-io/tweening-js?branch=master)

Javascript tweening library which support **promise interface**
and use `requestAnimationFrame` written in typescript.

**tweening-js** does not directly handle DOM elements,
making it compatible with any frontend framework such as **React**, **Vue**, **Angular**.

## Install

```
$ npm install tweening-js
## or
$ yarn add tweening-js
```

## Usage

```typescript
import { tween } from './tweening-js'

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
}

const concurrent = async () => {
  await Promise.all([
    tween({ from: 0, to: 100, step, duration: 50 }).promise(),
    tween({ from: 200, to: 300, step, duration: 50 }).promise(),
  ])
  console.log('----- complete5')
}
```

### easyFunctions

```typescript
import { tween, easeFunctions } from './tweening-js'

const {
  linear, inQuad, outQuad, inOutQuad, inCube, outCube, inOutCube, inQuart,
  outQuart, inOutQuart, inQuint, outQuint, inOutQuint, inSine, outSine, inOutSine,
  inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc, inBack, outBack,
  inOutBack, inBounce, outBounce, inOutBounce,
} = easeFunctions

const step = (n: number) => console.log('draw: ' + n)

tween({ from: -200, to: -100, step, easeFunction: outQuint })
```

Default easy function is `outQuad`

### Use with React

```
// TODO
```

## Development

Build:
```shell
$ yarn build
```

Test:
```shell
$ yarn test
```

## Special thanks & References
- https://github.com/component/ease

